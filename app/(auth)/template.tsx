"use client";
import { useState } from "react";
//this is similar to a layout, but the state will not be preserved between navigations
export default function AuthTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [input, setInput] = useState("");
  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="box-border w-1/2 p-2 m-2 border-2 border-gray-400 rounded-md"
      />
      {children}
    </div>
  );
}
