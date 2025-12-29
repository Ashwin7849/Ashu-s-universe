'use client';

import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  Users,
  Download,
  Eye,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DashboardPage() {
  const stats = [
    { title: "Total Apps", value: "4", icon: Activity, change: "+2 from last month" },
    { title: "Total Downloads", value: "96,000", icon: Download, change: "+15.2% from last month" },
    { title: "Active Users", value: "5,231", icon: Users, change: "+180.1% from last month" },
    { title: "Visible Apps", value: "3", icon: Eye, change: "1 app hidden" },
  ];

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex items-center justify-center rounded-lg border border-dashed shadow-sm p-8">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            More analytics coming soon!
          </h3>
          <p className="text-sm text-muted-foreground">
            You can manage your apps by navigating to the Apps page.
          </p>
          <Button className="mt-4" asChild>
            <Link href="/admin/dashboard/apps">Manage Apps</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
