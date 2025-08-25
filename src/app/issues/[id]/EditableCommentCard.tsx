"use client";

import { Box, Button, Card, Flex, TextField } from "@radix-ui/themes";
import axios from "axios";
import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

interface Props {
  id: string;
  content: string;
  setEditing: (val: boolean) => void;
  setEditingCommentId: (val: string) => void;
}

const EditableCommentCard = ({
  id,
  content,
  setEditing,
  setEditingCommentId,
}: Props) => {
  const queryClient = useQueryClient();
  const params = useParams();
  const [newContent, setNewContent] = useState(content);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitNewComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    try {
      setIsSubmitting(true);
      const payload = { content: newContent };
      await axios.patch(`/api/comments/${id}`, payload);
      toast.success("Comment updated successfully");
      queryClient.invalidateQueries({ queryKey: ["comments", params.id] });

      setEditing(false);
      setEditingCommentId("");
    } catch (error) {
      console.error(error);
      toast.error("Unable to submit comment edit.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancelEdit = () => {
    setEditing(false);
    setEditingCommentId("");
  };

  return (
    <Card>
      <Box className="mt-6">
        <form onSubmit={submitNewComment}>
          <TextField.Root
            placeholder="Add a comment..."
            className="w-full rounded-xl px-3 py-2"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
          <Flex justify="end" className="mt-2" gap="2">
            <Button
              type="submit"
              size="2"
              disabled={!content.length || isSubmitting}
            >
              Save
            </Button>
            <Button
              type="button"
              variant="soft"
              color="gray"
              size="2"
              onClick={cancelEdit}
            >
              Cancel
            </Button>
          </Flex>
        </form>
      </Box>
    </Card>
  );
};

export default EditableCommentCard;
