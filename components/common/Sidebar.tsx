"use client";

import Link from "next/link";

export function Sidebar() {
  return (
    <aside className="w-64 bg-gray-200 p-4">
      <nav className="text-black">
        <ul className="space-y-2">
          <li><Link href="/" className="hover:underline">Home</Link></li>
          <li><Link href="/about" className="hover:underline">About</Link></li>
          <li><Link href="/contact" className="hover:underline">Contact</Link></li>
        </ul>
      </nav>
    </aside>
  );
}
