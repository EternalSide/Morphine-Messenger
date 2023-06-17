"use client";

import { FullMessageType } from "@/app/types";
import { useState, useRef } from "react";

interface BodyProps {
  initialMessages: FullMessageType[];
}
const Body: React.FC<BodyProps> = ({ initialMessages }) => {
  const [message, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);
  return <div className="flex-1 overflow-y-auto">Body</div>;
};
export default Body;
