import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Page() {
  const h = await headers();
  const country = (h.get('x-vercel-ip-country') || h.get('x-edge-country') || h.get('x-nf-country') || '').toLowerCase();
  const acceptLang = (h.get('accept-language') || '').toLowerCase();

  // Decide locale: prefer Geo IP when available, fall back to Accept-Language.
  const prefersMyanmar = country === 'mm' || acceptLang.startsWith('my') || acceptLang.includes('my-');

  if (prefersMyanmar) {
    redirect('/mm');
  }

  return redirect('/en');
}
