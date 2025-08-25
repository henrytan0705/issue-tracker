"use client";

import React, { useState } from "react";
import { Avatar, Card, Flex, Text, Button } from "@radix-ui/themes";
import { formatDistanceToNow } from "date-fns";
import { CommentWithUser } from "./CommentsBox";
import DeleteCommentButton from "./DeleteCommentButton";
import CommentCard from "./CommentCard";
import EditableCommentCard from "./EditableCommentCard";

interface Props {
  comments?: CommentWithUser[];
}

const CommentList = ({ comments }: Props) => {
  const [editing, setEditing] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState("");

  return (
    <>
      <Flex direction="column" gap="4" className="mt-3">
        {comments?.map(({ id, content, createdAt, updatedAt, user, edited }) =>
          editing && id === editingCommentId ? (
            <EditableCommentCard
              id={id}
              content={content}
              setEditing={setEditing}
              setEditingCommentId={setEditingCommentId}
            />
          ) : (
            <CommentCard
              id={id}
              content={content}
              createdAt={createdAt}
              updatedAt={updatedAt}
              user={user}
              edited={edited}
              setEditing={setEditing}
              setEditingCommentId={setEditingCommentId}
            />
          )
        )}
      </Flex>
    </>
  );
};

export default CommentList;
