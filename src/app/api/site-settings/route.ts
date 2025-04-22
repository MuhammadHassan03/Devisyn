import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const settings = await db.collection('siteSettings').findOne({});
    
    if (!settings) {
      // Return default settings if none exist
      return NextResponse.json({
        siteName: 'Devisyn',
        siteDescription: 'Modern Web Development Agency',
        logo: '',
        favicon: '',
        contactEmail: '',
        contactPhone: '',
        socialLinks: {
          facebook: '',
          twitter: '',
          linkedin: '',
          instagram: '',
        },
        meta: {
          title: '',
          description: '',
          keywords: '',
        },
        hero: {
          title: '',
          subtitle: '',
          ctaText: '',
          ctaLink: '',
          backgroundImage: '',
        },
        about: {
          title: '',
          description: '',
          image: '',
          features: [],
        },
        services: {
          title: '',
          subtitle: '',
          items: [],
        },
        testimonials: {
          title: '',
          subtitle: '',
          items: [],
        },
        team: {
          title: '',
          subtitle: '',
          members: [],
        },
        contact: {
          title: '',
          subtitle: '',
          address: '',
          email: '',
          phone: '',
          mapEmbed: '',
        },
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch site settings' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const settings = await request.json();
    const { db } = await connectToDatabase();

    // Update or insert settings
    await db.collection('siteSettings').updateOne(
      {},
      { $set: settings },
      { upsert: true }
    );

    return NextResponse.json({ message: 'Settings updated successfully' });
  } catch (error) {
    console.error('Error updating site settings:', error);
    return NextResponse.json(
      { error: 'Failed to update site settings' },
      { status: 500 }
    );
  }
} 