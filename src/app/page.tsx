import ChatBox from "@/components/ChatBox";
import { ollama } from "@/lib/server";

export default async function Home() {
  const modelsResponse = await ollama.list();
  const supportedModels = modelsResponse.models.map((model) => model.name);

  return (
    <div className="px-12 py-6 w-full">
      <ChatBox supportedModels={supportedModels} />
    </div>
  );
}
