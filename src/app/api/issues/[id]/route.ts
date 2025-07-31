import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "@/app/validationSchemas";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import authOptions from "../../auth/[...nextauth]/authOptions";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const issue = await prisma.issue.findUnique({
    where: { id: Number(id) },
  });

  if (!issue)
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });

  return NextResponse.json(issue);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 400 });

  const id = (await params).id;

  // validate body first
  const body = await request.json();
  const validate = issueSchema.safeParse(body);

  if (!validate.success)
    return NextResponse.json(validate.error.issues, { status: 400 });

  // find & check if issue exists
  const issue = await prisma.issue.findUnique({
    where: { id: Number(id) },
  });

  if (!issue)
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });

  // update issue
  const updatedIssue = await prisma.issue.update({
    where: {
      id: Number(id),
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
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 400 });

  const id = (await params).id;

  const issue = await prisma.issue.findUnique({
    where: { id: Number(id) },
  });

  if (!issue)
    return NextResponse.json({ error: "Issue not found." }, { status: 404 });

  await prisma.issue.delete({ where: { id: Number(id) } });

  return NextResponse.json(
    { message: "Issue deleted successfully." },
    { status: 200 }
  );
}
