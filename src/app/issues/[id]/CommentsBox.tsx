"use client";

import { Flex, Text } from "@radix-ui/themes";
import React from "react";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "@prisma/client";
import { Comment } from "@prisma/client";
import { useSession } from "next-auth/react";
interface Props {
  issueId: string;
}

export interface CommentWithUser extends Comment {
  user: User;
}

const CommentsBox = ({ issueId }: Props) => {
  const { data: session } = useSession();

  const { data: comments, isLoading, error } = useComments(issueId);

  if (isLoading) return <Text>Loading comments...</Text>;
  if (error) return <Text>Error loading comments.</Text>;

  return (
    <Flex direction="column" className="mt-3 w-full max-w-2xl">
      {comments && comments.length > 0 && (
        <Text weight="bold" className="text-lg">
          Comments:
        </Text>
      )}

      <CommentList comments={comments} issueId={issueId} />

      {session && <CommentInput issueId={issueId} />}
    </Flex>
  );
};

const useComments = (issueId: string) =>
  useQuery<CommentWithUser[], Error>({
    queryKey: ["comments", issueId],
    queryFn: () =>
      axios.get(`/api/comments/${issueId}`).then((res) => res.data),
    initialData: [],
  });

export default CommentsBox;
