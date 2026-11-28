import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import '@fontsource-variable/playfair-display';
import '@fontsource-variable/dm-sans';
import './globals.css';

const GTM_ID = 'GTM-WZGQPP3L';

export const metadata: Metadata = {
  title: 'Sound Healing: Myths and Facts | Free Live Webinar | Star Yog Studio',
  description:
    'Join the free live webinar on 3 December 2026, 11 AM – 12 PM IST. Learn what sound healing really is with ISH certified trainer Keertie G Sujnaniii.',
  openGraph: {
    title: 'Sound Healing: Myths and Facts – Free Live Webinar',
    description: '3 December 2026, 11 AM – 12 PM IST. Hosted by Star Yog Studio.',
    images: ['/images/hero-team.jpg'],
  },
};
export const viewport: Viewport = { themeColor: '#1c1238' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
      </head>
      <body>
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
