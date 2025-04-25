import type { Metadata } from "next";
import "./globals.css";

import { seoConfig } from "@/config";
import { Toaster } from "@/components/ui/sonner";
import ReactQueryProvider from "@/providers/react-query-provider";

// Removed Google Fonts imports due to network connectivity issues
// const montserrat = Montserrat({
//   variable: "--font-montserrat",
//   subsets: ["latin"],
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
// });
//
// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: seoConfig.defaultTitle,
  description: seoConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // Using system fonts as fallback
        className="font-sans antialiased"
      >
        <ReactQueryProvider>
          {children}
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
