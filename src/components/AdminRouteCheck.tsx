'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface AdminRouteCheckProps {
  children: React.ReactNode;
}

export default function AdminRouteCheck({ children }: AdminRouteCheckProps) {
  const pathname = usePathname();
  const [isAdminRoute, setIsAdminRoute] = useState(false);

  useEffect(() => {
    setIsAdminRoute(pathname.startsWith('/admin'));
  }, [pathname]);

  if (isAdminRoute) {
    return null;
  }

  return <>{children}</>;
} 