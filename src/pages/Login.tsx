import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield } from "lucide-react";
const Login = () => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginId.trim()) {
      return;
    }
    const firstLetter = loginId.charAt(0).toUpperCase();
    if (firstLetter === "D") {
      window.location.href = "/provider";
    } else if (firstLetter === "C") {
      window.location.href = "/certifier";
    }
  };
  return <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background flex items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-elegant">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-4 rounded-2xl bg-primary/10 shadow-glow">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Evidence-to-Claims Engine</CardTitle>
          <CardDescription className="text-base">Please sign in to access data/reports</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="loginId">Login ID</Label>
              <Input id="loginId" type="text" placeholder="Enter your login ID" value={loginId} onChange={e => setLoginId(e.target.value)} required />
              <p className="text-xs text-muted-foreground">Use the account name provided in your Welcome email</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>;
};
export default Login;