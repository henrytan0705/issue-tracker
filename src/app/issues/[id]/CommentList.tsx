"use client";

import React from "react";
import { Avatar, Card, Flex, Text, Button } from "@radix-ui/themes";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";
import { CommentWithUser } from "./CommentsBox";
import { useQueryClient } from "@tanstack/react-query";
import DeleteCommentButton from "./DeleteCommentButton";

interface Props {
  comments?: CommentWithUser[];
  issueId: string;
}

const CommentList = ({ comments, issueId }: Props) => {
  const queryClient = useQueryClient();

  const deleteComment = async (id: string) => {
    try {
      await axios.delete(`/api/comments/${id}`);
      queryClient.invalidateQueries({ queryKey: ["comments", issueId] });
    } catch (error) {
      console.error(error);
    }
  };

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

                <DeleteCommentButton commentId={id} />
              </Flex>
            </Card>
          )
        )}
      </Flex>
    </>
  );
};

export default CommentList;
