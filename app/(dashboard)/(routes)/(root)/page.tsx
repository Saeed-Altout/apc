import { Users, FileText, FileCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent>
            <div className="flex flex-col">
              <FileText className="h-10 w-10 text-purple-500 mb-2" />
              <p className="text-sm text-muted-foreground">Pending requests</p>
              <p className="text-2xl font-semibold">2345 requests</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex flex-col">
              <Users className="h-10 w-10 text-blue-500 mb-2" />
              <p className="text-sm text-muted-foreground">
                Total users in system
              </p>
              <p className="text-2xl font-semibold">2346 users</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex flex-col">
              <FileCheck className="h-10 w-10 text-green-500 mb-2" />
              <p className="text-sm text-muted-foreground">
                Number of verifications
              </p>
              <p className="text-2xl font-semibold">2346 users</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        <h3 className="text-2xl font-semibold">Recent requests</h3>
        <p className="text-sm text-muted-foreground">
          Here are the most recent requests
        </p>
      </div>
    </div>
  );
}
