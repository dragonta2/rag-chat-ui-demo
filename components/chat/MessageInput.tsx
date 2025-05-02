// app/components/chat/MessageInput.tsx

type Props = {
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
};

export function MessageInput({ input, onInputChange, onSubmit }: Props) {
  return (
    <div className="p-4 border-t flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        className="flex-1 border rounded p-2"
        placeholder="メッセージを入力..."
        onKeyDown={(e) => {
          if (e.key === "Enter") onSubmit();
        }}
      />
      <button
        onClick={onSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        送信
      </button>
    </div>
  );
}
