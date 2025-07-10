import { NextResponse } from 'next/server';

// Mock database - in a real app, you'd use a database
let customers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', amount: 1250, status: 'active', lastPurchase: '2023-05-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', amount: 2350, status: 'active', lastPurchase: '2023-05-18' },
  // Add more mock data as needed
];

export async function GET() {
  return NextResponse.json(customers);
}

export async function POST(request: Request) {
  try {
    const newCustomer = await request.json();
    const id = Math.max(...customers.map(c => c.id)) + 1;
    const customer = { id, ...newCustomer };
    customers.push(customer);
    return NextResponse.json(customer, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid customer data' },
      { status: 400 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, ...updateData } = await request.json();
    customers = customers.map(c => 
      c.id === id ? { ...c, ...updateData } : c
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update customer' },
      { status: 400 }
    );
  }
}