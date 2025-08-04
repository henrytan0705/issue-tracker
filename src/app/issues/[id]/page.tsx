import { prisma } from "@/lib/prisma";
import { Box, Flex, Grid } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import AssignIssueDropdown from "./AssignIssueDropdown";
import type { Metadata } from "next";
import { cache } from "react";

interface Props {
  params: Promise<{ id: string }>;
}

const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({
    where: { id: issueId },
  })
);

const IssuePage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const { id } = await params;

  const issue = await fetchUser(Number(id));

  if (!issue) return notFound();

  await delay(1000);

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>

      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssignIssueDropdown issue={issue} />
            <EditIssueButton issueId={id} />
            <DeleteIssueButton issueId={id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default IssuePage;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const issue = await fetchUser(Number(id));

  return {
    title: issue?.title,
    description: "Details of issue " + issue?.id,
  };
}
