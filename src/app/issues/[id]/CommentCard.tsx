"use client";

import { User } from "@prisma/client";
import { Avatar, Button, Card, Flex, Text } from "@radix-ui/themes";
import React from "react";
import { formatDistanceToNow } from "date-fns";
import DeleteCommentButton from "./DeleteCommentButton";
import { useSession } from "next-auth/react";

interface Props {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  edited: boolean;
  setEditing: (val: boolean) => void;
  setEditingCommentId: (val: string) => void;
}

const CommentCard = ({
  id,
  content,
  createdAt,
  updatedAt,
  user,
  edited,
  setEditing,
  setEditingCommentId,
}: Props) => {
  const { data: session } = useSession();

  const enableEditing = () => {
    setEditing(true);
    setEditingCommentId(id);
  };

  return (
    <Card key={id} className="p-4 rounded-2xl shadow-sm">
      <Flex align="center" gap="3">
        <Avatar src={user.image!} fallback={"?"} size="2" radius="full" />

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

      {session && session?.user?.email === user?.email && (
        <Flex gap="3" className="mt-2 ml-10">
          <Button variant="ghost" size="1" onClick={enableEditing}>
            Edit
          </Button>

          <DeleteCommentButton commentId={id} />
        </Flex>
      )}
    </Card>
  );
};

export default CommentCard;
