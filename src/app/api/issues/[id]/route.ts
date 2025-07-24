import { NextRequest, NextResponse } from "next/server";
// import issueSchema from "../schema";
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

export async function PUT(request: NextRequest) {}
