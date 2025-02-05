interface AuthResponse {
  token?: string;
  error?: string;
  user?: {
    id: string;
    email: string;
    name?: string;
    image?: string;
  };
}

export async function signIn(email: string, password: string): Promise<void> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data: AuthResponse = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Failed to sign in');
  }
}

export async function signUp(name: string, email: string, password: string): Promise<void> {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });

  const data: AuthResponse = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Failed to create account');
  }
}

export async function signOut(): Promise<void> {
  await fetch('/api/auth/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });
} 