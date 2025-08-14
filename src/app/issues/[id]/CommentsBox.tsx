import { prisma } from "@/lib/prisma";
import { Card, Flex, Text, TextField } from "@radix-ui/themes";
import React from "react";

interface Props {
  issueId: string;
}

const CommentsBox = async ({ issueId }: Props) => {
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
    <Flex direction="column">
      <Text>Comments:</Text>

      {comments?.map(({ id, content, createdAt, updatedAt, user, edited }) => (
        <Card key={id}>
          <Flex direction="column">
            <Text>{content}</Text>
            <Text>By: {user.name}</Text>
            <Text>
              {edited
                ? updatedAt.toDateString() +
                  " " +
                  updatedAt.toLocaleTimeString()
                : createdAt.toDateString() +
                  " " +
                  createdAt.toLocaleTimeString()}
            </Text>
            <Text>{edited ? "Edited" : null}</Text>
          </Flex>
        </Card>
      ))}

      <TextField.Root></TextField.Root>
    </Flex>
  );
};

export default CommentsBox;
