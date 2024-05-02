import Logo from "@/components/Logo/Logo";

export default function Home() {
  return (
    <main>
      <div className="w-full max-w-xs">
        <div className="bg-gray-800 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          <Logo/>
        </div>
      </div>
    </main>
  );
}
