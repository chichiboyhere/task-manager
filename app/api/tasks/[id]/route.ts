import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { userId } = await auth();

    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const task = await prisma.task.findUnique({ where: { id } });

    if (!task || task.userId !== userId)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    let body: any = {};
    try {
      body = await req.json(); // ⚠️ could be empty for toggle operations
    } catch {}

    // CASE 1: Toggle completed (no body sent)
    const isToggleRequest =
      !body ||
      Object.keys(body).length === 0 ||
      (Object.keys(body).length === 1 && body.completed === undefined);

    if (isToggleRequest) {
      const updated = await prisma.task.update({
        where: { id },
        data: { completed: !task.completed },
      });

      return NextResponse.json(updated);
    }

    // CASE 2: Update the task fields
    const updated = await prisma.task.update({
      where: { id },
      data: {
        title: body.title ?? task.title,
        description: body.description ?? task.description,
        priority: body.priority ?? task.priority,
        dueDate: body.dueDate ? new Date(body.dueDate) : task.dueDate,
        completed:
          typeof body.completed === "boolean" ? body.completed : task.completed,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// ✅ DELETE
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // 👈 must await
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const task = await prisma.task.findUnique({ where: { id } });
    if (!task || task.userId !== userId)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    await prisma.task.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
