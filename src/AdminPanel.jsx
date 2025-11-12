import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Save, ArrowLeft, Trash2, Upload } from 'lucide-react';
import { API_BASE_URL, API_ENDPOINTS } from './config';

const AdminPanel = () => {
  const [pairs, setPairs] = useState([]);
  const [newPair, setNewPair] = useState({
    img1: '',
    img2: '',
    similarity: 50
  });
  const [preview1, setPreview1] = useState('');
  const [preview2, setPreview2] = useState('');

  // Load pairs from backend API
  useEffect(() => {
    fetch(`${API_BASE_URL}${API_ENDPOINTS.PAIRS}`)
      .then(response => response.json())
      .then(data => {
        setPairs(data);
      })
      .catch(error => {
        console.error('Error fetching pairs:', error);
        // Fallback to localStorage if API is not available
        const savedPairs = localStorage.getItem('similarityPairs');
        if (savedPairs) {
          setPairs(JSON.parse(savedPairs));
        } else {
          // Initialize with default pairs if none exist
          const defaultPairs = [
            { id: '1', img1: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800', img2: 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=800', similarity: 85 },
            { id: '2', img1: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', img2: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800', similarity: 45 },
            { id: '3', img1: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800', img2: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800', similarity: 90 },
            { id: '4', img1: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800', img2: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800', similarity: 30 }
          ];
          setPairs(defaultPairs);
        }
      });
  }, []);

  // Handle file upload and convert to base64
  const handleFileUpload = (file, imageNumber) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (imageNumber === 1) {
          setNewPair({ ...newPair, img1: e.target.result });
          setPreview1(e.target.result);
        } else {
          setNewPair({ ...newPair, img2: e.target.result });
          setPreview2(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPair = () => {
    if ((newPair.img1 || preview1) && (newPair.img2 || preview2)) {
      const pairToAdd = {
        img1: newPair.img1 || preview1,
        img2: newPair.img2 || preview2,
        similarity: newPair.similarity
      };

      // Save to backend API
      fetch(`${API_BASE_URL}${API_ENDPOINTS.PAIRS}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pairToAdd),
      })
        .then(response => response.json())
        .then(data => {
          setPairs([...pairs, data]);
          setNewPair({
            img1: '',
            img2: '',
            similarity: 50
          });
          setPreview1('');
          setPreview2('');
        })
        .catch(error => {
          console.error('Error adding pair:', error);
          // Fallback to localStorage
          const newPairWithId = { ...pairToAdd, id: Date.now().toString() };
          setPairs([...pairs, newPairWithId]);
          localStorage.setItem('similarityPairs', JSON.stringify([...pairs, newPairWithId]));
          setNewPair({
            img1: '',
            img2: '',
            similarity: 50
          });
          setPreview1('');
          setPreview2('');
        });
    }
  };

  const handleRemovePair = (id) => {
    // Delete from backend API
    fetch(`${API_BASE_URL}${API_ENDPOINTS.PAIRS}${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setPairs(pairs.filter(pair => pair.id !== id));
        } else {
          throw new Error('Failed to delete pair');
        }
      })
      .catch(error => {
        console.error('Error deleting pair:', error);
        // Fallback to localStorage
        const updatedPairs = pairs.filter(pair => pair.id !== id);
        setPairs(updatedPairs);
        localStorage.setItem('similarityPairs', JSON.stringify(updatedPairs));
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPair({
      ...newPair,
      [name]: name === 'similarity' ? parseInt(value) : value
    });
  };

  const handleFileChange = (e, imageNumber) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file, imageNumber);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Admin Panel</h1>
          <Link to="/" className="flex items-center bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full transition-all">
            <ArrowLeft className="mr-2" />
            Back to Game
          </Link>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Add New Image Pair</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-white mb-2 font-medium">Image 1</label>
              <div className="flex items-center space-x-4">
                <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-white/50 rounded-xl cursor-pointer bg-white/10 hover:bg-white/20 transition-colors">
                  {preview1 ? (
                    <img src={preview1} alt="Preview 1" className="w-full h-full object-cover rounded-xl" />
                  ) : (
                    <Upload className="text-white/70" size={32} />
                  )}
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={(e) => handleFileChange(e, 1)} 
                  />
                </label>
                <div className="flex-1">
                  <input
                    type="text"
                    name="img1"
                    value={newPair.img1}
                    onChange={handleInputChange}
                    placeholder="Or enter image URL"
                    className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white text-sm"
                  />
                  <p className="text-white/70 text-xs mt-2">Upload an image or enter a URL</p>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-white mb-2 font-medium">Image 2</label>
              <div className="flex items-center space-x-4">
                <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-white/50 rounded-xl cursor-pointer bg-white/10 hover:bg-white/20 transition-colors">
                  {preview2 ? (
                    <img src={preview2} alt="Preview 2" className="w-full h-full object-cover rounded-xl" />
                  ) : (
                    <Upload className="text-white/70" size={32} />
                  )}
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={(e) => handleFileChange(e, 2)} 
                  />
                </label>
                <div className="flex-1">
                  <input
                    type="text"
                    name="img2"
                    value={newPair.img2}
                    onChange={handleInputChange}
                    placeholder="Or enter image URL"
                    className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white text-sm"
                  />
                  <p className="text-white/70 text-xs mt-2">Upload an image or enter a URL</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <label className="block text-white mb-2 font-medium">Similarity Score: {newPair.similarity}%</label>
            <input
              type="range"
              name="similarity"
              min="0"
              max="100"
              value={newPair.similarity}
              onChange={handleInputChange}
              className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          <button
            onClick={handleAddPair}
            className="mt-8 flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105"
          >
            <PlusCircle className="mr-2" />
            Add Image Pair
          </button>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Current Image Pairs</h2>
          
          {pairs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white/80 text-xl">No image pairs added yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pairs.map((pair, index) => (
                <div key={pair.id || index} className="bg-white/20 rounded-2xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white">Pair {index + 1}</h3>
                    <button 
                      onClick={() => handleRemovePair(pair.id)}
                      className="text-red-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-black/20 rounded-lg overflow-hidden">
                      <img 
                        src={pair.img1} 
                        alt="Image 1" 
                        className="w-full h-65 object-cover"
                        onError={(e) => {
                          e.target.src = 'https://placehold.co/300x200?text=Invalid+Image+URL';
                        }}
                      />
                    </div>
                    <div className="bg-black/20 rounded-lg overflow-hidden">
                      <img 
                        src={pair.img2} 
                        alt="Image 2" 
                        className="w-full h-65 object-cover"
                        onError={(e) => {
                          e.target.src = 'https://placehold.co/300x200?text=Invalid+Image+URL';
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">Similarity:</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-white font-bold">
                      {pair.similarity}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;