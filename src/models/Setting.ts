import mongoose, { Document, Schema } from 'mongoose';

interface ISetting extends Document {
  siteName: string;
  logo: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  socialMedia: {
    twitter: string;
    linkedin: string;
    github: string;
  };
  colors: {
    primary: string;
    secondary: string;
    background: string;
  };
}

const settingSchema = new Schema<ISetting>({
  siteName: {
    type: String,
    required: true,
    trim: true,
  },
  logo: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
  },
  socialMedia: {
    twitter: {
      type: String,
      required: true,
    },
    linkedin: {
      type: String,
      required: true,
    },
    github: {
      type: String,
      required: true,
    },
  },
  colors: {
    primary: {
      type: String,
      required: true,
      default: '#00FF9D',
    },
    secondary: {
      type: String,
      required: true,
      default: '#6B46FF',
    },
    background: {
      type: String,
      required: true,
      default: '#0A0A0A',
    },
  },
}, {
  timestamps: true,
});

export const Setting = mongoose.models.Setting || mongoose.model<ISetting>('Setting', settingSchema); 