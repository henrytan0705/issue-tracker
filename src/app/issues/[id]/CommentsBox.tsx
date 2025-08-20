import { prisma } from "@/lib/prisma";
import { Avatar, Box, Button, Card, Flex, Text } from "@radix-ui/themes";
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import CommentInput from "./CommentInput";

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

      <Flex direction="column" gap="4" className="mt-3">
        {comments?.map(
          ({ id, content, createdAt, updatedAt, user, edited }) => (
            <Card key={id} className="p-4 rounded-2xl shadow-sm">
              <Flex align="center" gap="3">
                <Avatar
                  src={user.image!}
                  fallback={"?"}
                  size="2"
                  radius="full"
                />

                <Flex direction="column" className="flex-1">
                  <Flex gap="2" align="center">
                    <Text weight="medium">{user.name ?? "Anonymous"}</Text>
                    <Text size="1" color="gray">
                      {edited
                        ? `edited ${formatDistanceToNow(new Date(updatedAt), {
                            addSuffix: true,
                          })}`
                        : formatDistanceToNow(new Date(createdAt), {
                            addSuffix: true,
                          })}
                    </Text>
                  </Flex>
                  <Text className="mt-1 text-gray-800">{content}</Text>
                </Flex>
              </Flex>

              <Flex gap="3" className="mt-2 ml-10">
                <Button variant="ghost" size="1" disabled>
                  Edit
                </Button>
                <Button variant="ghost" size="1" color="red" disabled>
                  Delete
                </Button>
              </Flex>
            </Card>
          )
        )}
      </Flex>

      {session && <CommentInput />}
    </Flex>
  );
};

export default CommentsBox;
