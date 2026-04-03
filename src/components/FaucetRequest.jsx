import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'

export default function FaucetRequest({ address, disabled }) {
  const [claiming, setClaiming] = useState(false)
  const [txHash, setTxHash] = useState('')
  const [error, setError] = useState('')

  const handleClaim = async () => {
    if (disabled || claiming) return

    setClaiming(true)
    setError('')
    
    // Simulate network delay for token transfer
    try {
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Generate a mock transaction hash
      const mockHash = '0x' + Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('')
      setTxHash(mockHash)
      
    } catch (err) {
      setError('Faucet is currently empty or network is congested. Try again later.')
    } finally {
      setClaiming(false)
    }
  }

  if (txHash) {
    return (
      <div className="success-message fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        <CheckCircle size={48} color="var(--success)" />
        <h3 style={{ margin: 0 }}>Tokens Sent Successfully!</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          0.5 Sepolia ETH has been sent to your wallet.
        </p>
        <a 
          href={`https://sepolia.etherscan.io/tx/${txHash}`} 
          target="_blank" 
          rel="noreferrer"
          style={{ color: 'var(--secondary)', textDecoration: 'none' }}
        >
          View on Etherscan
        </a>
      </div>
    )
  }

  return (
    <div>
      <button 
        className="btn btn-secondary" 
        onClick={handleClaim}
        disabled={disabled || claiming}
        style={{ padding: '1rem' }}
      >
        {claiming ? (
          <>
            <div className="loader" style={{ borderColor: 'rgba(0,0,0,0.1)', borderTopColor: '#000' }}></div>
            Processing Transaction...
          </>
        ) : (
          <>
            <Send size={20} />
            Claim 0.5 Sepolia ETH
          </>
        )}
      </button>
      {error && <p style={{ color: '#ff4444', marginTop: '1rem', textAlign: 'center' }}>{error}</p>}
    </div>
  )
}
