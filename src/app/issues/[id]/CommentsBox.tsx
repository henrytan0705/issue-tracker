import { prisma } from "@/lib/prisma";
import { Avatar, Box, Button, Card, Flex, Text } from "@radix-ui/themes";
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";

interface Props {
  issueId: string;
}

const CommentsBox = async ({ issueId }: Props) => {
  const session = await getServerSession(authOptions);

  let comments;

  try {
    comments = await prisma.comment.findMany({
      where: { issueId: Number(issueId) },
      include: { user: true },
    });
  } catch (error) {
    console.error(error);
  }

  return (
    <Flex direction="column" className="mt-3 w-full max-w-2xl">
      {comments && comments.length > 0 && (
        <Text weight="bold" className="text-lg">
          Comments:
        </Text>
      )}

      <CommentList comments={comments} />

      {session && <CommentInput />}
    </Flex>
  );
};

export default CommentsBox;
