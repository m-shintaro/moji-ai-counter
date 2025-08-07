export interface CharacterCount {
  total: number
  withoutLineBreaks: number
  withoutSpacesAndLineBreaks: number
}

export const countCharacters = (text: string): CharacterCount => {
  const total = text.length

  const withoutLineBreaks = text.replace(/\r?\n/g, '').length

  const withoutSpacesAndLineBreaks = text
    .replace(/\r?\n/g, '')
    .replace(/\s/g, '')
    .length

  return {
    total,
    withoutLineBreaks,
    withoutSpacesAndLineBreaks,
  }
}