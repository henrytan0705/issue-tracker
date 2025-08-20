"use client";

import { Box, Button, Flex, TextField } from "@radix-ui/themes";
import axios from "axios";
import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const CommentInput = () => {
  const router = useRouter();
  const params = useParams();
  const issueId = Number(params.id);

  const [content, setContent] = useState("");

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      const payload = { content, issueId: issueId };
      await axios.post("/api/comments", payload);
      setContent("");
      toast.success("Comment submitted successfully");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Unable to submit comment.");
    }
  };

  return (
    <div>
      <Toaster />
      <Box className="mt-6">
        <form onSubmit={submitComment}>
          <TextField.Root
            placeholder="Add a comment..."
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
