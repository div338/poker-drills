// app/layout.tsx

import '../styles/globals.css';

export const metadata = {
  title: 'Poker Drills',
  description: 'Interactive Poker Drill App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
