import React from "react";
import NextLink from "next/link";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Link, StatusBadge } from "@/app/components";
import { Table } from "@radix-ui/themes";
import { Issue } from "@prisma/client";

export interface IssueQuery {
  status?: string;
  orderBy: keyof Issue;
  page: string;
  order: string;
}

interface Props {
  issues: Issue[];
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
          {issues.map(({ id, title, status, createdAt }) => (
            <Table.Row key={id}>
              <Table.RowHeaderCell>
                <Link href={`issues/${id}`}>{title}</Link>
                <div className="block md:hidden">
                  <StatusBadge status={status}></StatusBadge>
                </div>
              </Table.RowHeaderCell>
              <Table.Cell className="hidden md:table-cell">
                <StatusBadge status={status}></StatusBadge>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {createdAt.toDateString()}
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
];

export const columnNames = columns.map((col) => col.value);

export default IssueTable;
