"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MainLayout } from "@/components/layout/main-layout";
import { useAuth } from "@/contexts/AuthContext";
import { Shield, Building, Users, ArrowLeft, AlertCircle } from "lucide-react";

type UserRole = 'admin' | 'society' | 'member';

const roleConfig = {
  admin: {
    title: "Platform Admin Login",
    description: "Access Coopkonnect administration dashboard",
    icon: Shield,
    color: "red",
    placeholder: "admin@coopkonnect.com",
    redirectPath: "/admin/dashboard"
  },
  society: {
    title: "Society Representative Login",
    description: "Access your society management dashboard",
    icon: Building,
    color: "blue",
    placeholder: "president@yoursociety.coop",
    redirectPath: "/society/dashboard"
  },
  member: {
    title: "Society Member Login",
    description: "Access your member account and services",
    icon: Users,
    color: "green",
    placeholder: "member@yoursociety.coop",
    redirectPath: "/member/dashboard"
  }
};

function LoginContent() {
  const searchParams = useSearchParams();
  const roleParam = searchParams.get('role') as UserRole;
  const [role, setRole] = useState<UserRole>(roleParam || 'society');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();

  useEffect(() => {
    if (roleParam && roleParam in roleConfig) {
      setRole(roleParam);
    }
  }, [roleParam]);

  const config = roleConfig[role];
  const IconComponent = config.icon;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await login(email, password);

    if (result.success) {
      // Redirect based on role
      window.location.href = config.redirectPath;
    } else {
      setError(result.error || "Login failed");
    }

    setLoading(false);
  };

  const getBgClass = () => {
    switch (config.color) {
      case 'red': return 'bg-gradient-to-br from-red-50 to-red-100';
      case 'blue': return 'bg-gradient-to-br from-blue-50 to-blue-100';
      case 'green': return 'bg-gradient-to-br from-green-50 to-green-100';
      default: return 'bg-gray-50';
    }
  };

  const getIconBgClass = () => {
    switch (config.color) {
      case 'red': return 'bg-red-100 text-red-600';
      case 'blue': return 'bg-blue-100 text-blue-600';
      case 'green': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getButtonClass = () => {
    switch (config.color) {
      case 'red': return 'bg-red-600 hover:bg-red-700';
      case 'blue': return 'bg-blue-600 hover:bg-blue-700';
      case 'green': return 'bg-green-600 hover:bg-green-700';
      default: return 'bg-gray-600 hover:bg-gray-700';
    }
  };

  return (
    <div className={`min-h-screen ${getBgClass()} flex items-center justify-center py-12`}>
      <div className="max-w-md w-full mx-4 space-y-6">

        {/* Back to Portal */}
        <div className="text-center">
          <Button asChild variant="outline" size="sm">
            <Link href="/login-portal" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Choose Different Role
            </Link>
          </Button>
        </div>

        {/* Login Card */}
        <Card className="border-2">
          <CardHeader className="text-center">
            <div className={`mx-auto mb-4 p-3 ${getIconBgClass()} rounded-full w-fit`}>
              <IconComponent className="h-8 w-8" />
            </div>
            <CardTitle className="text-2xl">{config.title}</CardTitle>
            <CardDescription>{config.description}</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={config.placeholder}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="mt-1"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <span className="text-sm text-red-700">{error}</span>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className={`w-full ${getButtonClass()}`}
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            {/* Role-specific help */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              {role === 'admin' && (
                <p className="text-xs text-gray-500 text-center">
                  For Coopkonnect platform administrators only.
                  <br />Default: admin@coopkonnect.com / admin123
                </p>
              )}
              {role === 'society' && (
                <p className="text-xs text-gray-500 text-center">
                  Don't have an account?
                  <Link href="/society-registration" className="text-blue-600 hover:text-blue-700 ml-1">
                    Register your society
                  </Link>
                  <br />Or contact support if you received an activation email.
                </p>
              )}
              {role === 'member' && (
                <p className="text-xs text-gray-500 text-center">
                  Contact your society representative to create a member account.
                  <br />You'll receive an invitation email with login instructions.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Test Credentials */}
        {(role === 'society' || role === 'admin') && (
          <Card className="border border-gray-200 bg-gray-50">
            <CardContent className="p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Test Credentials:</h4>
              <div className="text-xs space-y-1 text-gray-600">
                {role === 'admin' && (
                  <>
                    <p><strong>Admin:</strong> admin@coopkonnect.com / admin123</p>
                  </>
                )}
                {role === 'society' && (
                  <>
                    <p><strong>Demo Society:</strong> president@teacherscoop.com / society123</p>
                    <p className="text-gray-500 italic">Or use credentials from account activation</p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <MainLayout>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }>
        <LoginContent />
      </Suspense>
    </MainLayout>
  );
}
