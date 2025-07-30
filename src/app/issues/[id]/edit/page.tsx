import { notFound } from "next/navigation";
import IssueForm from "../../_components/IssueForm";
import { prisma } from "@/lib/prisma";
import delay from "delay";

interface Props {
  params: Promise<{ id: string }>;
}

const IssueEditPage = async ({ params }: Props) => {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: { id: Number(id) },
  });

  await delay(1000);

  if (!issue) return notFound();

  return <IssueForm issue={issue} />;
};

export default IssueEditPage;
