import { NextResponse } from 'next/server';

export async function GET() {
  // Simulate database fetch
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', amount: 1250 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', amount: 2350 },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', amount: 1895 },
  ];

  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return NextResponse.json(users);
}