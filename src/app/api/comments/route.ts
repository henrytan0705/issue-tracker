import { NextRequest, NextResponse } from "next/server";
import { commentSchema } from "../../validationSchemas";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import authOptions from "../auth/[...nextauth]/authOptions";

export async function GET() {
  const comments = await prisma.comment.findMany();
  return NextResponse.json(comments, { status: 200 });
}

// create new comment for an issue
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({}, { status: 401 });

    const body = await request.json();
    const validate = commentSchema.safeParse(body);

    if (!validate.success)
      return NextResponse.json(validate.error.issues, { status: 400 });

    const { content, userId, issueId } = body;

    if (userId) {
      const user = await prisma.user.findUnique({ where: { id: userId } });

      if (!user)
        return NextResponse.json({ error: "Invalid User." }, { status: 404 });
    }

    const issue = await prisma.issue.findUnique({ where: { id: issueId } });

    if (!issue)
      return NextResponse.json({ error: "Issue not found." }, { status: 404 });

    const newComment = await prisma.comment.create({
      data: {
        content,
        userId,
        issueId,
      },
    });

    return NextResponse.json(newComment, { status: 200 });
  } catch (error) {
    console.error("POST /api/comments failed: ", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
