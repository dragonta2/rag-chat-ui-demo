"use client";

export type Source = {
  title: string;
  url: string;
  snippet: string;
};

export default function SourceList({ sources }: { sources: Source[] }) {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="mt-4 p-4 bg-gray-50 text-black border border-gray-200 rounded">
      <h3 className="text-sm font-semibold mb-2">参考文献</h3>
      <ul className="space-y-2 text-sm">
        {sources.map((src, idx) => (
          <li key={idx}>
            <a
              href={src.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {src.title}
            </a>
            <p className="text-gray-600 text-xs mt-1">{src.snippet}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
