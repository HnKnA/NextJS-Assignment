import MasonrySection, {
  MasonrySectionProps,
} from "../components/MasonrySection";

export default async function Home() {
  const response = await fetch("http://localhost:3000/api/post", {
    cache: "no-store",
  });
  const data: MasonrySectionProps["data"] = await response.json();

  return (
    <>
      <MasonrySection data={data} />
    </>
  );
}
