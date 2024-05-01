import Link from "next/link";

import Card from "@/component/card";

export default function Notifications() {
  return (
    <Card>
      <div>Notifications</div>
      <Link href="/complex-dashboard/archived" className="text-">
        Dashboard
      </Link>
    </Card>
  );
}
