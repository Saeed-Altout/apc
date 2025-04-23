"use client";

import * as React from "react";
import { useState } from "react";
import { Download, Edit, Plus, Search, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Mock data for translations
const mockTranslations = [
  {
    id: "1",
    code: "1",
    english: "admin",
    arabic: "أدمن",
    turkish: "admin",
  },
  {
    id: "2",
    code: "2",
    english: "admin",
    arabic: "أدمن",
    turkish: "admin",
  },
  {
    id: "3",
    code: "3",
    english: "admin",
    arabic: "أدمن",
    turkish: "admin",
  },
  {
    id: "4",
    code: "4",
    english: "management",
    arabic: "إدارة",
    turkish: "yönetim",
  },
];

export default function TranslationPage() {
  const [translations, setTranslations] = useState(mockTranslations);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter translations based on search query
  const filteredTranslations = translations.filter((translation) => {
    if (!searchQuery) return true;
    return (
      translation.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      translation.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
      translation.arabic.includes(searchQuery) ||
      translation.turkish.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Handle export action
  const handleExport = () => {
    console.log("Exporting translations...");
    // In a real app, this would trigger an API call to export the data
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-72">
          <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="space-x-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="mr-2 h-4 w-4" />
            Add
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <div className="overflow-hidden">
          <table className="w-full caption-bottom text-sm">
            <thead className="border-b bg-slate-50 [&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium w-[5%]">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300"
                  />
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium w-[10%]">
                  Code
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium w-[25%]">
                  Word English
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium w-[25%]">
                  Word Arabic
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium w-[25%]">
                  Word Turkish
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium w-[10%]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {filteredTranslations.map((translation) => (
                <tr
                  key={translation.id}
                  className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                >
                  <td className="p-4 align-middle">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300"
                    />
                  </td>
                  <td className="p-4 align-middle">{translation.code}</td>
                  <td className="p-4 align-middle">
                    <Badge
                      variant="outline"
                      className="bg-gray-100 font-normal"
                    >
                      {translation.english}
                    </Badge>
                  </td>
                  <td className="p-4 align-middle">
                    <Badge
                      variant="outline"
                      className="bg-gray-100 font-normal"
                    >
                      {translation.arabic}
                    </Badge>
                  </td>
                  <td className="p-4 align-middle">
                    <Badge
                      variant="outline"
                      className="bg-gray-100 font-normal"
                    >
                      {translation.turkish}
                    </Badge>
                  </td>
                  <td className="p-4 align-middle">
                    <div className="flex space-x-2">
                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
