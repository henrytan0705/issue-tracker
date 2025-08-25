"use client";

import { Flex } from "@radix-ui/themes";
import { useState } from "react";
import CommentCard from "./CommentCard";
import { CommentWithUser } from "./CommentsBox";
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
              key={id}
              id={id}
              content={content}
              setEditing={setEditing}
              setEditingCommentId={setEditingCommentId}
            />
          ) : (
            <CommentCard
              key={id}
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
