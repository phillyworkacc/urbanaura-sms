import "@/styles/globals.css"
import { InterFont } from "@/fonts/fonts";
import { Toaster } from "sonner";
import { ModalProvider } from "@/components/Modal/ModalContext";
import { Metadata } from "next";
import SessionWrapper from "@/components/SessionWrapper/SessionWrapper";

export const metadata: Metadata = {
  title: "UrbanAura SMS Marketing",
  description: "An app to manage Urbanaura's SMS Marketing"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <ModalProvider>
        <html lang="en">
          <head>
            <link rel="manifest" href="/manifest.json" />
            <link rel="apple-touch-icon" href="/favicon.ico" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />
          </head>
          <body className={InterFont.className}>
            <Toaster richColors position="top-center" />
            {children}
          </body>
        </html>
      </ModalProvider>
    </SessionWrapper>
  );
}
