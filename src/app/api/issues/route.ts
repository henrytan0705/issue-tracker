import { NextRequest, NextResponse } from "next/server";
import issueSchema from "./schema";
import { prisma } from "@/../prisma/client";

export async function GET() {
  const issues = await prisma.issue.findMany();

  return NextResponse.json(issues, { status: 200 });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validate = issueSchema.safeParse(body);

  if (!validate.success)
    return NextResponse.json(validate.error.issues, { status: 400 });

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newIssue, { status: 200 });
}
