import { Home, Users, File, Stars, Settings } from "lucide-react";

export const NAME_PROJECT = "Apc Prime";

export const ROUTES = [
  {
    title: "Home",
    url: "/dashboard",
    items: [],
    icon: Home,
  },
  {
    title: "Users",
    url: "/users",
    items: [],
    icon: Users,
  },
  {
    title: "Requests",
    url: "/requests",
    items: [],
    icon: File,
  },
  {
    title: "Transactions",
    url: "/transactions",
    icon: File,
    items: [
      {
        title: "Pending",
        url: "/pending",
      },
      {
        title: "Accepted",
        url: "/accepted",
      },
      {
        title: "Rejected",
        url: "/rejected",
      },
    ],
  },
  {
    title: "Kyc files",
    url: "/kyc-files",
    items: [],
    icon: Stars,
  },
  {
    title: "Settings",
    url: "/settings",
    items: [],
    icon: Settings,
  },
];
