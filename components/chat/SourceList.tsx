export type Source = {
  title: string;
  url: string;
};

type Props = {
  sources: Source[];
};

export default function SourceList({ sources }: Props) {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="mt-4 border-t pt-2">
      <h3 className="text-sm font-bold mb-1">出典：</h3>
      <ul className="list-disc pl-5 text-sm text-blue-600">
        {sources.map((source, idx) => (
          <li key={idx}>
            <a href={source.url} target="_blank" rel="noopener noreferrer">
              {source.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
