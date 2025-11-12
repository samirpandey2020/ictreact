# Similarity Game Backend

This is a simple FastAPI backend for the Similarity Game that stores image pairs and similarity scores in a SQLite database.

## Setup

1. Install the required dependencies:
```bash
pip install -r requirements.txt
```

2. Run the server:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

Or use the start script:
```bash
./start.sh
```

## API Endpoints

- `GET /` - Health check endpoint
- `POST /pairs/` - Add a new image pair
- `GET /pairs/` - Get all image pairs
- `GET /pairs/{pair_id}` - Get a specific image pair
- `PUT /pairs/{pair_id}` - Update a specific image pair
- `DELETE /pairs/{pair_id}` - Delete a specific image pair

## Database

The application uses SQLite for data storage. The database file is automatically created in the `db/` directory when the application starts.