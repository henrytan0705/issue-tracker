"use client";

import { Box, Button, Flex, TextField } from "@radix-ui/themes";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

interface Props {
  issueId: string;
}

const CommentInput = ({ issueId }: Props) => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const [content, setContent] = useState("");

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      const payload = { content, issueId: Number(issueId) };
      await axios.post("/api/comments", payload);
      setContent("");
      toast.success("Comment submitted successfully");
      queryClient.invalidateQueries({ queryKey: ["comments", issueId] });
    } catch (error) {
      let errorDisplayMessage = "Unable to submit comment";

      if (axios.isAxiosError(error) && error?.response?.status === 401) {
        errorDisplayMessage = "Please login to post comments.";
      }

      toast.error(errorDisplayMessage);
    }
  };

  return (
    <div>
      <Box className="mt-6">
        <form onSubmit={submitComment}>
          <TextField.Root
            placeholder={
              session ? "Add a comment..." : "Log in to post a comment"
            }
            className="w-full rounded-xl px-3 py-2"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Flex justify="end" className="mt-2">
            <Button type="submit" size="2" disabled={!content.length}>
              Post
            </Button>
          </Flex>
        </form>
      </Box>
    </div>
  );
};

export default CommentInput;
