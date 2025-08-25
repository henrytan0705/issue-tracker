"use client";

import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import React, { useState } from "react";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { Spinner } from "@/app/components";
import { useParams } from "next/navigation";

const DeleteCommentButton = ({ commentId }: { commentId: string }) => {
  const queryClient = useQueryClient();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const deleteComment = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/comments/${commentId}`);
      queryClient.invalidateQueries({ queryKey: ["comments", params.id] });
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button variant="ghost" size="1" color="red">
            Delete
          </Button>
        </AlertDialog.Trigger>

        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Delete Comment</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure? This comment will no longer be accessible.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Action>
              <Button
                type="button"
                variant="solid"
                color="red"
                onClick={deleteComment}
              >
                Delete
              </Button>
            </AlertDialog.Action>
            <AlertDialog.Cancel>
              <Button type="button" variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title> Error</AlertDialog.Title>
          <AlertDialog.Description>
            There was an error with deleting this comment.
          </AlertDialog.Description>
          <AlertDialog.Cancel>
            <Button
              variant="soft"
              color="gray"
              mt="2"
              onClick={() => setError(false)}
            >
              Close
            </Button>
          </AlertDialog.Cancel>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteCommentButton;
