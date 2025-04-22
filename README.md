# Devisyn - Modern Web Development Agency Theme

A modern, responsive Next.js theme for web development agencies. Built with TypeScript, Tailwind CSS, and MongoDB.

## Table of Contents
- [Installation](#installation)
- [Configuration](#configuration)
- [Customization](#customization)
- [Features](#features)
- [File Structure](#file-structure)
- [Editing Guide](#editing-guide)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Configuration

### Environment Variables
Create a `.env.local` file with the following variables:
```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

### MongoDB Setup
1. Create a MongoDB database
2. Update the connection string in `.env.local`
3. The theme will automatically create necessary collections

## Customization

### Colors and Theme
Edit `tailwind.config.js` to customize colors and theme:
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-color',
        secondary: '#your-color',
      },
    },
  },
}
```

### Fonts
1. Add your fonts to `public/fonts/`
2. Update `src/app/globals.css` with your font imports
3. Update font families in `tailwind.config.js`

### Images
1. Replace logo: `public/images/logo.svg`
2. Replace favicon: `public/favicon.ico`
3. Add your images to `public/images/`

## Features

### Blog System
- Create, edit, and delete blog posts
- Rich text editor with image support
- SEO-friendly URLs
- Featured images
- Draft and published states

### Admin Dashboard
- Secure authentication
- Blog management
- User-friendly interface
- Responsive design

### SEO Optimization
- Meta tags
- Open Graph tags
- Schema markup
- Sitemap generation

## File Structure

```
src/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin routes
│   ├── api/               # API routes
│   ├── blog/              # Blog routes
│   └── page.tsx           # Home page
├── components/            # Reusable components
├── lib/                   # Utility functions
└── styles/               # Global styles
```

## Editing Guide

### Home Page
Edit `src/app/page.tsx` to customize:
- Hero section
- Services
- Portfolio
- Testimonials
- Contact form

### Blog Posts
1. Access admin dashboard at `/admin`
2. Create new posts at `/admin/dashboard/create`
3. Edit existing posts at `/admin/dashboard/edit/[slug]`

### Styling
1. Global styles: `src/app/globals.css`
2. Component styles: `src/components/*.tsx`
3. Tailwind configuration: `tailwind.config.js`

### API Endpoints
- Blog posts: `/api/blogs`
- Authentication: `/api/auth`
- Contact form: `/api/contact`

### Database Schema
```typescript
interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}
```

## Support
For support, please contact the theme author through Envato.

## License
This theme is licensed under the Envato Regular License. 