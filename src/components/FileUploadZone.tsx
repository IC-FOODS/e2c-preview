import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, File, CheckCircle, X } from "lucide-react";
import { toast } from "sonner";

interface UploadedFile {
  id: string;
  file: File;
  progress: number;
  status: "uploading" | "completed" | "error";
}

export const FileUploadZone = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      progress: 0,
      status: "uploading" as const,
    }));

    setUploadedFiles((prev) => [...prev, ...newFiles]);

    // Simulate file upload
    newFiles.forEach((uploadFile) => {
      simulateUpload(uploadFile.id);
    });

    toast.success(`${acceptedFiles.length} file(s) started uploading`);
  }, []);

  const simulateUpload = (fileId: string) => {
    const interval = setInterval(() => {
      setUploadedFiles((prev) =>
        prev.map((file) => {
          if (file.id === fileId) {
            const newProgress = file.progress + Math.random() * 30;
            if (newProgress >= 100) {
              clearInterval(interval);
              toast.success("File uploaded successfully!");
              return { ...file, progress: 100, status: "completed" };
            }
            return { ...file, progress: newProgress };
          }
          return file;
        })
      );
    }, 200);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "application/json": [".json"],
      "text/plain": [".txt"],
      "application/pdf": [".pdf"],
    },
    maxSize: 50 * 1024 * 1024, // 50MB
  });

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
          isDragActive
            ? "border-primary bg-primary/5 shadow-glow"
            : "border-border hover:border-primary/50 hover:bg-muted/50"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 rounded-full bg-primary/10">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <div>
            <p className="text-lg font-medium mb-2">
              {isDragActive ? "Drop files here" : "Drag & drop files here"}
            </p>
            <p className="text-muted-foreground mb-4">
              or click to browse your computer
            </p>
            <Button variant="outline" className="mb-2">
              Choose Files
            </Button>
            <p className="text-xs text-muted-foreground">
              Supported formats: CSV, XLSX, JSON, TXT, PDF (max 50MB)
            </p>
          </div>
        </div>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-medium">Uploaded Files</h3>
          {uploadedFiles.map((uploadFile) => (
            <div
              key={uploadFile.id}
              className="flex items-center gap-3 p-4 bg-card rounded-lg border"
            >
              <File className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{uploadFile.file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(uploadFile.file.size / 1024 / 1024).toFixed(2)} MB
                </p>
                {uploadFile.status === "uploading" && (
                  <Progress value={uploadFile.progress} className="mt-2" />
                )}
              </div>
              <div className="flex items-center gap-2">
                {uploadFile.status === "completed" && (
                  <CheckCircle className="h-5 w-5 text-success" />
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(uploadFile.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};