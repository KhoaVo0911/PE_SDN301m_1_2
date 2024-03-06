import mongoose from "mongoose";

// Sections Schema
const SectionSchema = new mongoose.Schema(
  {
    sectionName: {
      type: String,
      required: true,
    },
    sectionDescription: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    isMainTask: {
      type: Boolean,
      default: false,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  },
  { timestamps: true }
);

const Section = mongoose.model("Sections", SectionSchema);

export { Section };
