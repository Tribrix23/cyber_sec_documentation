'use client';

import '@/lib/lang';

export default function I18nProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}