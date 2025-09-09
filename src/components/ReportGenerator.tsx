import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge"; 
import { FileText, Download, Send, CheckCircle, AlertCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

interface ReportGeneratorProps {
  selectedFiles: number[];
}

export const ReportGenerator = ({ selectedFiles }: ReportGeneratorProps) => {
  const [reportConfig, setReportConfig] = useState({
    title: "Findings Preview",
    template: "standard",
    includeCharts: true,
    includeDetails: true,
  });

  // Sample tabular data for preview
  const sampleData = [
    { id: 1, fileName: "a1b2c3d4e5f6", status: "Qualifies", score: 94, issues: 2 },
    { id: 2, fileName: "789abcdef012", status: "Qualifies", score: 91, issues: 3 },
    { id: 3, fileName: "345678abcdef", status: "Needs Review", score: 78, issues: 7 },
    { id: 4, fileName: "fedcba987654", status: "Qualifies", score: 88, issues: 4 },
    { id: 5, fileName: "123abc456def", status: "Disqualified", score: 65, issues: 12 },
    { id: 6, fileName: "987fed321cba", status: "Qualifies", score: 96, issues: 1 },
    { id: 7, fileName: "456def789abc", status: "Needs Review", score: 82, issues: 6 },
    { id: 8, fileName: "cba321fed987", status: "Qualifies", score: 93, issues: 2 },
    { id: 9, fileName: "def456abc123", status: "Qualifies", score: 89, issues: 4 },
    { id: 10, fileName: "fed987cba654", status: "Needs Review", score: 76, issues: 8 }
  ];
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedReport, setGeneratedReport] = useState<any>(null);

  const handleGenerateReport = async () => {
    if (selectedFiles.length === 0) {
      toast.error("Please select at least one file to generate a report");
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);

    // Simulate report generation
    const steps = [
      "Analyzing selected files...",
      "Calculating anonymization scores...",
      "Generating compliance metrics...",
      "Creating visualizations...",
      "Finalizing report...",
    ];

    for (let i = 0; i < steps.length; i++) {
      toast.info(steps[i]);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setGenerationProgress((i + 1) * 20);
    }

    // Mock generated report
    setGeneratedReport({
      id: "RPT-" + Date.now(),
      title: reportConfig.title,
      generatedAt: new Date().toISOString().split('T')[0],
      filesAnalyzed: selectedFiles.length,
      overallScore: 91,
      recommendations: [
        "Improve email anonymization patterns",
        "Consider additional encryption for sensitive fields",
        "Review data retention policies",
      ],
    });

    setIsGenerating(false);
    toast.success("Report generated successfully!");
  };

  if (generatedReport) {
    return (
      <div className="space-y-6">
        <Card className="shadow-card border-success/20 bg-success/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <CardTitle className="text-success">Report Generated Successfully</CardTitle>
            </div>
            <CardDescription>Your compliance report is ready for download</CardDescription>
          </CardHeader>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>{generatedReport.title}</CardTitle>
            <CardDescription>
              Generated on {generatedReport.generatedAt} • {generatedReport.filesAnalyzed} files analyzed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="text-center">
                  <p className="text-3xl font-bold text-success">{generatedReport.overallScore}%</p>
                  <p className="text-sm text-muted-foreground">Overall Compliance Score</p>
                </div>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">{generatedReport.filesAnalyzed}</p>
                  <p className="text-sm text-muted-foreground">Files Analyzed</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Key Recommendations</h4>
              <div className="space-y-2">
                {generatedReport.recommendations.map((rec: string, index: number) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <AlertCircle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button className="bg-gradient-primary">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline">
                <Send className="h-4 w-4 mr-2" />
                Share Report
              </Button>
              <Button variant="outline" onClick={() => setGeneratedReport(null)}>
                Generate New Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Report Configuration */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Report Configuration</CardTitle>
          <CardDescription>Customize your compliance report settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Report Title</Label>
              <Input
                id="title"
                value={reportConfig.title}
                onChange={(e) => setReportConfig(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            
            <div>
              <Label>Report Template</Label>
              <Select 
                value={reportConfig.template} 
                onValueChange={(value) => setReportConfig(prev => ({ ...prev, template: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard Compliance</SelectItem>
                  <SelectItem value="detailed">Detailed Analysis</SelectItem>
                  <SelectItem value="executive">Executive Summary</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Additional Comments</Label>
            <Textarea 
              placeholder="Add any specific notes or requirements for this report..."
              className="min-h-[80px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Findings Preview */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Findings Preview</CardTitle>
          <CardDescription>Sample compliance analysis results</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96 w-full border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Farm</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Compliance Score</TableHead>
                  <TableHead>Issues Found</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-medium">{row.fileName}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          row.status === "Qualifies" ? "outline" : 
                          row.status === "Needs Review" ? "secondary" : 
                          "destructive"
                        }
                        className={
                          row.status === "Qualifies" ? "bg-green-600 text-white border-green-600" : 
                          row.status === "Needs Review" ? "border-yellow-500 text-yellow-700 bg-yellow-50" : 
                          ""
                        }
                      >
                        {row.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{row.score}%</TableCell>
                    <TableCell>{row.issues}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">View Details</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Selected Files Summary */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Files to Analyze</CardTitle>
          <CardDescription>
            {selectedFiles.length} file(s) selected for analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          {selectedFiles.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedFiles.map((fileId) => (
                <Badge key={fileId} variant="outline">
                  File #{fileId}
                </Badge>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No files selected</p>
              <p className="text-sm text-muted-foreground">
                Go to the Review Files tab to select files for analysis
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Generation Progress */}
      {isGenerating && (
        <Card className="shadow-card border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <div>
                <p className="font-medium">Generating Report...</p>
                <p className="text-sm text-muted-foreground">Please wait while we analyze your data</p>
              </div>
              <Progress value={generationProgress} className="w-full" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Generate Button */}
      {!isGenerating && (
        <div className="flex justify-center">
          <Button 
            onClick={handleGenerateReport}
            disabled={selectedFiles.length === 0}
            className="bg-gradient-primary px-8 py-3 text-lg"
          >
            <FileText className="h-5 w-5 mr-2" />
            Generate Summary Report
          </Button>
        </div>
      )}
    </div>
  );
};