import { CharacterCount } from '../utils/countUtils'

interface CharacterCounterProps {
  counts: CharacterCount
}

const CharacterCounter = ({ counts }: CharacterCounterProps) => {
  return (
    <div className="bg-github-dark-bg-secondary border border-github-dark-border rounded-lg p-4">
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-3xl font-bold text-github-dark-accent">
            {counts.total}
          </div>
          <div className="text-sm text-github-dark-text-secondary mt-1">
            総文字数
          </div>
        </div>
        <div>
          <div className="text-3xl font-bold text-github-dark-text">
            {counts.withoutLineBreaks}
          </div>
          <div className="text-sm text-github-dark-text-secondary mt-1">
            改行除外
          </div>
        </div>
        <div>
          <div className="text-3xl font-bold text-github-dark-text">
            {counts.withoutSpacesAndLineBreaks}
          </div>
          <div className="text-sm text-github-dark-text-secondary mt-1">
            空白・改行除外
          </div>
        </div>
      </div>
    </div>
  )
}

export default CharacterCounter