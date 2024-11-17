"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useSearchParams } from "next/navigation";
import "../../../globals.css";

async function fetchResponseData(page = 1, pageSize = 7) {
  const res = await fetch(`/api/response?page=${page}&page_size=${pageSize}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default function ResponsePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [response, setResponse] = useState<any>(null);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchResponseData(page, 7);
      setResponse(data);
    };
    fetchData();
  }, [page]);

  // Log Out Handler
  const handleLogout = () => {
    setIsLoading(true);
    // Clear the isAdmin cookie
    document.cookie = "isAdmin=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    // Redirect to /
    router.replace("/");
  };

  if (!response) {
    return <p>Loading...</p>;
  }

  return (
    <section id="bricks">
      <title>Contact Response</title>
      {/* Log Out Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "10px",
        }}
      >
        <button
          onClick={handleLogout}
          className="logout-button"
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Log Out"
          )}
        </button>
      </div>

      <div className="row masonry">
        <div className="bricks-wrapper">
          <div className="grid-sizer"></div>

          {/* Response Table */}
          <div className="response-table-wrapper">
            <table className="response-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Website</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {response.data.map((item: any) => (
                  <tr key={item.no}>
                    <td>{item.no}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.website}</td>
                    <td>{item.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="row">
        <nav className="pagination">
          {response.currentPage > 1 ? (
            <Link
              href={`/admin/response?page=${response.currentPage - 1}`}
              className="page-numbers prev"
            >
              Prev
            </Link>
          ) : (
            <span className="page-numbers prev inactive">Prev</span>
          )}

          {Array.from({ length: response.totalPages }, (_, i) => (
            <Link
              key={i + 1}
              href={`/admin/response?page=${i + 1}`}
              className={`page-numbers ${
                response.currentPage === i + 1 ? "current" : ""
              }`}
            >
              {i + 1}
            </Link>
          ))}

          {response.currentPage < response.totalPages ? (
            <Link
              href={`/admin/response?page=${response.currentPage + 1}`}
              className="page-numbers next"
            >
              Next
            </Link>
          ) : (
            <span className="page-numbers next inactive">Next</span>
          )}
        </nav>
      </div>
    </section>
  );
}
