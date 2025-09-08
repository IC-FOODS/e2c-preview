import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, Download, CheckCircle, Clock, FileCheck, BarChart3, Shield } from "lucide-react";
import { ReportGenerator } from "@/components/ReportGenerator";
const CertifierDashboard = () => {
  const [submittedFiles, setSubmittedFiles] = useState([{
    id: 1,
    name: "a1b2c3d4e5f6.csv",
    provider: "DataCorp Inc.",
    submittedAt: "9/8/25",
    size: "2.4 MB",
    status: "pending",
    anonymizationScore: 95,
    selected: false
  }, {
    id: 2,
    name: "7f8e9d0c1b2a.json",
    provider: "TechStart LLC",
    submittedAt: "8/28/25",
    size: "1.8 MB",
    status: "reviewed",
    anonymizationScore: 87,
    selected: false
  }, {
    id: 3,
    name: "3c4d5e6f7a8b.xlsx",
    provider: "FinanceHub",
    submittedAt: "8/15/25",
    size: "4.2 MB",
    status: "certified",
    anonymizationScore: 92,
    selected: false
  }, {
    id: 4,
    name: "9e0f1a2b3c4d.pdf",
    provider: "SecureData Corp",
    submittedAt: "8/3/25",
    size: "3.1 MB",
    status: "pending",
    anonymizationScore: 88,
    selected: false
  }]);
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);
  const handleFileSelection = (fileId: number, checked: boolean) => {
    if (checked) {
      setSelectedFiles(prev => [...prev, fileId]);
    } else {
      setSelectedFiles(prev => prev.filter(id => id !== fileId));
    }
    setSubmittedFiles(prev => prev.map(file => file.id === fileId ? {
      ...file,
      selected: checked
    } : file));
  };
  const getStatusBadge = (status: string) => {
    const config = {
      pending: {
        variant: "secondary" as const,
        color: "text-warning"
      },
      reviewed: {
        variant: "default" as const,
        color: "text-primary"
      },
      certified: {
        variant: "outline" as const,
        color: "text-success"
      }
    };
    return <Badge variant={config[status]?.variant || "secondary"} className="capitalize">
        {status}
      </Badge>;
  };
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 75) return "text-warning";
    return "text-destructive";
  };
  const totalFiles = submittedFiles.length;
  const certifiedFiles = submittedFiles.filter(f => f.status === "certified").length;
  return <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background p-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-accent/10">
                <FileCheck className="h-6 w-6 text-accent" />
              </div>
              <h1 className="text-3xl font-bold">Certifier Dashboard</h1>
            </div>
            <Button variant="outline" onClick={() => window.location.href = "/"} className="flex items-center gap-2">
              Log Out
            </Button>
          </div>
          <p className="text-muted-foreground">
            Review submitted data and generate compliance reports
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{totalFiles}</p>
                  <p className="text-sm text-muted-foreground">Files Submitted</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-success" />
                <div>
                  <p className="text-2xl font-bold">{certifiedFiles}</p>
                  <p className="text-sm text-muted-foreground">Certified</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="review" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="review">Review Files</TabsTrigger>
            <TabsTrigger value="generate">Generate Report</TabsTrigger>
            <TabsTrigger value="history">Report History</TabsTrigger>
          </TabsList>

          <TabsContent value="review" className="space-y-6">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Submitted Files
                </CardTitle>
                <CardDescription>
                  Review and select files for certification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {submittedFiles.map(file => <Card key={file.id} className="border shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <Checkbox checked={file.selected} onCheckedChange={checked => handleFileSelection(file.id, checked as boolean)} />
                          
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5 text-muted-foreground" />
                                <div>
                                  <p className="font-medium">{file.name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    by {file.provider} • {file.size}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-3">
                                
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>Submitted on {file.submittedAt}</span>
                              <div className="flex gap-2">
                                {file.status === "pending" && (
                                  <>
                                    {getStatusBadge(file.status)}
                                    <Button size="sm" className="bg-gradient-primary">
                                      Review
                                    </Button>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>)}
                </div>
                
                {selectedFiles.length > 0 && <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-primary">
                          {selectedFiles.length} file(s) selected for report generation
                        </p>
                        <p className="text-sm text-primary/80">
                          Ready to generate compliance report
                        </p>
                      </div>
                      <Button className="bg-gradient-primary">
                        Generate Report
                      </Button>
                    </div>
                  </div>}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="generate" className="space-y-6">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Report Generation
                </CardTitle>
                <CardDescription>
                  Create comprehensive compliance reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ReportGenerator selectedFiles={selectedFiles} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Report History
                </CardTitle>
                <CardDescription>
                  View previously generated reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No reports generated yet</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Reports will appear here after generation
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>;
};
export default CertifierDashboard;