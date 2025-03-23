import mongoose, { Document, Schema } from 'mongoose';

interface IProject extends Document {
  title: string;
  description: string;
  category: string;
  image: string;
  technologies: string[];
  features: string[];
  link: string;
  order: number;
}

const projectSchema = new Schema<IProject>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  technologies: [{
    type: String,
    required: true,
  }],
  features: [{
    type: String,
    required: true,
  }],
  link: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
    default: 0,
  },
}, {
  timestamps: true,
});

export const Project = mongoose.models.Project || mongoose.model<IProject>('Project', projectSchema); 