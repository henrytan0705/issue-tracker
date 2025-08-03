import Pagination from "@/app/components/Pagination";

interface Props {
  searchParams: { page: string };
}

export default function Home({ searchParams }: Props) {
  return (
    <>
      <h1>Home Page</h1>
      <Pagination
        itemCount={100}
        pageSize={10}
        currentPage={Number(searchParams.page) || 1}
      />
    </>
  );
}
