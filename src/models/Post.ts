import mongoose, { Document, Model, Schema } from 'mongoose';

interface IPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: {
    name: string;
    image: string;
    role: string;
  };
  date: string;
  readTime: string;
  featured: boolean;
  published: boolean;
  tags: string[];
  formattedDate: string;
  generateSlug(): string;
  isModified(path: string): boolean;
}

const postSchema = new Schema<IPost, Model<IPost>>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required'],
    trim: true,
    maxlength: [200, 'Excerpt cannot be more than 200 characters'],
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
  },
  image: {
    type: String,
    required: [true, 'Image URL is required'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
  },
  author: {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  date: {
    type: String,
    required: true,
  },
  readTime: {
    type: String,
    required: [true, 'Read time is required'],
    trim: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  published: {
    type: Boolean,
    default: false,
  },
  tags: [{
    type: String,
    trim: true,
  }],
}, {
  timestamps: true,
});

// Create indexes for better query performance
postSchema.index({ slug: 1 });
postSchema.index({ category: 1 });
postSchema.index({ published: 1, date: -1 });
postSchema.index({ featured: 1, date: -1 });

// Virtual for formatted date
postSchema.virtual('formattedDate').get(function(this: IPost) {
  return new Date(this.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
});

// Method to generate slug from title
postSchema.methods.generateSlug = function(this: IPost): string {
  return this.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// Pre-save middleware to ensure slug is unique
postSchema.pre('save', async function(this: IPost, next: () => void) {
  if (this.isModified('title')) {
    let slug = this.generateSlug();
    let counter = 1;
    
    while (true) {
      const existingPost = await (this.constructor as Model<IPost>).findOne({ slug });
      if (!existingPost) break;
      
      slug = `${this.generateSlug()}-${counter}`;
      counter++;
    }
    
    this.slug = slug;
  }
  next();
});

export const Post = mongoose.models.Post || mongoose.model<IPost>('Post', postSchema); 