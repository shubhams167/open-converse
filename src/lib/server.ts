import * as fs from "fs/promises";
import { Ollama } from "ollama";
import * as path from "path";

export const ollama = new Ollama({
  host: process.env.OLLAMA_HOST,
});

export const readTokens = async () => {
  const rawResponse = await fs.readFile(
    path.resolve(path.join(".", "src", "app", "response.json"))
  );
  const tokens = JSON.parse(rawResponse.toString());
  // console.log(tokens);
  const sentence = tokens.map((token: any) => token.response as string).join("");
  // console.log(sentence);
  return sentence;
};
