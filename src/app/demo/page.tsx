"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MainLayout } from "@/components/layout/main-layout";
import { UserRole, User, Society, DashboardStats } from "@/lib/types";
import {
  Building2,
  Users,
  CreditCard,
  PiggyBank,
  TrendingUp,
  AlertCircle,
  Bell,
  Calendar,
  FileText,
  DollarSign
} from "lucide-react";

export default function DemoPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.SOCIETY_MEMBER);

  // Mock data
  const mockSociety: Society = {
    id: "1",
    name: "Lagos Teachers Cooperative Society",
    description: "A cooperative society for educators in Lagos State",
    logo: "/api/placeholder/64/64",
    banner: "/api/placeholder/800/200",
    address: "123 Education Avenue, Lagos",
    phone: "+234-801-234-5678",
    email: "info@lagoseducators.coop",
    bankAccount: {
      bankName: "First Bank Nigeria",
      accountNumber: "1234567890",
      accountName: "Lagos Teachers Cooperative Society"
    },
    isActive: true,
    interestRate: 2.5,
    loanTermMonths: 12,
    minimumMembershipMonths: 6,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const mockMemberUser: User = {
    id: "1",
    email: "john.doe@example.com",
    firstName: "John",
    lastName: "Doe",
    phone: "+234-801-234-5678",
    role: UserRole.SOCIETY_MEMBER,
    societyId: "1",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const mockPresidentUser: User = {
    id: "2",
    email: "president@lagoseducators.coop",
    firstName: "Sarah",
    lastName: "Johnson",
    phone: "+234-801-234-5678",
    role: UserRole.SOCIETY_PRESIDENT,
    societyId: "1",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const mockStats: DashboardStats = {
    totalMembers: 245,
    activeLoans: 45,
    totalSavings: 12500000,
    totalShares: 8750000,
    pendingApplications: 12,
    defaultedLoans: 3,
    monthlyCollection: 2350000
  };

  // Member Dashboard Content
  const MemberDashboard = () => (
    <div className="space-y-6">
      {/* Account Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Savings Balance</p>
                <p className="text-2xl font-bold text-green-600">₦125,000</p>
              </div>
              <PiggyBank className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Shares Value</p>
                <p className="text-2xl font-bold text-blue-600">₦87,500</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Outstanding Loan</p>
                <p className="text-2xl font-bold text-red-600">₦45,000</p>
              </div>
              <CreditCard className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Interest Due</p>
                <p className="text-2xl font-bold text-orange-600">₦1,125</p>
              </div>
              <AlertCircle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Important Notices */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Important Announcements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm font-medium text-yellow-800">Monthly Meeting Reminder</p>
              <p className="text-sm text-yellow-700">Don't forget about our monthly meeting on March 15th at 2:00 PM</p>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-medium text-blue-800">New Interest Rate</p>
              <p className="text-sm text-blue-700">Loan interest rate has been adjusted to 2.5% effective April 1st</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <CreditCard className="h-12 w-12 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Apply for Loan</h3>
            <p className="text-sm text-gray-600">Submit a new loan application</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <PiggyBank className="h-12 w-12 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Request Withdrawal</h3>
            <p className="text-sm text-gray-600">Withdraw from savings or shares</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <Calendar className="h-12 w-12 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Meeting Permission</h3>
            <p className="text-sm text-gray-600">Request permission to skip meeting</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Society Admin Dashboard Content
  const SocietyAdminDashboard = () => (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Members</p>
                <p className="text-3xl font-bold text-blue-600">{mockStats.totalMembers}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Loans</p>
                <p className="text-3xl font-bold text-orange-600">{mockStats.activeLoans}</p>
              </div>
              <CreditCard className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Savings</p>
                <p className="text-2xl font-bold text-green-600">₦{(mockStats.totalSavings / 1000000).toFixed(1)}M</p>
              </div>
              <PiggyBank className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Applications</p>
                <p className="text-3xl font-bold text-purple-600">{mockStats.pendingApplications}</p>
              </div>
              <FileText className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Loan Applications</CardTitle>
            <CardDescription>Applications requiring approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "Michael Johnson", amount: "₦50,000", date: "2 hours ago" },
                { name: "Grace Okafor", amount: "₦75,000", date: "1 day ago" },
                { name: "David Adebayo", amount: "₦30,000", date: "2 days ago" }
              ].map((loan, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{loan.name}</p>
                    <p className="text-sm text-gray-600">{loan.amount}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{loan.date}</p>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Membership Applications</CardTitle>
            <CardDescription>New member applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "Jennifer Okafor", email: "j.okafor@email.com", date: "1 hour ago" },
                { name: "Emmanuel Bright", email: "e.bright@email.com", date: "3 hours ago" },
                { name: "Fatima Ahmed", email: "f.ahmed@email.com", date: "1 day ago" }
              ].map((application, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{application.name}</p>
                    <p className="text-sm text-gray-600">{application.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{application.date}</p>
                    <Badge variant="outline">Review</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Button className="h-16 flex flex-col items-center justify-center space-y-2">
          <Users className="h-6 w-6" />
          <span>Manage Members</span>
        </Button>
        <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-2">
          <CreditCard className="h-6 w-6" />
          <span>Process Loans</span>
        </Button>
        <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-2">
          <Bell className="h-6 w-6" />
          <span>Send Announcement</span>
        </Button>
        <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-2">
          <DollarSign className="h-6 w-6" />
          <span>Financial Reports</span>
        </Button>
      </div>
    </div>
  );

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Experience Coopkonnect
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore how different user types interact with the platform.
            See the member experience and society administration features.
          </p>
        </div>

        {/* Role Selector */}
        <div className="mb-8">
          <Tabs value={selectedRole} onValueChange={(value) => setSelectedRole(value as UserRole)}>
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value={UserRole.SOCIETY_MEMBER}>Member View</TabsTrigger>
              <TabsTrigger value={UserRole.SOCIETY_PRESIDENT}>Admin View</TabsTrigger>
            </TabsList>

            <TabsContent value={UserRole.SOCIETY_MEMBER} className="mt-8">
              <Card className="mb-6">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      JD
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Welcome back, John Doe</CardTitle>
                      <CardDescription className="text-lg">
                        Member of {mockSociety.name} • Member since Jan 2023
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
              <MemberDashboard />
            </TabsContent>

            <TabsContent value={UserRole.SOCIETY_PRESIDENT} className="mt-8">
              <Card className="mb-6">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      SJ
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Welcome, Sarah Johnson</CardTitle>
                      <CardDescription className="text-lg">
                        President of {mockSociety.name} • Society Admin
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
              <SocietyAdminDashboard />
            </TabsContent>
          </Tabs>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-6">
            Contact us to set up your society on the Coopkonnect platform
          </p>
          <div className="space-x-4">
            <Button size="lg" variant="secondary">
              Contact Sales
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
