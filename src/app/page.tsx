import { prisma } from "@/lib/prisma";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });

  return (
    <>
      <h1>Home Page</h1>

      <IssueSummary open={open} inProgress={inProgress} closed={closed} />

      <LatestIssues />
    </>
  );
}
