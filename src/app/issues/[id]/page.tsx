import React from "react";
import { Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { prisma } from "@/../prisma/client";
import { notFound } from "next/navigation";
import delay from "delay";
import StatusBadge from "@/app/components/StatusBadge";
import Markdown from "react-markdown";
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
    <Box className="max-w-xl">
      <Heading>{issue.title}</Heading>
      <Flex gap="3" className="mt-4">
        <StatusBadge status={issue.status}></StatusBadge>
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>

      <Card className="prose mt-4">
        <Markdown>{issue.description}</Markdown>
      </Card>
    </Box>
  );
};

export default IssuePage;
