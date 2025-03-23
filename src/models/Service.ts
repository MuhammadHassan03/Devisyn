import mongoose, { Document, Schema } from 'mongoose';

interface IService extends Document {
  title: string;
  description: string;
  icon: string;
  features: string[];
  technologies: string[];
  order: number;
}

const serviceSchema = new Schema<IService>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  features: [{
    type: String,
    required: true,
  }],
  technologies: [{
    type: String,
    required: true,
  }],
  order: {
    type: Number,
    required: true,
    default: 0,
  },
}, {
  timestamps: true,
});

export const Service = mongoose.models.Service || mongoose.model<IService>('Service', serviceSchema); 