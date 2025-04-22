import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Blog } from '@/types/blog';
import { ObjectId } from 'mongodb';
import { generateSlug } from '@/lib/utils';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const isAdmin = searchParams.get('admin') === 'true';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '6');
    const skip = (page - 1) * limit;
    
    const client = await clientPromise;
    const db = client.db('devisyn');
    
    // For admin dashboard, show all blogs
    // For public blog page, show only published blogs
    const query = isAdmin ? {} : { status: 'published' };
    
    // Get total count for pagination
    const total = await db.collection('blogs').countDocuments(query);
    
    const blogs = await db.collection('blogs')
      .find(query)
      .project({ 
        _id: 1,
        title: 1,
        excerpt: 1,
        content: 1,
        featuredImage: 1,
        createdAt: 1,
        slug: 1,
        author: 1,
        status: 1,
        readTime: 1
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();
    
    // Ensure each blog has a slug
    const blogsWithSlugs = blogs.map(blog => ({
      ...blog,
      slug: blog.slug || generateSlug(blog.title)
    }));
    
    return NextResponse.json({
      blogs: blogsWithSlugs,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db('devisyn');
    
    const slug = generateSlug(body.title);
    
    // Check if a blog with this slug already exists
    const existingBlog = await db.collection('blogs').findOne({ slug });
    if (existingBlog) {
      // If it exists, append a random string to make it unique
      const uniqueSlug = `${slug}-${Math.random().toString(36).substring(2, 8)}`;
      body.slug = uniqueSlug;
    } else {
      body.slug = slug;
    }
    
    const blog = {
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const result = await db.collection('blogs').insertOne(blog);
    
    return NextResponse.json({ ...blog, _id: result.insertedId });
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const blog: Blog = await request.json();
    
    if (!blog._id) {
      return NextResponse.json(
        { message: 'Blog ID is required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('devisyn');
    
    const updatedBlog = {
      ...blog,
      updatedAt: new Date(),
    };

    await db.collection('blogs').updateOne(
      { _id: new ObjectId(blog._id) },
      { $set: updatedBlog }
    );
    
    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { message: 'Blog ID is required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('devisyn');
    
    await db.collection('blogs').deleteOne({ _id: new ObjectId(id) });
    
    return NextResponse.json(
      { message: 'Blog deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 