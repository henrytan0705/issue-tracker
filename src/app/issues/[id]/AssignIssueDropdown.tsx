"use client";

import { Issue, User } from "@prisma/client";
import { AvatarIcon } from "@radix-ui/react-icons";
import { Flex, Select } from "@radix-ui/themes";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/app/components";
import toast, { Toaster } from "react-hot-toast";

const AssignIssueDropdown = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  const assignIssue = async (userId: string) => {
    try {
      await axios.patch("/api/issues/" + issue.id, {
        assignedToUserId: userId === "null" ? null : userId,
      });
      toast.success("Issue assigned successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Unable to assign task.");
    }
  };

  if (isLoading) return <Skeleton />;

  if (error) return null;

  return (
    <>
      <Toaster />
      <Select.Root
        defaultValue={issue?.assignedToUserId || "null"}
        onValueChange={(userId) => assignIssue(userId)}
      >
        <Select.Trigger placeholder="Assign Issue" />

        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="null">
              <Flex align="center" gap="2">
                <AvatarIcon />
                Unassigned
              </Flex>
            </Select.Item>
            {users?.map(({ id, name }) => (
              <Select.Item key={id} value={id}>
                <Flex align="center" gap="2">
                  <AvatarIcon />
                  {name}
                </Flex>
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
};

export default AssignIssueDropdown;
