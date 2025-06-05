// app/components/chat/MessageInput.tsx

type Props = {
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
};

// components/chat/ChatBox.tsx の中で受け取った以下のprops達を利用
export function MessageInput({ input, onInputChange, onSubmit, loading }: Props) {
  return (
    <div className="p-4 border-t flex gap-2">
      <input
        type="text"
        value={input}
        // 文字入力されるたびに、useStateの状態更新関数のsetInputに渡す → useStateの状態が更新されて Reactが再レンダリングされる。
        onChange={(e) => onInputChange(e.target.value)}
        className="flex-1 border rounded p-2"
        placeholder="メッセージを入力..."
        // Enterキーが押されたら、onSubmit() = handleSubmit関数を実行する
        onKeyDown={(e) => {
          if (e.key === "Enter") onSubmit();
        }}

        disabled={loading}
      />
      <button
        // 送信ボタンが押されたら、onSubmit() = handleSubmit関数を実行する
        onClick={onSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "送信中..." : "送信"}
      </button>
    </div>
  );
}
