import { prisma } from "@/lib/prisma";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssueChartWrapper from "@/app/components/IssueChartWrapper";
import { Flex, Grid } from "@radix-ui/themes";
import type { Metadata } from "next";

export default async function Home() {
  let open = 0,
    inProgress = 0,
    closed = 0,
    total = 0;

  try {
    open = await prisma.issue.count({ where: { status: "OPEN" } });
    inProgress = await prisma.issue.count({
      where: { status: "IN_PROGRESS" },
    });
    closed = await prisma.issue.count({ where: { status: "CLOSED" } });
    total = await prisma.issue.count();
  } catch (error) {
    console.error("Failed to fetch issue counts:", error);
  }

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary
          open={open}
          inProgress={inProgress}
          closed={closed}
          total={total}
        />
        <IssueChartWrapper
          open={open}
          inProgress={inProgress}
          closed={closed}
        />
      </Flex>

      <LatestIssues />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of issues",
};
