import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';

export default function Page() {
  async function create(formData: FormData) {
    'use server';
    const sql = neon(`${process.env.DATABASE_URL}`);

    const username = formData.get('username')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const rawPassword = formData.get('password')?.toString();
    const confirmPassword = formData.get('confirmPassword')?.toString();
    const phone = formData.get('phone')?.toString().trim();

    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!username || username.length < 3) {
      throw new Error('Username must be at least 3 characters.');
    }

    if (!emailRegex.test(email || '')) {
      throw new Error('Invalid email format.');
    }

    if (!phoneRegex.test(phone || '')) {
      throw new Error('Phone number must be 10 digits.');
    }

    if ((rawPassword || '').length < 6) {
      throw new Error('Password must be at least 6 characters.');
    }

    if (rawPassword !== confirmPassword) {
      throw new Error('Passwords do not match.');
    }

    await sql`
      INSERT INTO users_signup (username, email, password, phone)
      VALUES (${username}, ${email}, ${rawPassword}, ${phone})
    `;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <form
        action={create}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6 border border-gray-200"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
          <p className="text-gray-500 mt-1 text-sm">Join our community today</p>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="min 3 characters"
              required
              minLength={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="your@email.com"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="min 6 characters"
              required
              minLength={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="retype your password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="10 digits only"
              pattern="[0-9]{10}"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          Sign Up
        </button>

        <div className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <a href="/login" className="text-red-600 hover:text-red-700 font-medium">
            Log in
          </a>
        </div>
      </form>
    </div>
  );
}


