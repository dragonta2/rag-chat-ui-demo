// components/chat/ClearStorageChatButton.tsx

type Props = {
  onClear: () => void;
};

export function ClearStorageChatButton({ onClear }: Props) {
  const handleClick = () => {
    if (confirm("チャット履歴を削除してもよろしいですか？")) {
      onClear();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-1 text-sm text-red-600 underline hover:text-red-800 cursor-pointer transition-colors duration-200"
    >
      🗑️ チャット履歴を削除
    </button>
  );
}
