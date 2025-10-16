"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
export default function PlayerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [player, setPlayer] = useState(null);
  const [form, setForm] = useState({
    name: "",
    position: "",
    team: "",
    image: "",
    logo: "",
  });

 useEffect(() => {
  if (!params?.id) return;
  const fetchPlayer = async () => {
    try {
      const res = await fetch(`/api/players/${params.id}`);
      const data = await res.json();
      if (data.success) {
        setPlayer(data.data);
        setForm(data.data);
      }
    } catch (err) {
      console.error("Error fetching player:", err);
    }
  };
  fetchPlayer();
}, [params?.id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
  e.preventDefault();
  console.log("Updating player with:", form);
  const res = await fetch(`/api/players/${params.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });
    const data = await res.json();
    if (data.success) {
      toast.success("✅ Player updated successfully!", {
        style: {
          background: "#0f172a",
          color: "#e0f2fe",
          border: "1px solid #38bdf8",
        },
        iconTheme: {
          primary: "#38bdf8",
          secondary: "#0f172a",
        },
      });
      setTimeout(() => router.push("/players"), 1500);
    } else {
      toast.error("❌ Failed to update player!", {
        style: {
          background: "#0f172a",
          color: "#fca5a5",
          border: "1px solid #ef4444",
        },
        iconTheme: {
          primary: "#ef4444",
          secondary: "#0f172a",
        },
      });
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white py-10 px-4">
        {player ? (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-lg mx-auto bg-gray-900/70 rounded-2xl shadow-[0_6px_20px_rgba(0,0,0,0.5)] border border-gray-800 p-6"
          >
            <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent text-center">
              Edit Player
            </h1>

            <div className="flex flex-col items-center mb-6">
              <img
                src={form.image || "/default-player.png"}
  alt={form.name || "Unknown Player"}
                className="w-32 h-32 object-cover rounded-full border-4 border-blue-500 shadow-md mb-3"
              />
              <p className="text-sm text-gray-400">Preview</p>
            </div>

            <form
              onSubmit={handleUpdate}
              className="flex flex-col gap-4 text-gray-200"
            >
              {[
                { name: "name", label: "Player Name" },
                { name: "position", label: "Position" },
                { name: "team", label: "Team" },
                { name: "image", label: "Player Image URL" },
                { name: "logo", label: "Team Logo URL" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm mb-1 text-gray-400">
                    {field.label}
                  </label>
                  <input
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    placeholder={field.label}
                  />
                </div>
              ))}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-lg font-semibold hover:shadow-[0_0_15px_rgba(56,189,248,0.5)] transition-all duration-300"
              >
                <Save size={18} /> Update Player
              </motion.button>
            </form>
          </motion.div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-400 text-lg mt-20"
          >
            Loading player data...
          </motion.p>
        )}
      </main>
    </>
  );
}
