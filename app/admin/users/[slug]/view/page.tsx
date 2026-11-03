// app/admin/users/[slug]/view/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getUser } from "@/app/actions/user-actions";
import AppBreadcrumb from "@/components/AppBreadcrumb";

type PageProps = {
  params: Promise<{ slug: string }>;

};

export default async function ViewUserPage({ params }: PageProps) {
  const { slug } = await params;
  const result = await getUser(slug);
  if (!result.success || !result.data) notFound();
  const user = result.data;

  const statusLabel = user.status ? "Active" : "Inactive";

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-4">
        <AppBreadcrumb
          items={[
            { label: "Dashboard", href: "/admin/dashboard" },
            { label: "Users", href: "/admin/users" },
            { label: user.name },
          ]}
        />
        <div className="flex items-center gap-2 me-4">
          <Button
            size="sm"
            render={<Link href={`/admin/users/${user.id}/edit`}>Edit</Link>}
          />
          <Button
            size="sm"
            render={<Link href="/admin/users">Index</Link>}
          />
        </div>
      </div>

      <Card >
        <CardHeader className="border-b">
          <CardTitle className="text-lg font-semibold">User Details</CardTitle>
        </CardHeader>

        <CardContent className="p-6 ">
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <Detail label="Name" value={user.name} />
            <Detail label="Email" value={user.email} />
            <Detail label="Phone" value={user.phone || "—"} />
            <Detail
              label="Role"
              value={
                <Badge
                  variant={user.role === "admin" ? "default" : "secondary"}
                >
                  {user.role}
                </Badge>
              }
            />
            <Detail
              label="Status"
              value={
                <Badge variant={user.status ? "default" : "secondary"}>
                  {statusLabel}
                </Badge>
              }
            />
            <Detail
              label="Created"
              value={new Date(user.createdAt).toLocaleString()}
            />
            <Detail
              label="Last Updated"
              value={new Date(user.updatedAt).toLocaleString()}
            />
            <Detail
              label="ID"
              value={<code className="text-xs">{user.id}</code>}
            />
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
      <dd className="text-sm">{value}</dd>
    </div>
  );
}
