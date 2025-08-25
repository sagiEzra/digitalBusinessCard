import React from 'react';
import type { AppProps } from 'next/app';
import '../components/gallery/carousel/carouselOverrides.css';  // Import the global CSS file here
import '../styles/globals.css';
import { AuthProvider } from '../lib/auth/AuthContext';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}