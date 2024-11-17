"use client";

import Category from "@/components/Category";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 7; // Set your page size here

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `/api/post?page=${currentPage}&page_size=${pageSize}`,
        { cache: "no-store" }
      );
      const result = await response.json();
      setData(result.data);
      setTotalPages(result.totalPages);
    };

    fetchData();
  }, [currentPage]);

  return (
    <>
      <title>Category</title>
      <Category data={data} currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
