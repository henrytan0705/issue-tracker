import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
  total: number;
}

const IssueSummary = ({ open, inProgress, closed, total }: Props) => {
  const containers: {
    label: string;
    value: number;
    status: Status;
    color: "green" | "orange" | "red";
  }[] = [
    {
      label: "Open Issues",
      value: open,
      status: "OPEN",
      color: "green",
    },
    {
      label: "In progress Issues",
      value: inProgress,
      status: "IN_PROGRESS",
      color: "orange",
    },
    {
      label: "Closed Issues",
      value: closed,
      status: "CLOSED",
      color: "red",
    },
  ];

  return (
    <Flex gap="5">
      <Card>
        <Flex direction="column" gap="1">
          <Link href={`/issues`} className="text-sm font-medium">
            Total Issues
          </Link>
          <Text size="5" className="font-bold">
            {total}
          </Text>
        </Flex>
      </Card>

      {containers.map(({ label, value, status, color }) => (
        <Card key={label}>
          <Flex direction="column" gap="1">
            <Link
              href={`/issues?status=${status}`}
              className="text-sm font-medium"
            >
              {label}
            </Link>
            <Text size="5" className="font-bold" color={color}>
              {value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
