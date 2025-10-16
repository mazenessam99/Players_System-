"use client";
import { useEffect, useState } from "react";
import CardPlayer from "@/app/components/CardPlayer";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

export default function PlayersPage() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPlayers = async () => {
    try {
      const res = await fetch("/api/players");
      const data = await res.json();
      if (data.success) setPlayers(data.data);
    } catch (error) {
      console.error("Failed to fetch players:", error);
      toast.error("Failed to load players!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/players/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("Player deleted!");
        fetchPlayers();
      } else toast.error("Delete failed!");
    } catch {
      toast.error("Error deleting player!");
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <>
      <Toaster position="top-center" />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row justify-between items-center mb-10"
          >
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-cyan-400 text-transparent bg-clip-text">
              Players Dashboard 
            </h1>
            <p className="text-gray-400 mt-2 md:mt-0 text-sm">
              Manage, view, and edit your players seamlessly.
            </p>
          </motion.div>

          {/* Loading */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin text-blue-400 w-10 h-10" />
            </div>
          ) : players.length === 0 ? (
            // Empty State
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center text-center py-20"
            >
              <p className="text-gray-400 text-lg mb-4">No players found yet ⚽</p>
              <button
                onClick={() => (window.location.href = "/players/add-player")}
                className="bg-blue-500 text-white cursor-pointer px-6 py-3 rounded-lg font-semibold hover:bg-blue-400 transition"
              >
                Add Your First Player
              </button>
            </motion.div>
          ) : (
            // Player Grid
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {players.map((player) => (
                <CardPlayer key={player._id} player={player} onDelete={handleDelete} />
              ))}
            </motion.main>
          )}
        </div>
      </div>
    </>
  );
}
