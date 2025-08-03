import { prisma } from "@/lib/prisma";
import { Link, StatusBadge } from "@/app/components";
import { Table } from "@radix-ui/themes";
import delay from "delay";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import NextLink from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";

interface Props {
  searchParams: Promise<{ status?: string; orderBy: keyof Issue }>;
}

const IssuePage = async ({ searchParams }: Props) => {
  const searchParamsAwaited = await searchParams;
  const { status: filterStatus, orderBy } = searchParamsAwaited;

  const statuses = Object.values(Status);
  const status = statuses.includes(filterStatus as Status)
    ? (filterStatus as Status)
    : undefined;

  const issues = await prisma.issue.findMany({
    where: { status },
    ...(orderBy && { orderBy: { [orderBy]: "asc" } }),
  });

  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

  await delay(1000);

  if (!issues) return;

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map(({ label, value, className }) => (
              <Table.ColumnHeaderCell key={value} className={className}>
                <NextLink
                  href={{ query: { ...searchParamsAwaited, orderBy: value } }}
                >
                  {label}
                </NextLink>
                {value === searchParamsAwaited.orderBy && (
                  <ArrowUpIcon className="inline" />
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

export const dynamic = "force-dynamic";
export default IssuePage;
