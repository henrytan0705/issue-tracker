import { Avatar, Card, Flex, Text, Button } from "@radix-ui/themes";
import React from "react";
import { Comment, User } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";

interface CommentWithUser extends Comment {
  user: User;
}

interface Props {
  comments?: CommentWithUser[];
}

const CommentList = ({ comments }: Props) => {
  return (
    <>
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
    </>
  );
};

export default CommentList;
