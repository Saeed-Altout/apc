"use client";

import { useState } from "react";
import {
  Activity,
  DollarSign,
  Download,
  FileClock,
  Users,
  Calendar,
  BarChart3,
  Bell,
  LayoutDashboard,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  User,
  Clock,
  Shield,
  LineChart,
  FileText,
  HardDrive,
  Database,
  Signal,
  CheckCircle2,
  Search,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";

export default function RootPage() {
  const [selectedTab, setSelectedTab] = useState("overview");

  // Mock data for recent activity
  const recentActivity = [
    {
      id: "ACT-001",
      user: "John Doe",
      action: "Created a new account",
      time: "10 minutes ago",
      icon: User,
    },
    {
      id: "ACT-002",
      user: "Alice Smith",
      action: "Submitted KYC documents",
      time: "24 minutes ago",
      icon: FileText,
    },
    {
      id: "ACT-003",
      user: "Bob Johnson",
      action: "Made a deposit of $5,000",
      time: "1 hour ago",
      icon: CreditCard,
    },
    {
      id: "ACT-004",
      user: "Sarah Williams",
      action: "Updated profile information",
      time: "2 hours ago",
      icon: User,
    },
  ];

  // Mock data for transactions
  const recentTransactions = [
    {
      id: "TRX-001",
      user: "Michael Brown",
      type: "Deposit",
      amount: "+$3,500.00",
      status: "completed",
      date: "Today, 10:45 AM",
    },
    {
      id: "TRX-002",
      user: "Jessica Lee",
      type: "Withdrawal",
      amount: "-$1,200.00",
      status: "pending",
      date: "Today, 09:32 AM",
    },
    {
      id: "TRX-003",
      user: "David Wilson",
      type: "Deposit",
      amount: "+$7,800.00",
      status: "completed",
      date: "Yesterday, 3:20 PM",
    },
  ];

  return (
    <main className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, Admin! Here's what's happening with your platform
            today.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative w-full md:w-[260px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 bg-white border rounded-md shadow-sm focus-visible:ring-[#0f766d]"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Button variant="outline" size="sm" className="flex-1 md:flex-none">
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
            <Button
              size="sm"
              className="bg-[#0f766d] hover:bg-[#0f766d]/90 text-white flex-1 md:flex-none"
            >
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <div className="bg-green-100 p-2 rounded-full">
                <DollarSign className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <div className="flex items-center text-xs mt-1">
                <span className="flex items-center text-green-600">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  +20.1%
                </span>
                <span className="text-muted-foreground ml-2">
                  from last month
                </span>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Users
              </CardTitle>
              <div className="bg-blue-100 p-2 rounded-full">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,350</div>
              <div className="flex items-center text-xs mt-1">
                <span className="flex items-center text-green-600">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  +18.1%
                </span>
                <span className="text-muted-foreground ml-2">
                  from last month
                </span>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Requests
              </CardTitle>
              <div className="bg-amber-100 p-2 rounded-full">
                <FileClock className="h-4 w-4 text-amber-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">38</div>
              <div className="flex items-center text-xs mt-1">
                <span className="flex items-center text-red-600">
                  <ArrowDownRight className="mr-1 h-3 w-3" />
                  -3.2%
                </span>
                <span className="text-muted-foreground ml-2">
                  from last month
                </span>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Now</CardTitle>
              <div className="bg-purple-100 p-2 rounded-full">
                <Activity className="h-4 w-4 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">573</div>
              <div className="flex items-center text-xs mt-1">
                <span className="flex items-center text-green-600">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  +201
                </span>
                <span className="text-muted-foreground ml-2">
                  since last hour
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Middle Section - Charts and Activity */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          {/* User breakdown */}
          <Card className="lg:col-span-4 border-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>User Overview</CardTitle>
                  <CardDescription>
                    Breakdown of user statistics across the platform
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  Last 30 days
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium mb-3">
                    User Distribution
                  </h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                          <span>Active Users</span>
                        </div>
                        <span className="font-medium">65%</span>
                      </div>
                      <Progress
                        value={65}
                        className="h-2 bg-blue-100"
                        indicatorClassName="bg-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                          <span>Pending Verification</span>
                        </div>
                        <span className="font-medium">24%</span>
                      </div>
                      <Progress
                        value={24}
                        className="h-2 bg-amber-100"
                        indicatorClassName="bg-amber-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-red-500"></div>
                          <span>Blocked Users</span>
                        </div>
                        <span className="font-medium">11%</span>
                      </div>
                      <Progress
                        value={11}
                        className="h-2 bg-red-100"
                        indicatorClassName="bg-red-500"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-sm font-medium mb-3">Growth Rate</h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold">+28.5%</div>
                        <div className="text-xs text-muted-foreground">
                          Monthly Growth
                        </div>
                      </div>
                      <LineChart className="h-12 w-12 text-[#0f766d]" />
                    </div>
                  </div>
                </div>

                {/* Fake chart for visualization */}
                <div>
                  <h4 className="text-sm font-medium mb-4">User Activity</h4>
                  <div className="h-[220px] flex flex-col justify-end">
                    <div className="flex items-end justify-between h-[180px] gap-1 px-2">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-full bg-[#0f766d]/20 rounded-t-sm"
                          style={{
                            height: `${Math.max(
                              15,
                              Math.floor(Math.sin(i / 2) * 50 + 50)
                            )}%`,
                            opacity: 0.6 + (i % 3) * 0.1,
                          }}
                        ></div>
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground pt-3">
                      <span>Jan</span>
                      <span>Feb</span>
                      <span>Mar</span>
                      <span>Apr</span>
                      <span>May</span>
                      <span>Jun</span>
                      <span>Jul</span>
                      <span>Aug</span>
                      <span>Sep</span>
                      <span>Oct</span>
                      <span>Nov</span>
                      <span>Dec</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="lg:col-span-3 border-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest actions performed by users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentActivity.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="bg-slate-100 p-2 rounded-full">
                      <item.icon className="h-4 w-4 text-slate-600" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {item.action}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.user}{" "}
                        <span className="text-xs text-slate-500">
                          ({item.id})
                        </span>
                      </p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        {item.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-6">
                View All Activity
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>
                  Latest financial activities across the platform
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {recentTransactions.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-[#0f766d]/10 text-[#0f766d]">
                        {item.user
                          .split(" ")
                          .map((name) => name[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{item.user}</p>
                      <p className="text-xs text-muted-foreground">{item.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          item.type === "Deposit"
                            ? "text-green-600"
                            : "text-amber-600"
                        }`}
                      >
                        {item.amount}
                      </p>
                      <p className="text-xs text-muted-foreground text-right">
                        {item.date}
                      </p>
                    </div>
                    <Badge
                      className={
                        item.status === "completed"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-amber-100 text-amber-800 hover:bg-amber-100"
                      }
                    >
                      {item.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="bg-slate-50 border-t">
            <div className="flex items-center gap-2 text-sm">
              <Shield className="h-4 w-4 text-[#0f766d]" />
              <span>All transactions are secured and encrypted</span>
            </div>
          </CardFooter>
        </Card>

        {/* System Status */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          <Card className="md:col-span-2 border-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>System Status</CardTitle>
                  <CardDescription>
                    Real-time platform performance metrics
                  </CardDescription>
                </div>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  <CheckCircle2 className="mr-1 h-3 w-3" />
                  All Systems Operational
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Signal className="h-4 w-4 text-[#0f766d]" />
                      <span className="text-sm font-medium">
                        API Response Time
                      </span>
                    </div>
                    <span className="text-sm font-medium">120ms</span>
                  </div>
                  <Progress
                    value={24}
                    className="h-2 bg-slate-100"
                    indicatorClassName="bg-[#0f766d]"
                  />
                  <p className="text-xs text-muted-foreground">
                    Healthy (24% load)
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <HardDrive className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">Server Load</span>
                    </div>
                    <span className="text-sm font-medium">42%</span>
                  </div>
                  <Progress
                    value={42}
                    className="h-2 bg-blue-100"
                    indicatorClassName="bg-blue-600"
                  />
                  <p className="text-xs text-muted-foreground">
                    Normal (3/7 instances)
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium">
                        Database Usage
                      </span>
                    </div>
                    <span className="text-sm font-medium">63%</span>
                  </div>
                  <Progress
                    value={63}
                    className="h-2 bg-purple-100"
                    indicatorClassName="bg-purple-600"
                  />
                  <p className="text-xs text-muted-foreground">
                    Scaling soon (1.2TB/2TB)
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium">
                      Authentication Service
                    </span>
                  </div>
                  <span className="text-xs text-green-600 font-medium">
                    Operational
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium">
                      Payment Processing
                    </span>
                  </div>
                  <span className="text-xs text-green-600 font-medium">
                    Operational
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium">Trading Engine</span>
                  </div>
                  <span className="text-xs text-green-600 font-medium">
                    Operational
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium">
                      KYC Verification
                    </span>
                  </div>
                  <span className="text-xs text-green-600 font-medium">
                    Operational
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-slate-50 border-t">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-slate-500" />
                  <span className="text-muted-foreground">
                    Last updated: 2 minutes ago
                  </span>
                </div>
                <Button variant="outline" size="sm">
                  Refresh Status
                </Button>
              </div>
            </CardFooter>
          </Card>

          <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Security Status</CardTitle>
              <CardDescription>Platform security metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center rounded-full bg-green-100 p-4 mb-3">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-medium">System Protected</h4>
                  <p className="text-xs text-muted-foreground">
                    All security measures active
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Failed Login Attempts</span>
                    <span className="font-medium">12</span>
                  </div>
                  <Progress
                    value={12}
                    max={100}
                    className="h-2 bg-red-100"
                    indicatorClassName="bg-red-500"
                  />
                  <p className="text-xs text-muted-foreground">
                    Low (last 24 hours)
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>SSL Certificate</span>
                    <span className="text-green-600 font-medium">Valid</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Expires in 246 days
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Last Security Scan</span>
                    <span className="font-medium">2 days ago</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    No vulnerabilities detected
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
