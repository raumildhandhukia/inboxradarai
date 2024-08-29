export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="px-32 py-14 mt-10 prose !min-w-full">{children}</div>;
}
