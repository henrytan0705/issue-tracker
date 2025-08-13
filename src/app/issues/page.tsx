import { prisma } from "@/lib/prisma";
import delay from "delay";
import IssueActions from "./IssueActions";
import { Status } from "@prisma/client";
import Pagination from "../components/Pagination";
import IssueTable, { IssueQuery } from "./IssueTable";
import { columnNames } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
interface Props {
  searchParams: Promise<IssueQuery>;
}

const IssuePage = async ({ searchParams }: Props) => {
  const searchParamsAwaited = await searchParams;
  const {
    status: paramsFilterStatus,
    orderBy: paramsOrderBy,
    page: currentPage,
    order,
  } = searchParamsAwaited;

  const statuses = Object.values(Status);
  const status = statuses.includes(paramsFilterStatus as Status)
    ? (paramsFilterStatus as Status)
    : undefined;

  // store where filter into one object for reuse
  const where = { status };

  // [fieldName] : "asc" || "desc"
  const orderBy = columnNames.includes(paramsOrderBy)
    ? { [paramsOrderBy]: order }
    : undefined;

  const page = Number(currentPage) || 1;
  const pageSize = 10;

  let issues,
    itemCount = 0;

  try {
    issues = await prisma.issue.findMany({
      where,
      orderBy,
      include: {
        assignedToUser: true,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    itemCount = await prisma.issue.count({ where });
  } catch (error) {
    console.error("Failed to fetch issue counts:", error);
  }

  await delay(1000);

  if (!issues) return;

  return (
    <Flex direction="column" gap="3">
      <IssueActions />

      <IssueTable issues={issues} searchParams={searchParamsAwaited} />

      <Pagination
        itemCount={itemCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";
export default IssuePage;

export const metadata: Metadata = {
  title: "Issue Tracker - Issues List",
  description: "View all issues",
};
