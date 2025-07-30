import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";
import delay from "delay";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  loading: () => <IssueFormSkeleton />,
});

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
