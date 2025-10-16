"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 
                    text-white px-6 py-4  
                    shadow-[0_6px_15px_rgba(56,189,248,0.25)] border-b border-gray-700">
      <div className="container flex justify-between items-center">
              {/* Logo / Title */}
      <Link href="/" className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        Players App
      </Link>

      {/* Links */}
      <div className="space-x-4 text-sm md:text-base">
        <Link
          href="/players"
          className="hover:text-cyan-400 transition duration-300 font-medium"
        >
          Players
        </Link>
        <Link
          href="/players/add-player"
          className="hover:text-blue-400 transition duration-300 font-medium"
        >
          Add Player
        </Link>
      </div>
      </div>
    </nav>
  );
}
