"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white text-center px-4">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight"
      >
        ⚽ Welcome to{" "}
        <Link
          href="/"
          className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent"
        >
          Players App
        </Link>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed"
      >
        Manage your football players effortlessly — Add, View, Edit, and Delete
        them in one smooth and modern dashboard.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="flex flex-wrap justify-center gap-5"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push("/players")}
          className="bg-gradient-to-r from-blue-900 to-cyan-800 text-white cursor-pointer px-8 py-3 rounded-xl text-lg font-semibold shadow-lg hover:shadow-cyan-500/40 transition-all duration-300"
        >
          View Players
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push("/players/add-player")}
          className="bg-gradient-to-r from-cyan-800 to-blue-900 text-white cursor-pointer px-8 py-3 rounded-xl text-lg font-semibold shadow-lg hover:shadow-blue-500/40 transition-all duration-300"
        >
          Add Player
        </motion.button>
      </motion.div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="text-gray-600 text-sm mt-16"
      >
        
      </motion.p>
    </div>
  );
}
