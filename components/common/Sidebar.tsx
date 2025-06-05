"use client";

export function Sidebar() {
  return (
    <aside className="w-64 bg-gray-200 p-4">
      <nav className="text-black">
        <ul className="space-y-2">
          <li><a href="/" className="hover:underline">Home</a></li>
          <li><a href="/about" className="hover:underline">About</a></li>
          <li><a href="/contact" className="hover:underline">Contact</a></li>
        </ul>
      </nav>
    </aside>
  );
}
