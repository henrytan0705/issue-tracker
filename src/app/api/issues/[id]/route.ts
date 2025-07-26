import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "@/app/validationSchemas";
import { prisma } from "@/../prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const issue = await prisma.issue.findUnique({
    where: { id: Number(params.id) },
  });

  if (!issue)
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });

  return NextResponse.json(issue);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const issue = await prisma.issue.findUnique({
    where: { id: Number(params.id) },
  });

  if (!issue)
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });

  const validate = issueSchema.safeParse(body);

  if (!validate.success)
    return NextResponse.json(validate.error.issues, { status: 400 });

  const updatedIssue = await prisma.issue.update({
    where: {
      id: Number(params.id),
    },
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const issue = await prisma.issue.findUnique({
    where: { id: Number(params.id) },
  });

  if (!issue)
    return NextResponse.json({ error: "Issue not found." }, { status: 404 });

  await prisma.issue.delete({ where: { id: Number(params.id) } });

  return NextResponse.json(
    { message: "Issue deleted successfully." },
    { status: 200 }
  );
}
