import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/utils/provider";
import ReduxProvider from "./ReduxProvider";
import MuiTheme from "./MuiTheme";
import { ToastContainer } from "react-toastify";
import Navbar from "./(app)/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "livestockDiary",
  description: "Your comprehensive livestock solution",
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
          </body>
        </MuiTheme>
        <ReduxProvider />
        <ToastContainer />
      </Providers>
    </html>
  );
}
