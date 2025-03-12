import React from 'react';
import type { AppProps } from 'next/app';
import '../components/gallery/carousel/carouselOverrides.css';  // Import the global CSS file here
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}