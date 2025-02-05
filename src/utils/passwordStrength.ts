export function getPasswordStrength(password: string): {
  score: number;  // 0-4
  label: string;
  color: string;
} {
  let score = 0;
  
  // Length check
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  
  // Complexity checks
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const strengthMap = {
    0: { label: 'Very Weak', color: 'var(--spice-red)' },
    1: { label: 'Weak', color: 'var(--spice-red)' },
    2: { label: 'Fair', color: 'var(--wood-medium)' },
    3: { label: 'Good', color: 'var(--herb-green)' },
    4: { label: 'Strong', color: 'var(--herb-green)' }
  };

  return {
    score: Math.min(score, 4),
    ...strengthMap[Math.min(score, 4) as keyof typeof strengthMap]
  };
} 