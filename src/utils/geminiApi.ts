import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '')

export const adjustText = async (
  text: string,
  targetCount: number,
  action: 'expand' | 'reduce' | 'auto' | 'proofread' | 'keigo'
): Promise<string> => {
  if (!import.meta.env.VITE_GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured')
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })

  let prompt = ''
  const currentCount = text.length

  if (action === 'proofread') {
    prompt = `以下の文章を校正してください。誤字脱字、文法の誤り、不自然な表現を修正してください。

元の文章:
${text}

注意事項:
- 文章の意味や内容を変えないでください
- 自然で読みやすい日本語にしてください
- 校正済みの文章のみを返してください（説明は不要）`
  } else if (action === 'keigo') {
    prompt = `以下の文章を丁寧な敬語に変換してください。ビジネスメールや公式文書に適した丁寧な表現にしてください。

元の文章:
${text}

注意事項:
- 文章の意味や内容を変えないでください
- 適切な敬語（尊敬語・謙譲語・丁寧語）を使用してください
- 自然で丁寧な日本語にしてください
- 変換後の文章のみを返してください（説明は不要）`
  } else if (action === 'expand' || (action === 'auto' && targetCount > currentCount)) {
    prompt = `以下の文章を約${targetCount}文字になるように詳細化・拡張してください。意味を保ちながら、より具体的な説明や例を追加してください。

元の文章:
${text}

注意事項:
- 元の文章の意味や主旨を変えないでください
- 自然な日本語で書いてください
- 約${targetCount}文字（±10%）になるようにしてください
- 文章のみを返してください（説明は不要）`
  } else if (action === 'reduce' || (action === 'auto' && targetCount < currentCount)) {
    prompt = `以下の文章を約${targetCount}文字になるように要約・短縮してください。重要な情報は保持してください。

元の文章:
${text}

注意事項:
- 重要な情報を削除しないでください
- 自然な日本語で書いてください
- 約${targetCount}文字（±10%）になるようにしてください
- 文章のみを返してください（説明は不要）`
  } else {
    return text
  }

  const maxRetries = 3
  const retryDelay = 1000 // 1 second

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const result = await model.generateContent(prompt)
      const response = await result.response
      const adjustedText = response.text()
      
      return adjustedText.trim()
    } catch (error: any) {
      console.error(`Gemini API error (attempt ${attempt + 1}):`, error)
      
      // Check if it's a 503 Service Unavailable error
      const isOverloaded = error?.message?.includes('overloaded') || 
                          error?.message?.includes('503') ||
                          error?.status === 503
      
      if (isOverloaded && attempt < maxRetries - 1) {
        // Wait before retrying, with exponential backoff
        const delay = retryDelay * Math.pow(2, attempt)
        await new Promise(resolve => setTimeout(resolve, delay))
        continue
      }
      
      // If it's the last attempt or not a retryable error
      if (isOverloaded) {
        throw new Error('AIサービスが混雑しています。しばらく時間をおいて再度お試しください。')
      }
      
      throw new Error('文章の調整に失敗しました。API キーが正しく設定されているか確認してください。')
    }
  }
  
  // This should never be reached, but TypeScript requires it
  throw new Error('予期しないエラーが発生しました。')
}