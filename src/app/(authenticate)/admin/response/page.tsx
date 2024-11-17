"use client";

import { Suspense } from "react";
import ResponsePageContent from "@/components/ResponsePageContent";

export default function Page() {
  return (
    <>
      <title>Contact Response</title>
      <Suspense
        fallback={<h1 style={{ fontSize: "200px !important" }}>Loading...</h1>}
      >
        <ResponsePageContent />
      </Suspense>
    </>
  );
}
