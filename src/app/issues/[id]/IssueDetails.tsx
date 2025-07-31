import { StatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import Markdown from "react-markdown";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap="3" className="mt-4">
        <StatusBadge status={issue.status}></StatusBadge>
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>

      <Card className="prose mt-4 max-w-full">
        <Markdown>{issue.description}</Markdown>
      </Card>
    </>
  );
};

export default IssueDetails;
