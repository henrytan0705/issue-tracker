"use client";

import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { Spinner } from "@/app/components";
import { useState } from "react";
import { useRouter } from "next/navigation";

const DeleteIssueButton = ({ issueId }: { issueId: string }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const deleteIssue = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/issues/${issueId}`);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setIsLoading(false);
      setError(true);
      console.error(error);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" disabled={isLoading}>
            <TrashIcon />
            Delete Issue
            {isLoading && <Spinner />}
          </Button>
        </AlertDialog.Trigger>

        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Delete Issue</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure? This issue will no longer be accessible.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Action>
              <Button
                type="button"
                variant="solid"
                color="red"
                onClick={deleteIssue}
              >
                Delete Issue
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
            There was an error with deleting this issue.
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

export default DeleteIssueButton;
