import localFont from "next/font/local";
import "./globals.css";
import { Inter } from 'next/font/google';
import Navbar from "./components/navbar/page";
import { ThemeProvider } from "./providers/ThemeProvider";
const inter = Inter({ subsets: ['latin'] });
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "OmkarJ's Blog",
  description: "Personal Blog Site",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <ThemeProvider>
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </ThemeProvider>
    </body>
  </html>
  );
}
