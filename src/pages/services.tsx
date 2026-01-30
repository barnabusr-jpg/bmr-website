import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ServicesRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/strategic-advisory');
  }, [router]); // Added dependency here to fix build warning

  return null;
}
