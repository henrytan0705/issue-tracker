import React from "react";
import NextLink from "next/link";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Link, StatusBadge } from "@/app/components";
import { Avatar, Table } from "@radix-ui/themes";
import { Issue, User } from "@prisma/client";

export interface IssueQuery {
  status?: string;
  orderBy: keyof Issue;
  page: string;
  order: string;
}

interface IssueWithUser extends Issue {
  assignedToUser: User | null;
}

interface Props {
  issues: IssueWithUser[];
  searchParams: IssueQuery;
}

const IssueTable = ({ issues, searchParams }: Props) => {
  return (
    <div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map(({ label, value, className }) => (
              <Table.ColumnHeaderCell key={value} className={className}>
                <NextLink
                  href={{
                    query: {
                      ...searchParams,
                      orderBy: value,
                      order:
                        searchParams.order && searchParams.order === "asc"
                          ? "desc"
                          : "asc",
                    },
                  }}
                >
                  {label}
                </NextLink>

                {value === searchParams.orderBy &&
                  searchParams.order === "asc" && (
                    <ArrowUpIcon className="inline" />
                  )}

                {value === searchParams.orderBy &&
                  searchParams.order === "desc" && (
                    <ArrowDownIcon className="inline" />
                  )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map(({ id, title, status, createdAt, assignedToUser }) => (
            <Table.Row key={id} className="h-14">
              <Table.RowHeaderCell>
                <div className="flex flex-col md:flex-row md:items-center gap-2 h-full">
                  <Link href={`issues/${id}`}>{title}</Link>
                  <div className="flex md:hidden items-center gap-2">
                    <StatusBadge status={status}></StatusBadge>
                    {assignedToUser ? (
                      <Avatar
                        src={assignedToUser.image!}
                        fallback="?"
                        size="2"
                        radius="full"
                      />
                    ) : null}
                  </div>
                </div>
              </Table.RowHeaderCell>
              <Table.Cell className="hidden md:table-cell">
                <div className="flex items-center h-full">
                  <StatusBadge status={status}></StatusBadge>
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <div className="flex items-center h-full">
                  {createdAt.toDateString()}
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <div className="flex items-center h-full">
                  {assignedToUser ? (
                    <Avatar
                      src={assignedToUser.image!}
                      fallback="?"
                      size="2"
                      radius="full"
                    />
                  ) : null}
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  {
    label: "Assignee",
    value: "assignedToUserId",
    className: "hidden md:table-cell",
  },
];

export const columnNames = columns.map((col) => col.value);

export default IssueTable;
