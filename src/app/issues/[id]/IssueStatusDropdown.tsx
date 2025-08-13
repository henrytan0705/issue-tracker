"use client";

import React from "react";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Issue } from "@prisma/client";
import { useRouter } from "next/navigation";

const statuses: {
  label: string;
  color: "green" | "red" | "orange";
  value: "OPEN" | "CLOSED" | "IN_PROGRESS";
}[] = [
  { label: "Open", color: "green", value: "OPEN" },
  { label: "Closed", color: "red", value: "CLOSED" },
  { label: "In Progress", color: "orange", value: "IN_PROGRESS" },
];

const colorMap: Record<string, string> = {
  green: "text-green-800 bg-green-200",
  red: "text-red-800 bg-red-200",
  orange: "text-orange-800 bg-orange-200",
};

const colorToHex: Record<string, { text: string; bg: string }> = {
  green: { text: "#166534", bg: "#bbf7d0" }, // text: green-800, bg: green-200
  red: { text: "#991b1b", bg: "#fecaca" }, // text: red-800, bg: red-200
  orange: { text: "#9a3412", bg: "#fed7aa" }, // text: orange-800, bg: orange-200
};

const IssueStatusDropdown = ({ issue }: { issue: Issue }) => {
  const router = useRouter();

  const updateIssue = async (status: string) => {
    try {
      await axios.patch("/api/issues/" + issue.id, {
        status,
      });
      toast.success("Issue status updated successfully");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Unable to update status.");
    }
  };

  const currentColor = statuses.find((s) => s.value === issue.status)?.color;

  return (
    <>
      <Toaster />
      <Select.Root
        defaultValue={issue?.status}
        onValueChange={(status) => {
          updateIssue(status);
        }}
      >
        <Select.Trigger
          style={{
            backgroundColor: colorToHex[currentColor || "green"].bg,
            color: colorToHex[currentColor || "green"].text,
          }}
        />

        <Select.Content>
          {statuses.map(({ label, color, value }) => (
            <Select.Item
              key={value}
              value={value}
              className={`${colorMap[color]} font-medium`}
            >
              {label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </>
  );
};

export default IssueStatusDropdown;
