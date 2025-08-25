import { NextRequest, NextResponse } from "next/server";
import { commentEditSchema, commentSchema } from "../../../validationSchemas";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import authOptions from "../../auth/[...nextauth]/authOptions";

export async function GET(
  _request: NextRequest,
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
    const validate = commentEditSchema.safeParse(body);

    if (!validate.success)
      return NextResponse.json(validate.error.issues, { status: 400 });

    const comment = await prisma.comment.findUnique({
      where: { id },
    });

    if (!comment)
      return NextResponse.json(
        { error: "Comment not found." },
        { status: 404 }
      );

    const { content } = body;

    const updatedComment = await prisma.comment.update({
      where: { id },
      data: {
        content,
        edited: true,
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
