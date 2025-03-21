"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertCircle,
  Download,
  Eye,
  File,
  FileCheck,
  FileClock,
  FileX,
  MoreHorizontal,
  Plus,
  Upload,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  status: "verified" | "pending" | "rejected" | "expired";
  uploadedAt: string;
  expiresAt?: string;
}

export function DocumentsTab() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "ID Card.pdf",
      type: "Identification",
      size: "2.4 MB",
      status: "verified",
      uploadedAt: "2023-01-15",
      expiresAt: "2025-01-15",
    },
    {
      id: "2",
      name: "Proof_of_Address.jpg",
      type: "Address Verification",
      size: "1.8 MB",
      status: "pending",
      uploadedAt: "2023-02-20",
    },
    {
      id: "3",
      name: "Passport_Copy.pdf",
      type: "Identification",
      size: "3.2 MB",
      status: "expired",
      uploadedAt: "2021-11-10",
      expiresAt: "2023-11-10",
    },
    {
      id: "4",
      name: "Bank_Statement.pdf",
      type: "Financial",
      size: "4.7 MB",
      status: "rejected",
      uploadedAt: "2023-03-05",
    },
  ]);

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const getStatusIcon = (status: Document["status"]) => {
    switch (status) {
      case "verified":
        return <FileCheck className="h-4 w-4 text-success" />;
      case "pending":
        return <FileClock className="h-4 w-4 text-tertiary" />;
      case "rejected":
        return <FileX className="h-4 w-4 text-destructive" />;
      case "expired":
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: Document["status"]) => {
    switch (status) {
      case "verified":
        return <Badge variant="success">Verified</Badge>;
      case "pending":
        return <Badge variant="tertiary">Pending</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      case "expired":
        return <Badge variant="secondary">Expired</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>User Documents</CardTitle>
            <CardDescription>
              Manage and verify documents uploaded by the user.
            </CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload New Document</DialogTitle>
                <DialogDescription>
                  Upload a document for verification.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                {isUploading ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Uploading...</span>
                      <span className="text-sm">{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} />
                  </div>
                ) : (
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <div className="flex flex-col items-center">
                      <File className="h-8 w-8 text-muted-foreground mb-2" />
                      <h3 className="text-lg font-medium">Drag & Drop Files</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        or click to browse
                      </p>
                      <Button size="sm" onClick={handleUpload}>
                        Select Files
                      </Button>
                    </div>
                  </div>
                )}
                <div className="text-xs text-muted-foreground">
                  <p>Accepted formats: PDF, JPG, PNG</p>
                  <p>Maximum file size: 10MB</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Uploaded</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>
                    <div className="flex items-center gap-x-2">
                      {getStatusIcon(doc.status)}
                      <span>{doc.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ({doc.size})
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{doc.type}</TableCell>
                  <TableCell>{getStatusBadge(doc.status)}</TableCell>
                  <TableCell>{doc.uploadedAt}</TableCell>
                  <TableCell>{doc.expiresAt || "N/A"}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <FileX className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Document Requirements</CardTitle>
          <CardDescription>
            Documents required for account verification.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-start gap-x-2">
              <div className="h-5 w-5 mt-0.5 flex items-center justify-center rounded-full bg-success text-white">
                ✓
              </div>
              <div>
                <h4 className="font-medium">ID Verification</h4>
                <p className="text-sm text-muted-foreground">
                  Government-issued ID, passport, or driver's license
                </p>
              </div>
            </li>
            <li className="flex items-start gap-x-2">
              <div className="h-5 w-5 mt-0.5 flex items-center justify-center rounded-full bg-secondary text-foreground">
                ✗
              </div>
              <div>
                <h4 className="font-medium">Proof of Address</h4>
                <p className="text-sm text-muted-foreground">
                  Utility bill, bank statement, or tax document (not older than
                  3 months)
                </p>
              </div>
            </li>
            <li className="flex items-start gap-x-2">
              <div className="h-5 w-5 mt-0.5 flex items-center justify-center rounded-full bg-secondary text-foreground">
                ?
              </div>
              <div>
                <h4 className="font-medium">Additional Documentation</h4>
                <p className="text-sm text-muted-foreground">
                  May be requested based on account activity and jurisdiction
                </p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
