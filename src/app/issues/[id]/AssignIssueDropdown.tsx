"use client";

import { User } from "@prisma/client";
import { AvatarIcon } from "@radix-ui/react-icons";
import { Flex, Select } from "@radix-ui/themes";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/app/components";

const AssignIssueDropdown = ({ issueId }: { issueId: string }) => {
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

  if (isLoading) return <Skeleton />;

  if (error) return null;

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign Issue" />

      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>

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
  );
};

export default AssignIssueDropdown;
