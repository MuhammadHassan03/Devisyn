import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.className} min-h-screen bg-[#0A0A0A] text-white`}>
      {children}
      <Toaster position="top-right" />
    </div>
  );
} 