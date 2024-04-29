"use client";
import { useState } from "react";

// This demonstrates that the layout will preserve state between navigation if it's children
export default function AuthLayout({
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
