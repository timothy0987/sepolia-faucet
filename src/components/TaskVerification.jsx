import { useState } from 'react'
import { Twitter, CheckCircle2, ExternalLink } from 'lucide-react'

export default function TaskVerification({ onComplete, disabled }) {
  const [tasks, setTasks] = useState({
    follow: { status: 'idle' }, // idle, verifying, completed
    retweet: { status: 'idle' }
  })

  const [allDone, setAllDone] = useState(false)

  const handleTaskClick = (taskId) => {
    if (disabled || tasks[taskId].status !== 'idle') return

    // Open twitter link in new tab (mock)
    window.open(`https://twitter.com/intent/${taskId === 'follow' ? 'follow?screen_name=TimothyOla58058' : 'retweet?tweet_id=123'}`, '_blank')
    
    // Simulate verification delay
    setTasks(prev => ({ ...prev, [taskId]: { status: 'verifying' } }))
    
    setTimeout(() => {
      setTasks(prev => {
        const newTasks = { ...prev, [taskId]: { status: 'completed' } }
        
        if (newTasks.follow.status === 'completed' && newTasks.retweet.status === 'completed') {
          setAllDone(true)
          onComplete()
        }
        
        return newTasks
      })
    }, 4000)
  }

  return (
    <div>
      <div className="task-item">
        <div className="task-info">
          <Twitter className="task-icon" size={24} />
          <span className="task-name">Follow @TimothyOla58058</span>
        </div>
        
        {tasks.follow.status === 'completed' ? (
          <span className="task-status status-completed">
            <CheckCircle2 size={16} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px' }}/>
            Done
          </span>
        ) : tasks.follow.status === 'verifying' ? (
          <div className="loader"></div>
        ) : (
          <button 
            className="btn" 
            style={{ padding: '0.4rem 1rem', width: 'auto' }}
            onClick={() => handleTaskClick('follow')}
            disabled={disabled}
          >
            Follow <ExternalLink size={14} />
          </button>
        )}
      </div>

      <div className="task-item">
        <div className="task-info">
          <Twitter className="task-icon" size={24} />
          <span className="task-name">Retweet Pinned Post</span>
        </div>
        
        {tasks.retweet.status === 'completed' ? (
          <span className="task-status status-completed">
            <CheckCircle2 size={16} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px' }}/>
            Done
          </span>
        ) : tasks.retweet.status === 'verifying' ? (
          <div className="loader"></div>
        ) : (
          <button 
            className="btn" 
            style={{ padding: '0.4rem 1rem', width: 'auto' }}
            onClick={() => handleTaskClick('retweet')}
            disabled={disabled}
          >
            Retweet <ExternalLink size={14} />
          </button>
        )}
      </div>

      {allDone && (
        <div className="success-message fade-in">
          Great job! You have unlocked the faucet.
        </div>
      )}
    </div>
  )
}
