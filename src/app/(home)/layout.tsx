"use client";

import "../globals.css";
import { useEffect } from "react";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Load jQuery first
      const jqueryScript = document.createElement("script");
      jqueryScript.src = "/js/jquery-2.1.3.min.js";
      jqueryScript.onload = () => {
        console.log("jQuery loaded");

        // Load plugins.js after jQuery
        const pluginsScript = document.createElement("script");
        pluginsScript.src = "/js/plugins.js";
        pluginsScript.onload = () => {
          console.log("plugins.js loaded");

          // Load main.js after plugins.js
          const mainScript = document.createElement("script");
          mainScript.src = "/js/main.js";
          mainScript.onload = () => {
            console.log("main.js loaded");
          };
          document.body.appendChild(mainScript);
        };
        document.body.appendChild(pluginsScript);
      };

      document.body.appendChild(jqueryScript);
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />

        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        <link rel="icon" href="favicon.ico" type="image/x-icon" />
        <Script src="/js/modernizr.js" strategy="lazyOnload" />
        <Script src="/js/pace.min.js" strategy="lazyOnload" />
        <Script
          src="https://maps.googleapis.com/maps/api/js?v=3.13&sensor=false"
          strategy="beforeInteractive"
          onLoad={() => {
            console.log("Google Maps API loaded");
          }}
          async
          defer
        />
      </head>
      <body id="top">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
