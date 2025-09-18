import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Upload, FileCheck, Users, Database, Lock } from "lucide-react";

const Home = () => {
  const handleRoleSelect = (role: "provider" | "certifier") => {
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8 flex justify-center">
              <div className="p-4 rounded-2xl bg-primary/10 shadow-glow">
                <Shield className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Evidence-to-Claims Engine
            </h1>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Upload and certify producer data with complete data privacy. 
              Check agricultural data against certification requirements.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <Card 
                className="cursor-pointer transition-all duration-300 hover:shadow-elegant hover:-translate-y-2 border-2 hover:border-primary/50"
                onClick={() => handleRoleSelect("provider")}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 rounded-xl bg-primary/10">
                    <Upload className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Data Provider</CardTitle>
                  <CardDescription className="text-base">
                    Upload and anonymize your data files before submission
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300">
                    Continue as Provider
                  </Button>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer transition-all duration-300 hover:shadow-elegant hover:-translate-y-2 border-2 hover:border-accent/50"
                onClick={() => handleRoleSelect("certifier")}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 rounded-xl bg-accent/10">
                    <FileCheck className="h-8 w-8 text-accent" />
                  </div>
                  <CardTitle className="text-2xl">Certifier</CardTitle>
                  <CardDescription className="text-base">
                    Review submitted data and generate compliance reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300">
                    Continue as Certifier
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Platform Features</h2>
            <p className="text-muted-foreground text-lg">
              Everything you need for secure data anonymization and certification
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-card border-0">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-xl bg-primary/10">
                  <Lock className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Advanced Anonymization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Intelligent data masking and redaction tools to protect sensitive information
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card border-0">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-xl bg-accent/10">
                  <Database className="h-8 w-8 text-accent" />
                </div>
                <CardTitle>Secure Storage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Encrypted file storage with complete audit trails and version control
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card border-0">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-xl bg-success/10">
                  <Users className="h-8 w-8 text-success" />
                </div>
                <CardTitle>Role-Based Access</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Separate workflows for data providers and certifiers with proper permissions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;