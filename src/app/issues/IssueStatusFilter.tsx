"use client";

import { Select } from "@radix-ui/themes";
import { Status } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get("status") ?? "ALL";

  const statuses: { label: string; value: Status | "ALL" }[] = [
    { label: "All", value: "ALL" },
    { label: "Open", value: "OPEN" },
    { label: "Closed", value: "CLOSED" },
    { label: "In Progress", value: "IN_PROGRESS" },
  ];

  const filterIssues = (status: string) => {
    const params = new URLSearchParams();

    if (status) params.append("status", status);

    const orderBy = searchParams.get("orderBy");
    if (orderBy) params.append("orderBy", orderBy);

    const query = params.size ? "?" + params.toString() : "";
    router.push("/issues/" + query);
  };

  return (
    <Select.Root
      onValueChange={(status) => filterIssues(status)}
      value={currentStatus}
    >
      <Select.Trigger placeholder="Filter by status.." />
      <Select.Content>
        {statuses.map(({ label, value }) => (
          <Select.Item key={label} value={value}>
            {label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
