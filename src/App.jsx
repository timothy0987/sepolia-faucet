import { useState } from 'react'
import WalletConnect from './components/WalletConnect'
import TaskVerification from './components/TaskVerification'
import FaucetRequest from './components/FaucetRequest'
import { Droplet } from 'lucide-react'

function App() {
  const [address, setAddress] = useState('')
  const [tasksCompleted, setTasksCompleted] = useState(false)

  const handleWalletConnect = (connectedAddress) => {
    setAddress(connectedAddress)
  }

  return (
    <>
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      
      <div className="app-container">
        <header className="header fade-in">
          <div className="logo">
            <Droplet size={28} color="#00ffff" />
            <span>SepoFaucet</span>
          </div>
          {address && (
            <div className="address-badge">
              {address.slice(0, 6)}...{address.slice(-4)}
            </div>
          )}
        </header>

        <main className="main-content">
          <div className="card fade-in" style={{ animationDelay: '0.1s' }}>
            <h2 className="card-title">1. Connect Wallet</h2>
            <p className="card-desc">Connect your Web3 wallet to receive Sepolia Test Tokens.</p>
            <WalletConnect onConnect={handleWalletConnect} urlAddress={address} />
          </div>

          <div className={`card fade-in ${!address ? 'disabled-card' : ''}`} style={{ animationDelay: '0.2s', opacity: address ? 1 : 0.5, pointerEvents: address ? 'auto' : 'none' }}>
            <h2 className="card-title">2. Complete Tasks</h2>
            <p className="card-desc">Engage with our Twitter community to unlock the faucet.</p>
            <TaskVerification onComplete={() => setTasksCompleted(true)} disabled={!address} />
          </div>

          <div className={`card fade-in ${!tasksCompleted ? 'disabled-card' : ''}`} style={{ animationDelay: '0.3s', opacity: tasksCompleted ? 1 : 0.5, pointerEvents: tasksCompleted ? 'auto' : 'none' }}>
            <h2 className="card-title">3. Claim Tokens</h2>
            <p className="card-desc">Get 0.5 Sepolia ETH dropped directly into your wallet.</p>
            <FaucetRequest address={address} disabled={!tasksCompleted} />
          </div>
        </main>
      </div>
    </>
  )
}

export default App
