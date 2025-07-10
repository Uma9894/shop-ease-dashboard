/*import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  // Verify content type first
  const contentType = req.headers.get('content-type');
  if (!contentType?.includes('application/json')) {
    return NextResponse.json(
      { 
        error: 'Invalid content type',
        message: 'Content-Type must be application/json' 
      },
      { status: 415 }
    );
  }

  // Read the raw body first
  let bodyText: string;
  try {
    bodyText = await req.text();
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Failed to read request body',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 400 }
    );
  }

  // Check for empty body
  if (!bodyText.trim()) {
    return NextResponse.json(
      { error: 'Empty request body' },
      { status: 400 }
    );
  }

  // Parse JSON with detailed error handling
  let parsedBody: any;
  try {
    parsedBody = JSON.parse(bodyText);
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Malformed JSON');
    
    // Provide detailed diagnostics
    return NextResponse.json(
      {
        error: 'Invalid JSON format',
        message: err.message,
        diagnostics: {
          firstCharacters: bodyText.slice(0, 50),
          contentType,
          contentLength: req.headers.get('content-length')
        }
      },
      { status: 400 }
    );
  }

  // Validate required fields
  const { name, email, password } = parsedBody;
  const missingFields = [];
  if (!name) missingFields.push('name');
  if (!email) missingFields.push('email');
  if (!password) missingFields.push('password');

  if (missingFields.length > 0) {
    return NextResponse.json(
      {
        error: 'Missing required fields',
        missingFields
      },
      { status: 400 }
    );
  }

  // Rest of your business logic
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 } // 409 Conflict is more appropriate
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return NextResponse.json(
      {
        message: 'User registered successfully',
        user: { id: user.id, email: user.email }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}*/