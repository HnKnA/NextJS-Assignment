"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Category from "@/components/Category";

async function fetchCategoryData(currentPage: number, pageSize: number) {
  const response = await fetch(
    `/api/post?page=${currentPage}&page_size=${pageSize}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

function CategoryContent({
  currentPage,
  pageSize,
}: {
  currentPage: number;
  pageSize: number;
}) {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const result = await fetchCategoryData(currentPage, pageSize);
        setData(result.data);
        setTotalPages(result.totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [currentPage, pageSize]);

  if (loading) {
    return (
      <div className="loading-screen">
        <h1 style={{ fontSize: "200px !important" }}>Loading...</h1>
      </div>
    );
  }

  return (
    <Category data={data} currentPage={currentPage} totalPages={totalPages} />
  );
}

export default function Home() {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 7; // Set your page size here

  return (
    <Suspense
      fallback={
        <div className="loading-screen">
          <h1 style={{ fontSize: "200px !important" }}>Loading...</h1>
        </div>
      }
    >
      <title>Category</title>
      <CategoryContent currentPage={currentPage} pageSize={pageSize} />
    </Suspense>
  );
}
