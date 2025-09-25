"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MainLayout } from "@/components/layout/main-layout";
import { Shield, Building, Users, ArrowRight, Lock, Settings, CreditCard } from "lucide-react";

export default function LoginPortalPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mx-auto mb-6 p-4 bg-blue-100 rounded-full w-fit">
              <Lock className="h-12 w-12 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Coopkonnect</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose your login portal based on your role in the cooperative ecosystem
            </p>
          </div>

          {/* Login Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">

            {/* Coopkonnect Admin */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-red-200 bg-gradient-to-br from-red-50 to-red-100">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-red-100 rounded-full w-fit group-hover:bg-red-200 transition-colors">
                  <Shield className="h-10 w-10 text-red-600" />
                </div>
                <CardTitle className="text-2xl text-red-800">Platform Admin</CardTitle>
                <CardDescription className="text-red-600">
                  For Coopkonnect administrators
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="space-y-3 text-sm text-red-700">
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    <span>Manage society applications</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span>Platform administration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    <span>System oversight</span>
                  </div>
                </div>

                <Button asChild className="w-full bg-red-600 hover:bg-red-700 group-hover:scale-105 transition-transform">
                  <Link href="/login?role=admin" className="flex items-center justify-center gap-2">
                    Admin Login
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>

                <p className="text-xs text-red-500 italic">
                  For Coopkonnect staff only
                </p>
              </CardContent>
            </Card>

            {/* Society Representative */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 ring-2 ring-blue-200">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-blue-100 rounded-full w-fit group-hover:bg-blue-200 transition-colors">
                  <Building className="h-10 w-10 text-blue-600" />
                </div>
                <CardTitle className="text-2xl text-blue-800">Society Representative</CardTitle>
                <CardDescription className="text-blue-600">
                  For society presidents, secretaries & treasurers
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="space-y-3 text-sm text-blue-700">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>Manage society members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    <span>Process loans & savings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    <span>Society administration</span>
                  </div>
                </div>

                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 group-hover:scale-105 transition-transform">
                  <Link href="/login?role=society" className="flex items-center justify-center gap-2">
                    Society Login
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>

                <p className="text-xs text-blue-500 italic">
                  Most commonly used portal
                </p>
              </CardContent>
            </Card>

            {/* Society Member */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-green-200 bg-gradient-to-br from-green-50 to-green-100">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-green-100 rounded-full w-fit group-hover:bg-green-200 transition-colors">
                  <Users className="h-10 w-10 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-green-800">Society Member</CardTitle>
                <CardDescription className="text-green-600">
                  For cooperative society members
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="space-y-3 text-sm text-green-700">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    <span>View loans & savings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>Apply for loans</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    <span>Track transactions</span>
                  </div>
                </div>

                <Button asChild className="w-full bg-green-600 hover:bg-green-700 group-hover:scale-105 transition-transform">
                  <Link href="/login?role=member" className="flex items-center justify-center gap-2">
                    Member Login
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>

                <p className="text-xs text-green-500 italic">
                  For society members
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Help Section */}
          <div className="mt-16 text-center">
            <Card className="max-w-2xl mx-auto bg-gray-50 border-gray-200">
              <CardContent className="p-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help Choosing?</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <p><strong>Platform Admin:</strong> If you work for Coopkonnect and manage society applications</p>
                  <p><strong>Society Representative:</strong> If you're a president, secretary, or treasurer of a cooperative society</p>
                  <p><strong>Society Member:</strong> If you're a member of a cooperative society looking to access your account</p>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    Don't have an account?
                    <Link href="/society-registration" className="text-blue-600 hover:text-blue-700 ml-1">
                      Register your society
                    </Link> or contact your society representative to join as a member.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-8">
            <Button asChild variant="outline" className="px-8">
              <Link href="/">← Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
