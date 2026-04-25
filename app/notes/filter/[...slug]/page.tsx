import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";

export default async function Notes() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", undefined],
    queryFn: () =>
      fetchNotes({ query: "", page: 1, perPage: 8, tag: undefined }),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient />
      </HydrationBoundary>
    </>
  );
}
