import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { generateSlug } from '@/lib/utils';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db('devisyn');
    
    const blog = await db.collection('blogs').findOne({
      _id: new ObjectId(params.id)
    });

    if (!blog) {
      return NextResponse.json(
        { message: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db('devisyn');
    
    // Ensure the slug is generated from the title if it's not provided
    const slug = body.slug || generateSlug(body.title);
    
    // Prepare the blog update object
    const blogUpdate = {
      title: body.title,
      slug,
      content: body.content,
      excerpt: body.excerpt,
      featuredImage: body.featuredImage || null,
      status: body.status,
      metaTitle: body.metaTitle,
      metaDescription: body.metaDescription,
      metaKeywords: body.metaKeywords,
      canonicalUrl: body.canonicalUrl,
      schemaMarkup: body.schemaMarkup,
      readTime: body.readTime,
      updatedAt: new Date().toISOString(),
    };

    // Check if the slug is already in use by another blog
    const existingBlog = await db.collection('blogs').findOne({
      slug,
      _id: { $ne: new ObjectId(params.id) }
    });

    if (existingBlog) {
      return NextResponse.json(
        { error: 'A blog with this slug already exists' },
        { status: 400 }
      );
    }

    const result = await db.collection('blogs').updateOne(
      { _id: new ObjectId(params.id) },
      { $set: blogUpdate }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    
    return NextResponse.json({ ...blogUpdate, _id: params.id });
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db('devisyn');
    
    const result = await db.collection('blogs').deleteOne({
      _id: new ObjectId(params.id)
    });
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
} 