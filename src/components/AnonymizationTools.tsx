import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Shield, Wand2, Save } from "lucide-react";
import { toast } from "sonner";

export const AnonymizationTools = () => {
  const [selectedFile, setSelectedFile] = useState("Farm Data Sept 2025");
  const [previewMode, setPreviewMode] = useState<"original" | "anonymized">("original");
  const [anonymizationRules, setAnonymizationRules] = useState([
    { field: "email", method: "mask", pattern: "***@***.com" },
    { field: "phone", method: "replace", pattern: "XXX-XXX-XXXX" },
    { field: "ssn", method: "encrypt", pattern: "ENCRYPTED_ID" },
  ]);

  const sampleData = {
    original: `Name,Email,Phone,SSN,Address
John Doe,john.doe@email.com,555-123-4567,123-45-6789,123 Main St
Jane Smith,jane.smith@email.com,555-987-6543,987-65-4321,456 Oak Ave
Bob Johnson,bob.johnson@email.com,555-456-7890,456-78-9012,789 Pine Rd`,
    anonymized: `Name,Email,Phone,SSN,Address
John D***,***@***.com,XXX-XXX-XXXX,ENCRYPTED_ID,123 ****** St
Jane S***,***@***.com,XXX-XXX-XXXX,ENCRYPTED_ID,456 *** Ave
Bob J***,***@***.com,XXX-XXX-XXXX,ENCRYPTED_ID,789 **** Rd`,
  };

  const handleApplyAnonymization = () => {
    toast.success("Anonymization rules applied successfully!");
    setPreviewMode("anonymized");
  };

  const handleSaveRules = () => {
    toast.success("Anonymization rules saved!");
  };

  return (
    <div className="space-y-6">
      {/* File Selection */}
      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle className="text-lg">Select File to Anonymize</CardTitle>
          <CardDescription>Choose a file from your uploads</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {["Farm Data Sept 2024", "Farm Data March 2025", "Farm Data Sept 2025"].map((file) => (
              <div
                key={file}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedFile === file
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => setSelectedFile(file)}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{file}</span>
                  {selectedFile === file && <Badge>Selected</Badge>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Anonymization Rules */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Anonymization Rules
            </CardTitle>
            <CardDescription>Configure how sensitive data should be handled</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {anonymizationRules.map((rule, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="grid gap-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs">Field</Label>
                      <Input value={rule.field} className="h-8" readOnly />
                    </div>
                    <div>
                      <Label className="text-xs">Method</Label>
                      <Input value={rule.method} className="h-8" readOnly />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs">Pattern</Label>
                    <Input value={rule.pattern} className="h-8" readOnly />
                  </div>
                </div>
              </div>
            ))}
            
            <Separator />
            
            <div className="flex gap-2">
              <Button onClick={handleApplyAnonymization} className="bg-gradient-primary">
                <Wand2 className="h-4 w-4 mr-2" />
                Apply Rules
              </Button>
              <Button variant="outline" onClick={handleSaveRules}>
                <Save className="h-4 w-4 mr-2" />
                Save Rules
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Data Preview */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  Data Preview
                </CardTitle>
                <CardDescription>View original vs anonymized data</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={previewMode === "original" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPreviewMode("original")}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Original
                </Button>
                <Button
                  variant={previewMode === "anonymized" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPreviewMode("anonymized")}
                >
                  <EyeOff className="h-4 w-4 mr-1" />
                  Anonymized
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/50 rounded-lg p-4">
              <Textarea
                value={sampleData[previewMode]}
                readOnly
                className="min-h-[200px] font-mono text-sm"
              />
            </div>
            
            {previewMode === "anonymized" && (
              <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg">
                <div className="flex items-center gap-2 text-success">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm font-medium">Data Anonymized</span>
                </div>
                <p className="text-xs text-success/80 mt-1">
                  Sensitive information has been masked and encrypted
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};