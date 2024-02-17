"use client";

import { Message } from "ai";
import { useChat } from "ai/react";
import { FormEvent, useEffect, useRef } from "react";

type Props = {
  supportedModels: string[];
};

const RoleToLabel: Record<Message["role"], string> = {
  user: "You",
  assistant: "Assistant",
  system: "System",
  data: "Data",
  function: "Function",
  tool: "Tool",
};

const ChatBox = ({ supportedModels }: Props) => {
  const chatBottomElement = useRef<HTMLDivElement>(null);
  const {
    messages,
    input: prompt,
    handleSubmit,
    setInput: setPrompt,
    handleInputChange,
    setMessages,
    isLoading,
  } = useChat({
    api: "/api/chat",
  });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!prompt) return;

    setPrompt("");
    handleSubmit(event);
  };

  const onReset = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessages([]);
    setPrompt("");
  };

  useEffect(() => {
    chatBottomElement.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full w-full items-center gap-4 bg-slate-600 rounded-md p-4">
      <div className="flex flex-col flex-grow gap-4 w-full overflow-y-auto">
        {messages.map((message) => (
          <p key={message.id}>
            <span className="block font-extrabold text-gray-400">{RoleToLabel[message.role]}</span>
            <span className="whitespace-pre-wrap">{message.content}</span>
          </p>
        ))}
        {isLoading && (
          <span className="animate-ping inline-flex h-2 w-2 m-1 rounded-full bg-white opacity-75"></span>
        )}
        <div ref={chatBottomElement}></div>
      </div>
      <form onSubmit={onSubmit} onReset={onReset} className="flex gap-4 w-full">
        <input
          type="text"
          placeholder="Enter your prompt"
          autoFocus
          onChange={handleInputChange}
          className="text-black p-2 rounded-md flex-grow"
          value={prompt}
        />
        <button type="submit" className="hover:bg-slate-700 py-2 px-3 rounded-md transition-colors">
          Send
        </button>
        <button type="reset" className="hover:bg-slate-700 py-2 px-3 rounded-md transition-colors">
          Clear
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
