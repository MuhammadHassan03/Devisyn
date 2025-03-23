import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';
import { Setting } from '@/models/Setting';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    let settings = await Setting.findOne();

    if (!settings) {
      // Create default settings if none exist
      settings = await Setting.create({
        siteName: 'Devisyn',
        logo: '/logo.png',
        description: 'Custom software solutions, web applications, and digital transformation services.',
        email: 'contact@devisyn.com',
        phone: '+1 (555) 123-4567',
        address: '123 Tech Street, Digital City, DC 12345',
        socialMedia: {
          twitter: 'https://twitter.com/devisyn',
          linkedin: 'https://linkedin.com/company/devisyn',
          github: 'https://github.com/devisyn',
        },
        colors: {
          primary: '#00FF9D',
          secondary: '#6B46FF',
          background: '#0A0A0A',
        },
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    await connectToDatabase();

    let settings = await Setting.findOne();

    if (!settings) {
      settings = await Setting.create(body);
    } else {
      settings = await Setting.findByIdAndUpdate(settings._id, body, { new: true });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 