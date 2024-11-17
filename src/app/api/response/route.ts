import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Define the path to the JSON data file
const dataFilePath = path.join(
  process.cwd(),
  "src",
  "app",
  "api",
  "response",
  "data.json"
);

// Utility function to read the JSON file
const readDataFile = () => {
  const fileContents = fs.readFileSync(dataFilePath, "utf-8");
  return JSON.parse(fileContents);
};

// Utility function to write to the JSON file
const writeDataFile = (data: any) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf-8");
};

// GET handler: Fetch paginated data from the JSON file
export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  // Default page size is 7
  const pageSize = parseInt(url.searchParams.get("page_size") || "7", 10);

  const data = readDataFile();
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedData = data.slice(start, end);

  return NextResponse.json({
    data: paginatedData,
    totalItems: data.length,
    totalPages: Math.ceil(data.length / pageSize),
    currentPage: page,
  });
}

// POST handler: Add new data to the JSON file
export async function POST(request: Request) {
  const newData = await request.json();
  const existingData = readDataFile();

  // Add the new post data to the existing data
  existingData.push(newData);

  // Write the updated data back to the JSON file
  writeDataFile(existingData);

  return NextResponse.json({ success: true, data: newData });
}

export type ResponseDataItem = {
  no: number;
  name: string;
  email: string;
  website: string;
  message: string;
};

export type ResponseSectionProps = {
  data: ResponseDataItem[];
  currentPage: number;
  totalPages: number;
};
