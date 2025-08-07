interface TextEditorProps {
  text: string;
  setText: (text: string) => void;
}

const TextEditor = ({ text, setText }: TextEditorProps) => {
  return (
    <div className="bg-github-dark-bg-secondary border border-github-dark-border rounded-lg p-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="ここにテキストを入力してください..."
        className="w-full min-h-[40vh] max-h-[60vh] bg-github-dark-bg border border-github-dark-border rounded-md p-4 text-github-dark-text placeholder-github-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-github-dark-accent focus:border-transparent resize-vertical"
      />
    </div>
  );
};

export default TextEditor;
