import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    console.log('Login attempt:', { email });

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('devisyn');
    const admin = await db.collection('Admin').findOne({ email });
    console.log('Found admin:', admin ? 'yes' : 'no');

    if (!admin) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Direct comparison since password is stored as plain text
    console.log('Password comparison:', {
      input: password,
      stored: admin.password,
      match: password === admin.password
    });

    if (password !== admin.password) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );

    const response = NextResponse.json(
      { message: 'Login successful' },
      { status: 200 }
    );

    // Set the token as an HTTP-only cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
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