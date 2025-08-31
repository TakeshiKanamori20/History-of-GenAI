// local_rnn.js
// ローカルRNNモデル（ONNX）推論ボタンのイベントとONNX.jsのサンプル処理

// ONNX.jsが読み込まれている前提
// simple_rnn.onnxファイルはWebサーバー上に配置してください

document.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('localRnnBtn');
  const output = document.getElementById('localRnnOutput');
  if (!btn || !output) return;

  btn.addEventListener('click', async () => {
    output.textContent = "推論準備中…";
    try {
      // ONNXモデルのロード
      const session = new onnx.InferenceSession();
      await session.loadModel('simple_rnn.onnx');

      // 入力テキストを取得（例：ユーザー入力欄の値）
      const inputText = document.getElementById('userInput').value.trim();
      if (!inputText) {
        output.textContent = "入力文を入力してください";
        return;
      }

  // --- 学習時の文字集合と一致させる ---
  const chars = ["A","I","は","進","化","す","る","文","章","を","生","成","し","ま","す","人","間","の","よ","う","に","考","え","様","々","分","野","で","活","躍","し","て","い","ま","す","自","然","言","語","理","解"];
  const char2idx = {};
  chars.forEach((c, i) => { char2idx[c] = i; });
      // 入力文をインデックス列に変換
      const inputArr = inputText.split('');
      // 学習時の文字以外が含まれていないかチェック
      const unknownChars = inputArr.filter(c => !(c in char2idx));
      if (unknownChars.length > 0) {
        output.textContent = `未学習の文字が含まれています: ${unknownChars.join(',')}`;
        return;
      }
      let inputSeq = inputArr.map(c => char2idx[c]);
      if (inputSeq.length === 0) {
        output.textContent = "入力文が空です";
        return;
      }
      // ONNX.js用Tensor作成（int32型、shape=[1, seq_len]）
      const inputTensor = new onnx.Tensor(new Int32Array(inputSeq), 'int32', [1, inputSeq.length]);
      let resultIdx = null;
      try {
        const outputMap = await session.run({input: inputTensor});
        resultIdx = Array.from(outputMap.output.data);
      } catch (e) {
  output.textContent = "推論エラー: 管理者RNNモデルの型・構造・入力形式がWeb推論と一致していません。\n（ONNX.jsはRNN/LSTM/GRUの型やshapeに厳密な制約があります）\n" + e;
        return;
      }
      // インデックス→文字変換
      const idx2char = {};
      chars.forEach((c, i) => { idx2char[i] = c; });
      const resultText = resultIdx.map(i => idx2char[Number(i)] ?? '?').join('');
      output.textContent = "推論結果: " + resultText;
    } catch (e) {
      output.textContent = "推論エラー: " + e;
    }
  });
});
