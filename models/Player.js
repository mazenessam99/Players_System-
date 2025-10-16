import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema({
  name: String,
  position: String,
  team: String,
  image: String, 
  logo: String,
});

export default mongoose.models.Player || mongoose.model("Player", PlayerSchema);
