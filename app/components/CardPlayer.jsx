"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Edit2, Shield, Trash2 } from "lucide-react";

export default function CardPlayer({ player, onDelete }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeIn" }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 10px 15px rgba(56, 189, 248, 0.25)", 
      }}
      whileTap={{ scale: 0.7 }}
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900
                 text-white rounded-2xl overflow-hidden 
                 shadow-[0_6px_15px_rgba(0,0,0,0.4)] 
                 transition-all duration-500 flex flex-col border border-gray-700 cursor-pointer"
    >
      {/* Player Image */}
      <div className="relative">
        <img
          src={player.image || "/default-player.png"}
          alt={player.name}
          className="w-full h-52 object-cover transition-transform duration-500 hover:scale-105"
        />
        {player.logo && (
          <img
            src={player.logo}
            alt="Team logo"
            className="absolute top-3 left-3 w-10 h-10 rounded-full 
                       border border-cyan-400 bg-gray-900/80"
          />
        )}
      </div>

      {/* Player Info */}
      <div className="p-5 flex flex-col flex-1">
        <h2 className="font-semibold text-xl mb-1 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          {player.name}
        </h2>
        <p className="text-gray-300 text-sm mb-1">⚽ Position: {player.position}</p>
        <p className="text-gray-400 text-sm mb-4 flex gap-2 items-center"><Shield className="h-4 w-4" /> Team: {player.team}</p>

        {/* Buttons */}
        <div className="mt-auto flex justify-between">
          <Link
            href={`/players/${player._id}`}
            className="flex items-center gap-1 bg-gradient-to-r from-cyan-500 to-blue-500 
                       text-white px-4 py-1.5 rounded-lg text-sm font-semibold 
                       hover:from-cyan-400 hover:to-blue-400 transition-all duration-300"
          >
            <Edit2 size={14} /> Edit
          </Link>

          <button
            onClick={() => onDelete(player._id)}
            className="flex items-center gap-1 bg-red-600 text-white 
                       px-4 py-1.5 rounded-lg text-sm font-semibold 
                       hover:bg-red-700 transition-all duration-300"
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
}
