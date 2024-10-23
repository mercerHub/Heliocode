import mongoose from "mongoose";

const astSchema = new mongoose.Schema({
  ast: {
    type: Object,
    required: true,
    unique: true,
  },
  name:{
    type: String,
    required: true,
    unique: true,
  }

}, { timestamps: true });

export default mongoose.model('AST', astSchema);