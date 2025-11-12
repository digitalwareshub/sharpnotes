import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SHRP Notes – Transform Your Notes',
  description: 'Transform messy notes into sharp, structured documents with NLP-powered note transformation. 100% private and local.',
};

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
