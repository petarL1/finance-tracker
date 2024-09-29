// src/app/layout.tsx
import ClientLayout from './client-layout'; // Adjust the path if necessary

export const metadata = {
  title: 'Finance Tracker',
  description: 'Track all of your funds with this app!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link rel="icon" href="data:,"></link>
        <link rel="shortcut icon" href="#"></link>
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
