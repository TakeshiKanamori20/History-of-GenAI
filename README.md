# History-of-GenAI Vercel版

## デプロイ手順

1. GitHubにこのリポジトリを公開
2. Vercelで新規プロジェクトとしてこのリポジトリを選択
3. Vercelの「環境変数」設定で `OPENAI_API_KEY` を登録
4. デプロイ完了後、Vercelが生成するURLにアクセス

## 注意
- `.env`ファイルはGitHubに公開しない
- APIキーはVercelの管理画面で登録

# 管理者RNN Flask API

## 概要
- Flask＋ONNX Runtimeで管理者RNNモデル（ONNX形式）をAPI化
- `/predict` エンドポイントでテキスト生成

## クラウドデプロイ（Render例）
1. [Render](https://render.com/) に無料アカウント作成
2. 新規Web Service作成 → GitHubリポジトリを選択
3. Build Command: `pip install -r requirements.txt`
4. Start Command: `python admin_rnn_api.py`
5. `Procfile`をリポジトリに追加（`web: python admin_rnn_api.py`）
6. `simple_rnn.onnx`をリポジトリに含める
7. デプロイ後、表示されたURL（例: https://your-app.onrender.com/predict）をフロントエンドのAPIエンドポイントに設定

## セットアップ
```powershell
pip install -r requirements.txt
```

## 起動方法
```powershell
python admin_rnn_api.py
```

## API例
POST `/predict`
```
{
  "input": "AIは"
}
```

## 注意
- `simple_rnn.onnx` を同じディレクトリに配置してください
- 文字集合（CHARS）は学習時と一致させてください
