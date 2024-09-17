"use client";
import "./globals.css";
import Navbar from "./_Components/Navbar/Navbar";
import Footer from "./_Components/Footer/Footer";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Provider } from "react-redux";
import { store } from "@/lib/store";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <Provider store={store}>
          <AppRouterCacheProvider>
              <Navbar />
              <div style={{ minHeight: "100vh", marginTop: "80px" }}>
                {children}
              </div>

              <Footer />
          </AppRouterCacheProvider>
        </Provider>
      </body>
    </html>
  );
}
