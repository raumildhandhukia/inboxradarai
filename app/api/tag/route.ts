import { auth } from "@/auth";
import { db } from "@/lib/db";
import { TagSchema } from "@/schemas";
import { Label } from "@/types";

export async function POST(request: Request) {
  const session = await auth();
  const user = session?.user;
  if (!user || !user.id) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }
  const userId: string = user.id;
  const body = await request.json();
  const { tags }: { tags: Label[] } = body;
  let isValid = true;
  const data = tags.map((tag) => {
    const result = TagSchema.safeParse({
      label: tag.label,
      description: tag.description,
    });
    if (!result.success) {
      isValid = false;
    }
    return {
      label: tag.label,
      description: tag.description,
      color: `rgba(${tag.color.r}, ${tag.color.g}, ${tag.color.b}, ${tag.color.a})`,
      userId,
    };
  });
  if (!isValid) {
    return new Response("Invalid", {
      status: 400,
    });
  }

  await db.tag.createMany({
    data,
  });

  return new Response("Created", {
    status: 201,
  });
}
