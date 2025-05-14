import { Outfit } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "../configs/QueryProvider";
import { Toaster } from "./components/@/ui/toaster";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Donna Grana",
  description: "Administre suas finanças",
  icons: {
    icon: "/icon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <QueryProvider>
          {children}
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
