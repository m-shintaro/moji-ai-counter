import { useState } from 'react'

interface AIAdjustPanelProps {
  currentCount: number
  onAdjust: (targetCount: number, action: 'expand' | 'reduce' | 'auto' | 'proofread' | 'keigo') => void
  isLoading: boolean
}

const AIAdjustPanel = ({ currentCount, onAdjust, isLoading }: AIAdjustPanelProps) => {
  const [targetCount, setTargetCount] = useState<number>(currentCount || 100)

  const handleAdjust = (action: 'expand' | 'reduce' | 'auto' | 'proofread' | 'keigo') => {
    if (action === 'proofread' || action === 'keigo') {
      onAdjust(0, action)
    } else if (targetCount > 0) {
      onAdjust(targetCount, action)
    }
  }

  const getAdjustButtonText = () => {
    if (targetCount > currentCount) {
      return '文章を増やす'
    } else if (targetCount < currentCount) {
      return '文章を減らす'
    } else {
      return '調整不要'
    }
  }

  const getAdjustAction = (): 'expand' | 'reduce' | 'auto' => {
    if (targetCount > currentCount) {
      return 'expand'
    } else if (targetCount < currentCount) {
      return 'reduce'
    } else {
      return 'auto'
    }
  }

  return (
    <div className="bg-github-dark-bg-secondary border border-github-dark-border rounded-lg p-4">
      <h3 className="text-lg font-semibold text-github-dark-text mb-4">
        AI文章調整
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <label className="text-github-dark-text-secondary">
            目標文字数:
          </label>
          <input
            type="text"
            value={targetCount}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, '')
              setTargetCount(Number(value) || 0)
            }}
            className="bg-github-dark-bg border border-github-dark-border rounded px-3 py-1 text-github-dark-text w-24 focus:outline-none focus:ring-2 focus:ring-github-dark-accent [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            placeholder="文字数"
          />
          <span className="text-github-dark-text-secondary">文字</span>
          <span className="text-sm text-github-dark-text-secondary">
            (現在: {currentCount}文字)
          </span>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => handleAdjust(getAdjustAction())}
            disabled={isLoading || targetCount === currentCount}
            className="flex-1 bg-github-dark-accent text-white px-4 py-2 rounded-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            {isLoading ? '処理中...' : getAdjustButtonText()}
          </button>
          <button
            onClick={() => handleAdjust('proofread')}
            disabled={isLoading}
            className="flex-1 bg-github-dark-success text-white px-4 py-2 rounded-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            {isLoading ? '処理中...' : '文章校正'}
          </button>
          <button
            onClick={() => handleAdjust('keigo')}
            disabled={isLoading}
            className="flex-1 bg-github-dark-border text-github-dark-text px-4 py-2 rounded-md hover:bg-opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            {isLoading ? '処理中...' : '敬語に変換'}
          </button>
        </div>

        {targetCount > 0 && targetCount !== currentCount && (
          <div className="text-sm text-github-dark-text-secondary">
            {targetCount > currentCount
              ? `約${targetCount - currentCount}文字増やす必要があります`
              : `約${currentCount - targetCount}文字減らす必要があります`}
          </div>
        )}
      </div>
    </div>
  )
}

export default AIAdjustPanel