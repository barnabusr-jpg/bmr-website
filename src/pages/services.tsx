import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ServicesRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/strategic-advisory');
  }, [router]); // Standardized: Added router to the dependency array

  return null;
}
