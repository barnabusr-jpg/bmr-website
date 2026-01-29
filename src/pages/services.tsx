import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ServicesRedirect() {
  const router = useRouter();
  useEffect(() => { router.replace('/strategic-advisory'); }, []);
  return null;
}
