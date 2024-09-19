import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/utils/provider";
import ReduxProvider from "./ReduxProvider";
import MuiTheme from "./MuiTheme";
import { ToastContainer } from "react-toastify";
import Navbar from "./(app)/components/Navbar";

const inter = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "livestockDiary",
  description: "Your comprehensive livestock management solution",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "next14", "pwa", "next-pwa"],
  authors: [
    {
      name: "imvinojanv",
      url: "https://www.linkedin.com/in/imvinojanv/",
    },
  ],
  icons: [
    { rel: "apple-touch-icon", url: "icon512_rounded.png" },
    { rel: "icon", url: "icon512_rounded.png" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="!text-black">
      <Providers>
        <MuiTheme>
          <body className={`${inter.className} text-black`}>
            <div>
              <Navbar />
              {children}
            </div>
            <ToastContainer />
          </body>
        </MuiTheme>
        <ReduxProvider />
      </Providers>
    </html>
  );
}
