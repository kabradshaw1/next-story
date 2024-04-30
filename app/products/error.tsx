"use client";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h1>Error</h1>
      <p>{error.message}</p>
      <button onClick={reset}>Reset Button</button>
    </div>
  );
}
