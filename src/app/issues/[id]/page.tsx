import { prisma } from "@/lib/prisma";
import { Box, Flex, Grid } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
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
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>

      <Box>
        <Flex direction="column" gap="4">
          <EditIssueButton issueId={id} />
          <DeleteIssueButton issueId={id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default IssuePage;
