# 文字カウントツール

リアルタイムで文字数をカウントし、AI（Google Gemini）を使って文章量を調整できるツールです。

## 機能

- **リアルタイム文字カウント**
  - 総文字数
  - 改行を除いた文字数
  - 改行と空白を除いた文字数

- **AI文章調整**
  - 指定文字数まで文章を増やす
  - 指定文字数まで文章を減らす
  - 自動調整

## セットアップ

1. 依存関係のインストール
```bash
npm install
```

2. 環境変数の設定
`.env`ファイルを作成し、Gemini APIキーを設定します：
```
VITE_GEMINI_API_KEY=your_api_key_here
```

[Gemini APIキーの取得はこちら](https://makersuite.google.com/app/apikey)

3. 開発サーバーの起動
```bash
npm run dev
```

## 使用技術

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Google Generative AI (Gemini)

## ビルド

```bash
npm run build
```

ビルド結果は`dist`ディレクトリに出力されます。