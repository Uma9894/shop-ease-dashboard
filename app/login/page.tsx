/*'use client';

import { useActionState, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loginAction } from './action';

interface LoginState {
  error?: string;
  success?: boolean;
}

export default function LoginPage() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [state, formAction] = useActionState<LoginState, FormData>(async (prevState, formData) => {
    setIsPending(true);
    try {
      const result = await loginAction(prevState, formData);
      if (result.success) {
        setShouldRedirect(true);
      }
      return result;
    } finally {
      setIsPending(false);
    }
  }, {});

  useEffect(() => {
    if (shouldRedirect) {
      router.push('/dashboard');
    }
  }, [shouldRedirect, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 p-4">
      <form
        action={formAction}
        className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md space-y-4"
      >
        <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800">Login</h2>

        {state.error && (
          <div className="text-red-600 text-sm md:text-base text-center font-medium p-2 bg-red-50 rounded-lg">
            {state.error}
          </div>
        )}

        <div className="space-y-3">
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
              autoComplete="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base"
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
              placeholder="••••••••"
              required
              autoComplete="current-password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition flex justify-center items-center ${
            isPending ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isPending ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Logging in...
            </>
          ) : 'Login'}
        </button>

      </form>
    </div>
  );
}*/

'use client';

import { useActionState, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loginAction } from './action';

interface LoginState {
  error?: string;
  success?: boolean;
}

export default function LoginPage() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [state, formAction] = useActionState<LoginState, FormData>(async (prevState, formData) => {
    setIsPending(true);
    try {
      const result = await loginAction(prevState, formData);
      if (result.success) {
        setShouldRedirect(true);
      }
      return result;
    } finally {
      setIsPending(false);
    }
  }, {});

  useEffect(() => {
    if (shouldRedirect) {
      router.push('/dashboard');
    }
  }, [shouldRedirect, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <form
        action={formAction}
        className="bg-white p-8 rounded-xl shadow-sm w-full max-w-md space-y-6 border border-gray-200"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-500 mt-1 text-sm">Sign in to your account</p>
        </div>

        {state.error && (
          <div className="text-red-600 text-sm text-center font-medium p-3 bg-red-50 rounded-lg border border-red-100">
            {state.error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="your@email.com"
              required
              autoComplete="email"
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
              placeholder="••••••••"
              required
              autoComplete="current-password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className={`w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg ${
            isPending ? 'opacity-80 cursor-not-allowed' : ''
          }`}
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Authenticating...
            </span>
          ) : 'Sign In'}
        </button>

        <div className="text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <a href="/signup" className="text-red-600 hover:text-red-700 font-medium">
            Create one
          </a>
        </div>
      </form>
    </div>
  );
}
