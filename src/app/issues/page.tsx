import { prisma } from "@/lib/prisma";
import delay from "delay";
import IssueActions from "./IssueActions";
import { Status } from "@prisma/client";
import Pagination from "../components/Pagination";
import IssueTable, { IssueQuery } from "./IssueTable";
import { columnNames } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
interface Props {
  searchParams: Promise<IssueQuery>;
}

const IssuePage = async ({ searchParams }: Props) => {
  const searchParamsAwaited = await searchParams;
  const {
    status: paramsFilterStatus,
    orderBy: paramsOrderBy,
    page: currentPage,
  } = searchParamsAwaited;

  const statuses = Object.values(Status);
  const status = statuses.includes(paramsFilterStatus as Status)
    ? (paramsFilterStatus as Status)
    : undefined;

  // store where filter into one object for reuse
  const where = { status };

  const orderBy = columnNames.includes(paramsOrderBy)
    ? { [paramsOrderBy]: "asc" }
    : undefined;

  const page = Number(currentPage) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const itemCount = await prisma.issue.count({ where });

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
