import { useState, useEffect } from 'react'
import Header from './components/Header'
import CharacterCounter from './components/CharacterCounter'
import TextEditor from './components/TextEditor'
import AIAdjustPanel from './components/AIAdjustPanel'
import Footer from './components/Footer'
import { countCharacters } from './utils/countUtils'
import { adjustText } from './utils/geminiApi'

function App() {
  const [text, setText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const counts = countCharacters(text)

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [error])

  const handleConvertPunctuation = () => {
    if (!text.trim()) {
      setError('テキストを入力してください')
      return
    }

    let result = text

    // 読点: 、→，（「、」があれば），，→、（「、」がなく「，」があれば）
    if (result.includes('、')) {
      result = result.split('、').join('，')
    } else if (result.includes('，')) {
      result = result.split('，').join('、')
    }

    // 句点: 。→．（「。」があれば），．→。（「。」がなく「．」があれば）
    if (result.includes('。')) {
      result = result.split('。').join('．')
    } else if (result.includes('．')) {
      result = result.split('．').join('。')
    }

    setText(result)
  }

  const handleAdjust = async (targetCount: number, action: 'expand' | 'reduce' | 'auto' | 'proofread') => {
    if (!text.trim()) {
      setError('テキストを入力してください')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const adjustedText = await adjustText(text, targetCount, action)
      setText(adjustedText)
    } catch (err) {
      setError(err instanceof Error ? err.message : '予期しないエラーが発生しました')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-github-dark-bg flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-8">
        <div className="space-y-6">
          <CharacterCounter counts={counts} />
          
          <TextEditor text={text} setText={setText} />
          
          <AIAdjustPanel
            currentCount={counts.withoutSpacesAndLineBreaks}
            onAdjust={handleAdjust}
            onConvertPunctuation={handleConvertPunctuation}
            isLoading={isLoading}
          />
          
          {error && (
            <div className="bg-github-dark-danger bg-opacity-10 border border-github-dark-danger rounded-lg p-4">
              <p className="text-github-dark-danger">{error}</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

export default App