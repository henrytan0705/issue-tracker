import { prisma } from "@/lib/prisma";
import { Box, Grid } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
interface Props {
  params: { id: string };
}

const IssuePage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: Number(params.id) },
  });

  if (!issue) return notFound();

  await delay(1000);

  return (
    <Grid columns={{ initial: "1", xs: "2" }} gap="5">
      <Box>
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <EditIssueButton issueId={params.id} />
      </Box>
    </Grid>
  );
};

export default IssuePage;
