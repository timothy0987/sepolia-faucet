import { useState } from 'react'
import { Wallet } from 'lucide-react'

export default function WalletConnect({ onConnect, urlAddress }) {
  const [connecting, setConnecting] = useState(false)
  const [error, setError] = useState('')

  const connectWallet = async () => {
    setConnecting(true)
    setError('')
    
    try {
      // Check if MetaMask or any injected Web3 provider exists
      if (typeof window !== 'undefined' && window.ethereum) {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        if (accounts.length > 0) {
          onConnect(accounts[0])
        }
      } else {
        // Mock connection if no wallet found for demo purposes
        setTimeout(() => {
          onConnect('0x71C7656EC7ab88b098defB751B7401B5f6d8976F')
        }, 1000)
      }
    } catch (err) {
      setError('Failed to connect wallet')
      console.error(err)
    } finally {
      setConnecting(false)
    }
  }

  if (urlAddress) {
    return (
      <button className="btn" disabled>
        <Wallet size={20} />
        Wallet Connected
      </button>
    )
  }

  return (
    <div>
      <button 
        className="btn btn-primary" 
        onClick={connectWallet}
        disabled={connecting}
      >
        {connecting ? (
          <>
            <div className="loader"></div>
            Connecting...
          </>
        ) : (
          <>
            <Wallet size={20} />
            Connect MetaMask
          </>
        )}
      </button>
      {error && <p style={{ color: '#ff4444', marginTop: '1rem', textAlign: 'center' }}>{error}</p>}
    </div>
  )
}
