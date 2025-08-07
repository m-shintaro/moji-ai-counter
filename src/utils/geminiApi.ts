import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '')

export const adjustText = async (
  text: string,
  targetCount: number,
  action: 'expand' | 'reduce' | 'auto'
): Promise<string> => {
  if (!import.meta.env.VITE_GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured')
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })

  let prompt = ''
  const currentCount = text.length

  if (action === 'expand' || (action === 'auto' && targetCount > currentCount)) {
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

  try {
    const result = await model.generateContent(prompt)
    const response = await result.response
    const adjustedText = response.text()
    
    return adjustedText.trim()
  } catch (error) {
    console.error('Gemini API error:', error)
    throw new Error('文章の調整に失敗しました')
  }
}