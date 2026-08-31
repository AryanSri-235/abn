import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const res = await query('SELECT * FROM photos ORDER BY created_at DESC');
    return NextResponse.json(res.rows);
  } catch (error: any) {
    console.error('Error fetching photos from DB:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, title, category, image, description } = body;
    const newId = id || `photo-${Date.now()}`;

    const res = await query(
      `INSERT INTO photos (id, title, category, image, description)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [newId, title, category, image, description || '']
    );

    return NextResponse.json(res.rows[0]);
  } catch (error: any) {
    console.error('Error creating photo in DB:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title, category, image, description } = body;

    const res = await query(
      `UPDATE photos
       SET title = $1, category = $2, image = $3, description = $4
       WHERE id = $5
       RETURNING *`,
      [title, category, image, description || '', id]
    );

    return NextResponse.json(res.rows[0]);
  } catch (error: any) {
    console.error('Error updating photo in DB:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Photo ID is required' }, { status: 400 });
    }

    await query('DELETE FROM photos WHERE id = $1', [id]);
    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    console.error('Error deleting photo from DB:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
