"use client";

import MasonrySection from "@/components/MasonrySection";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <title>Home</title>
      <Suspense
        fallback={<h1 style={{ fontSize: "200px !important" }}>Loading...</h1>}
      >
        <MasonrySection />
      </Suspense>
    </>
  );
}
