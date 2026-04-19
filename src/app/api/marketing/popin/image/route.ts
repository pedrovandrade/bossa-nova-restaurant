import { NextRequest, NextResponse } from 'next/server';
import { put, del } from '@vercel/blob';
import { requireOwner } from '@/app/api/_util';

const POST = requireOwner(async (request: NextRequest | Request) => {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return new Response(
        JSON.stringify({ error: 'No file provided' }),
        { status: 400 }
      );
    }

    // Optional: validate file type
    if (!file.type.startsWith('image/')) {
      return new Response(
        JSON.stringify({ error: 'Only image uploads are allowed' }),
        { status: 400 }
      );
    }

    // Create a unique filename
    const filename = `marketing/${Date.now()}-${file.name}`;

    // Upload to Vercel Blob
    const blob = await put(filename, file, {
      access: 'public',
    });

    return Response.json({
      url: blob.url,
    });
  } catch (error) {
    console.error('Upload error:', error);

    return new Response(
      JSON.stringify({ error: 'Upload failed' }),
      { status: 500 }
    );
  }
});

const DELETE = requireOwner(async (request: NextRequest | Request) => {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return new NextResponse(
        JSON.stringify({ error: 'Missing "url"' }),
        { status: 400 }
      );
    }

    // Delete the file from Vercel Blob
    await del(url);

    return new NextResponse(
      JSON.stringify({ success: true }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete error:', error);

    return new NextResponse(
      JSON.stringify({ error: 'Failed to delete file' }),
      { status: 500 }
    );
  }
});

export { POST, DELETE };