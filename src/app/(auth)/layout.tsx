import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-screen grid-cols-1 bg-background lg:grid-cols-2">
      <div className="h-full lg:flex flex-col items-center justify-center border-r border-border p-8 hidden">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold">Just Do It</h1>
          <p className="text-muted-foreground">
            Join millions of athletes and fitness enthusiasts who trust Nike for
            their performance needs.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center p-8">{children}</div>
    </div>
  );
}
