import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const adminToken = cookies().get('admin-token');

    if (!adminToken || adminToken.value !== 'authenticated') {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    return NextResponse.json({ authenticated: true });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 