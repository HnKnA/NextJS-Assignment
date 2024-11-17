"use client";

import { Suspense } from "react";
import Category from "@/components/Category";

export default function Home() {
  return (
    <>
      <title>Category</title>
      <Suspense
        fallback={<h1 style={{ fontSize: "200px !important" }}>Loading...</h1>}
      >
        <Category />
      </Suspense>
    </>
  );
}
