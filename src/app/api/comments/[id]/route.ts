import { NextRequest, NextResponse } from "next/server";
import { commentSchema } from "../../../validationSchemas";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import authOptions from "../../auth/[...nextauth]/authOptions";

export async function GET(
  request: NextResponse,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const comments = await prisma.comment.findMany({
      where: { issueId: Number(id) },
      include: { user: true },
    });

    if (!comments)
      return NextResponse.json(
        { error: "Comments not found." },
        { status: 404 }
      );

    return NextResponse.json(comments);
  } catch (error) {
    console.error("GET /api/comments/[id] failed: ", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({}, { status: 401 });

    const { id } = await params;

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

    const updatedComment = await prisma.comment.update({
      where: { id },
      data: {
        content,
      },
    });

    return NextResponse.json(updatedComment, { status: 200 });
  } catch (error) {
    console.error("PATCH /api/comments/[id] failed: ", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({}, { status: 401 });

    const { id } = await params;

    const comment = await prisma.comment.findUnique({
      where: { id },
    });

    if (!comment)
      return NextResponse.json(
        { error: "Comment not found." },
        { status: 404 }
      );

    await prisma.comment.delete({ where: { id } });

    return NextResponse.json(
      { message: "Comment deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/comments/[id] failed: ", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
