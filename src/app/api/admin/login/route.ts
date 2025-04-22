import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import clientPromise from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    console.log('Login attempt with:', { email });

    const client = await clientPromise;
    const db = client.db('devisyn');
    const admin = await db.collection('Admin').findOne({ email });

    if (!admin) {
      console.log('Admin not found');
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Direct password comparison since it's stored as plain text
    if (password !== admin.password) {
      console.log('Password mismatch');
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    console.log('Authentication successful');
    
    // Create a response with success message
    const response = NextResponse.json({ message: 'Login successful' });

    // Set the admin token cookie
    response.cookies.set('admin-token', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 