"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Joi from "joi";

export default function AddPlayerPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    position: "",
    team: "",
    image: "",
    logo: "",
  });
  const [errors, setErrors] = useState({}); 

  // ✅ Joi schema
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
      "string.empty": "Player name is required",
      "string.min": "Name must be at least 3 characters",
    }),
    position: Joi.string().min(2).max(30).required().messages({
      "string.empty": "Position is required",
    }),
    team: Joi.string().min(2).max(50).required().messages({
      "string.empty": "Team name is required",
    }),
    image: Joi.string().uri().required().messages({
      "string.empty": "Player image URL is required",
      "string.uri": "Invalid image URL format",
    }),
    logo: Joi.string().uri().required().messages({
      "string.empty": "Team logo URL is required",
      "string.uri": "Invalid logo URL format",
    }),
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = schema.validate(form, { abortEarly: false });

    if (error) {
      const fieldErrors = {};
      error.details.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors); 
      return;
    }

    setErrors({});
    const res = await fetch("/api/players", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (data.success) {
      toast.success("✅ Player added successfully!", {
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
      setForm({ name: "", position: "", team: "", image: "", logo: "" });
      setTimeout(() => router.push("/players"), 1500);
    } else {
      toast.error("❌ Failed to add player!");
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <main className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white py-10 px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-lg w-full bg-gray-900/70 rounded-2xl shadow-[0_0px_15px_rgba(56,189,248,0.25)]
                     border border-gray-800 p-8 backdrop-blur-lg"
        >
          <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Add New Player
          </h1>

          {form.image && (
            <div className="flex flex-col items-center mb-6">
              <img
                src={form.image}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-full border-4 border-cyan-500 shadow-lg mb-3"
              />
              <p className="text-sm text-gray-400">Image Preview</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-gray-200">
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
                <motion.input
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-lg bg-gray-800 border ${
                    errors[field.name]
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-700 focus:ring-cyan-500"
                  } focus:outline-none focus:ring-2 transition`}
                  placeholder={field.label}
                  animate={
                    errors[field.name]
                      ? { x: [-4, 4, -4, 0], transition: { duration: 0.3 } }
                      : {}
                  }
                />
                {errors[field.name] && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-1"
                  >
                    {errors[field.name]}
                  </motion.p>
                )}
              </div>
            ))}

            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0px 18px rgba(56,189,248,0.4)",
              }}
              whileTap={{ scale: 0.9 }}
              type="submit"
              className="flex items-center justify-center gap-2 cursor-pointer
                         bg-gradient-to-r from-blue-800 to-cyan-700 
                         text-white py-3 rounded-lg font-semibold 
                         hover:from-cyan-700 hover:to-blue-800 transition-all duration-300"
            >
              <Plus size={18} /> Add Player
            </motion.button>
          </form>
        </motion.div>
      </main>
    </>
  );
}
