import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { NodeProvider } from './Context/TreeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NodeProvider>
      <App />
    </NodeProvider>
  </StrictMode>,
)
