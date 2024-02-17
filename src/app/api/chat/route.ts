import { ollama } from "@/lib/server";
import { StreamingTextResponse } from "ai";
import { ChatResponse } from "ollama";
import { ZodError, z } from "zod";

const bodySchema = z.object({
  messages: z.array(
    z.object({
      role: z.string(),
      content: z.string().min(1, "Content should not be empty"),
    })
  ),
});

function createStream(iterator: AsyncGenerator<ChatResponse, any, unknown>) {
  return new ReadableStream<string>({
    async start(controller) {
      for await (const v of iterator) {
        controller.enqueue(v.message.content);
      }
      controller.close();
    },
    // async pull(controller) {
    //   const { done, value } = await iterator.next();

    //   if (done) {
    //     controller.close();
    //   } else {
    //     controller.enqueue(value);
    //   }
    // },
  });
}

// IMPORTANT! Set the runtime to edge
// export const runtime = "edge";

// @ts-ignore
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsedBody = bodySchema.parse(body);

    const response = await ollama.chat({
      // model: "llama2-uncensored:7b",
      model: "llama2:latest", // 7b
      messages: parsedBody.messages,
      stream: true,
    });

    const stream = createStream(response);

    return new StreamingTextResponse(stream);
  } catch (err) {
    console.log(err);
    if (err instanceof ZodError) {
      return Response.json(
        err.errors.at(0)?.message || "Something went wrong! Please try again later."
      );
    }
    return Response.json("Something went wrong! Please try again later.");
  }
}
