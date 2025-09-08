import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileText, Shield, Send, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { FileUploadZone } from "@/components/FileUploadZone";
import { AnonymizationTools } from "@/components/AnonymizationTools";

const DataProviderDashboard = () => {
  const [uploadedFiles, setUploadedFiles] = useState([
    {
      id: 1,
      name: "Farm Data Sept 2024",
      size: "2.4 MB",
      status: "submitted",
      anonymizedAt: "2024-01-13",
      submittedAt: "2024-01-14",
    },
    {
      id: 2,
      name: "Farm Data March 2025",
      size: "5.1 MB", 
      status: "submitted",
      anonymizedAt: "2024-01-12",
      submittedAt: "2024-01-13",
    },
    {
      id: 3,
      name: "Farm Data Sept 2025",
      size: "1.8 MB",
      status: "anonymized",
      anonymizedAt: null,
      submittedAt: null,
    },
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "anonymized":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "pending":
        return <Clock className="h-4 w-4 text-warning" />;
      case "submitted":
        return <Send className="h-4 w-4 text-primary" />;
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      anonymized: "default",
      pending: "secondary", 
      submitted: "outline",
    };
    return (
      <Badge variant={variants[status] || "secondary"} className="capitalize">
        {status}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background p-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl font-bold">Data Provider Dashboard</h1>
            </div>
            <Button 
              variant="outline" 
              onClick={() => window.location.href = "/"}
              className="flex items-center gap-2"
            >
              Log Out
            </Button>
          </div>
          <p className="text-muted-foreground">
            Upload files, apply anonymization, and submit to certifiers
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Upload className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-muted-foreground">Files Uploaded</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Shield className="h-8 w-8 text-success" />
                <div>
                  <p className="text-2xl font-bold">2</p>
                  <p className="text-sm text-muted-foreground">Anonymized</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Send className="h-8 w-8 text-accent" />
                <div>
                  <p className="text-2xl font-bold">1</p>
                  <p className="text-sm text-muted-foreground">Submitted</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Clock className="h-8 w-8 text-warning" />
                <div>
                  <p className="text-2xl font-bold">1</p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload">Upload Files</TabsTrigger>
            <TabsTrigger value="anonymize">Anonymize Data</TabsTrigger>
            <TabsTrigger value="manage">Manage Files</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload New Files
                </CardTitle>
                <CardDescription>
                  Select files to upload for anonymization and certification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUploadZone />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="anonymize" className="space-y-6">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Anonymization Tools
                </CardTitle>
                <CardDescription>
                  Apply anonymization techniques to protect sensitive data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AnonymizationTools />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manage" className="space-y-6">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  File Management
                </CardTitle>
                <CardDescription>
                  View and manage your uploaded files
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {uploadedFiles.map((file) => (
                    <Card key={file.id} className="border shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {getStatusIcon(file.status)}
                            <div>
                              <p className="font-medium">{file.name}</p>
                              <p className="text-sm text-muted-foreground">{file.size}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            {getStatusBadge(file.status)}
                            {file.status === "anonymized" && (
                              <Button size="sm" className="bg-gradient-primary">
                                Submit to Certifier
                              </Button>
                            )}
                            {file.status === "pending" && (
                              <Button size="sm" variant="outline">
                                Anonymize
                              </Button>
                            )}
                          </div>
                        </div>
                        
                        {file.anonymizedAt && (
                          <div className="mt-3 pt-3 border-t">
                            <p className="text-xs text-muted-foreground">
                              Anonymized on {file.anonymizedAt}
                              {file.submittedAt && ` • Submitted on ${file.submittedAt}`}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DataProviderDashboard;