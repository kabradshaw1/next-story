import Link from "next/link";

import Card from "@/component/card";

export default function ArchivedNotifications() {
  return (
    <Card>
      <h1>Notifications</h1>
      <Link href="/complex-dashboard" className="text-emerald-900">
        Archived
      </Link>
    </Card>
  );
}
