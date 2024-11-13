"use client";

import MasonrySection from "../components/MasonrySection";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 7; // Set your page size here

  useEffect(() => {
    // Fetch data based on current page
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:3000/api/post?page=${currentPage}&page_size=${pageSize}`,
        { cache: "no-store" }
      );
      const result = await response.json();
      setData(result.data);
      setTotalPages(result.totalPages);
    };

    fetchData();
  }, [currentPage]);

  return (
    <MasonrySection
      data={data}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );
}
