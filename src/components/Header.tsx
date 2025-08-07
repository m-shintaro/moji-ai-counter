const Header = () => {
  return (
    <header className="bg-github-dark-bg-secondary border-b border-github-dark-border px-6 py-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold text-github-dark-text">
          文字カウントツール
        </h1>
        <p className="text-sm text-github-dark-text-secondary mt-1">
          リアルタイム文字数カウント & AI文章調整
        </p>
      </div>
    </header>
  )
}

export default Header