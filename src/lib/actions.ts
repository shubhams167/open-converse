"use server";

import { ZodError, z } from "zod";
import ollama from "ollama";

const chatSchema = z.object({
  prompt: z
    .string()
    .min(1, "Prompt should not be empty")
    .max(400, "Prompt should not contain more than 400 characters"),
});

type ActionResponse = {
  success: boolean;
  // response?: string;
  response?: any;
  error?: unknown;
};

export const chat = async (prompt: string): Promise<ActionResponse> => {
  try {
    const parsedData = chatSchema.parse({
      prompt,
    });

    const response = await ollama.chat({
      model: "llama2-uncensored:7b",
      // model: "llama2:latest", // 7b
      // model: "llama2",
      // messages: [{role: "system", content: ""}, { role: "user", content: prompt }],
      messages: [{ role: "user", content: parsedData.prompt }],
      // stream: true,
    });
    // console.log(response);
    // const modelsRes = await ollama.list()
    // console.log(modelsRes.models)

    // return { success: true, response: response };
    return { success: true, response: response.message.content };
  } catch (err) {
    console.log(err);
    if (err instanceof ZodError) {
      err.errors.at(0)?.message;
      return { success: false, error: err.errors.at(0)?.message };
    }
    return { success: false, error: "Something went wrong! Please try again later." };
  }
};
