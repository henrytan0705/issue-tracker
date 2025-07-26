import React from "react";
import { Badge, Flex } from "@radix-ui/themes";
import { Status } from "@/generated/prisma";

interface Props {
  status: Status;
}

const statusMap: Record<
  Status,
  { label: string; color: "green" | "red" | "orange" }
> = {
  OPEN: { label: "Open", color: "green" },
  CLOSED: { label: "Closed", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "orange" },
};

const StatusBadge = ({ status }: Props) => {
  return (
    <div>
      <Flex gap="2">
        <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
      </Flex>
    </div>
  );
};

export default StatusBadge;
