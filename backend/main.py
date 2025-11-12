from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import sqlite3
import base64
import uuid
import os

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

# Create database directory if it doesn't exist
os.makedirs("db", exist_ok=True)

# Database setup
DATABASE = "db/similarity_game.db"

def init_db():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS image_pairs (
            id TEXT PRIMARY KEY,
            img1 TEXT NOT NULL,
            img2 TEXT NOT NULL,
            similarity INTEGER NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

# Initialize database on startup
init_db()

# Pydantic models
class ImagePair(BaseModel):
    img1: str
    img2: str
    similarity: int

class ImagePairResponse(ImagePair):
    id: str

# API endpoints
@app.get("/")
def read_root():
    return {"message": "Similarity Game API"}

@app.post("/pairs/", response_model=ImagePairResponse)
def create_pair(pair: ImagePair):
    pair_id = str(uuid.uuid4())
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO image_pairs (id, img1, img2, similarity) VALUES (?, ?, ?, ?)",
        (pair_id, pair.img1, pair.img2, pair.similarity)
    )
    conn.commit()
    conn.close()
    return ImagePairResponse(id=pair_id, **pair.dict())

@app.get("/pairs/", response_model=List[ImagePairResponse])
def get_pairs():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("SELECT id, img1, img2, similarity FROM image_pairs")
    pairs = cursor.fetchall()
    conn.close()
    return [
        ImagePairResponse(
            id=pair[0],
            img1=pair[1],
            img2=pair[2],
            similarity=pair[3]
        )
        for pair in pairs
    ]

@app.get("/pairs/{pair_id}", response_model=ImagePairResponse)
def get_pair(pair_id: str):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute(
        "SELECT id, img1, img2, similarity FROM image_pairs WHERE id = ?",
        (pair_id,)
    )
    pair = cursor.fetchone()
    conn.close()
    if pair is None:
        raise HTTPException(status_code=404, detail="Pair not found")
    return ImagePairResponse(
        id=pair[0],
        img1=pair[1],
        img2=pair[2],
        similarity=pair[3]
    )

@app.put("/pairs/{pair_id}", response_model=ImagePairResponse)
def update_pair(pair_id: str, pair: ImagePair):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE image_pairs SET img1 = ?, img2 = ?, similarity = ? WHERE id = ?",
        (pair.img1, pair.img2, pair.similarity, pair_id)
    )
    if cursor.rowcount == 0:
        conn.close()
        raise HTTPException(status_code=404, detail="Pair not found")
    conn.commit()
    conn.close()
    return ImagePairResponse(id=pair_id, **pair.dict())

@app.delete("/pairs/{pair_id}")
def delete_pair(pair_id: str):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("DELETE FROM image_pairs WHERE id = ?", (pair_id,))
    if cursor.rowcount == 0:
        conn.close()
        raise HTTPException(status_code=404, detail="Pair not found")
    conn.commit()
    conn.close()
    return {"message": "Pair deleted successfully"}