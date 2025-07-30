import { prisma } from "@/lib/prisma";
import { Box, Grid } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
interface Props {
  params: Promise<{ id: string }>;
}

const IssuePage = async ({ params }: Props) => {
  const { id } = await params;

  const issue = await prisma.issue.findUnique({
    where: { id: Number(id) },
  });

  if (!issue) return notFound();

  await delay(1000);

  return (
    <Grid columns={{ initial: "1", xs: "2" }} gap="5">
      <Box>
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <EditIssueButton issueId={id} />
      </Box>
    </Grid>
  );
};

export default IssuePage;
