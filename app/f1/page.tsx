import Link from "next/link";

export default function f1() {
  return (
    <div>
      <h1>Page f1</h1>
      <div>
        <Link href="/f1/f2">f2</Link>
      </div>
    </div>
  );
}
