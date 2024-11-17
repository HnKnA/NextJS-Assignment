"use client";

import MasonrySection from "@/components/MasonrySection";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 7; // Set your page size here

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/post?page=${currentPage}&page_size=${pageSize}`,
          { cache: "no-store" }
        );
        const result = await response.json();
        setData(result.data);
        setTotalPages(result.totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  return (
    <>
      <title>Home</title>
      {loading ? (
        <div className="loading-screen">
          <h1 style={{ fontSize: "200px !important" }}>Loading...</h1>
        </div>
      ) : (
        <MasonrySection
          data={data}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
    </>
  );
}
