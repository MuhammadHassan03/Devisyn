import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db('devisyn');
    
    // First try to find by slug
    let blog = await db.collection('blogs').findOne({ slug: params.slug });

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    // Convert ObjectId to string for client-side compatibility
    const blogWithStringId = {
      ...blog,
      _id: blog._id.toString(),
    };

    return NextResponse.json(blogWithStringId);
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db('devisyn');
    const blog = await request.json();

    // Remove _id from the update object as it's immutable
    const { _id, ...updateData } = blog;

    const result = await db.collection('blogs').findOneAndUpdate(
      { slug: params.slug },
      { $set: updateData },
      { returnDocument: 'after' }
    );

    if (!result) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    // Convert ObjectId to string for client-side compatibility
    const updatedBlog = {
      ...result,
      _id: result._id.toString(),
    };

    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { error: 'Failed to update blog' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db('devisyn');
    const result = await db.collection('blogs').findOneAndDelete({ slug: params.slug });

    if (!result) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog' },
      { status: 500 }
    );
  }
} 