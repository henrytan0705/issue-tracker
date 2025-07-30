import { prisma } from "@/lib/prisma";
import { Link, StatusBadge } from "@/app/components";
import { Table } from "@radix-ui/themes";
import delay from "delay";
import IssueAction from "./IssueAction";

const IssuePage = async () => {
  const issues = await prisma.issue.findMany();
  await delay(1000);

  if (!issues) return;

  return (
    <div>
      <IssueAction />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
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
