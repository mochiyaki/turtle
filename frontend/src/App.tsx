import { useState } from 'react'
import './App.css'

interface GenerateResponse {
  images: string[]
  count: number
  seed: number | null
}

function App() {
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [seed, setSeed] = useState<string>('')
  const [numImages, setNumImages] = useState<number>(4)
  const [error, setError] = useState<string>('')

  const API_URL = 'http://localhost:8000'

  const generateImages = async () => {
    setLoading(true)
    setError('')
    
    try {
      const payload: { num_images: number; seed?: number } = {
        num_images: numImages
      }
      
      if (seed) {
        payload.seed = parseInt(seed)
      }

      const response = await fetch(`${API_URL}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error('Failed to generate images')
      }

      const data: GenerateResponse = await response.json()
      setImages(data.images)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const randomSeed = () => {
    setSeed(Math.floor(Math.random() * 10000).toString())
  }

  return (
    <div className="container">
      <h1>🎨 Turtle Generator</h1>
      <p className="subtitle">Generate pixel art using GAN model</p>

      <div className="controls">
        <div className="control-group">
          <label>Number of Images (1-16)</label>
          <input
            type="number"
            min="1"
            max="16"
            value={numImages}
            onChange={(e) => setNumImages(parseInt(e.target.value) || 1)}
          />
        </div>

        <div className="control-group">
          <label>Seed (optional)</label>
          <div className="seed-input">
            <input
              type="number"
              placeholder="Random seed"
              value={seed}
              onChange={(e) => setSeed(e.target.value)}
            />
            <button onClick={randomSeed} className="random-btn">🎲</button>
          </div>
        </div>

        <button 
          onClick={generateImages} 
          disabled={loading}
          className="generate-btn"
        >
          {loading ? '⏳ Generating...' : '✨ Generate'}
        </button>
      </div>

      {error && (
        <div className="error">
          ❌ {error}
        </div>
      )}

      <div className="images-grid">
        {images.map((img, idx) => (
          <div key={idx} className="image-card">
            <img 
              src={`data:image/png;base64,${img}`} 
              alt={`Generated ${idx + 1}`}
              className="generated-image"
            />
            <div className="image-number">#{idx + 1}</div>
          </div>
        ))}
      </div>

      {images.length === 0 && !loading && (
        <div className="placeholder">
          <p>🖼️ No images generated yet</p>
          <p>Click "Generate" to create CryptoPunks!</p>
        </div>
      )}
    </div>
  )
}

export default App
