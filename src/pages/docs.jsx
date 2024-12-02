// pages/docs.js
import { useEffect } from 'react';

export default function SwaggerRedirect() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.href = '/api/swagger-ui';
    }
  }, []);

  return null;
}