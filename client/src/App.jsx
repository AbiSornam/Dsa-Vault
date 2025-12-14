import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg flex flex-col items-center">
        <div className="flex gap-8 mb-4">
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Vite + React + Tailwind</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            count is {count}
          </button>
          <p className="mt-2">
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs mt-4 text-gray-600">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </div>
  )
}

export default App
