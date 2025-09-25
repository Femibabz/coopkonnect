"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MainLayout } from "@/components/layout/main-layout";
import { UserRole, User, Society, DashboardStats, Loan, LoanStatus, Application, ApplicationStatus } from "@/lib/types";
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
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  Send,
  Settings,
  Download,
  Upload,
  Search,
  Filter,
  Plus
} from "lucide-react";

export default function SocietyDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

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

  const mockUser: User = {
    id: "1",
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

  const mockLoanApplications: Loan[] = [
    {
      id: "1",
      memberId: "mem1",
      amount: 50000,
      interestRate: 2.5,
      termMonths: 12,
      status: LoanStatus.PENDING,
      appliedDate: new Date(),
      monthlyPayment: 4500,
      totalInterest: 7500,
      remainingBalance: 50000,
      purpose: "Business expansion",
      documents: ["business_plan.pdf", "bank_statement.pdf"],
    },
    {
      id: "2",
      memberId: "mem2",
      amount: 75000,
      interestRate: 2.5,
      termMonths: 12,
      status: LoanStatus.PENDING,
      appliedDate: new Date(),
      monthlyPayment: 6750,
      totalInterest: 11250,
      remainingBalance: 75000,
      purpose: "Education",
      documents: ["admission_letter.pdf", "fee_schedule.pdf"],
    }
  ];

  const mockMemberApplications: Application[] = [
    {
      id: "1",
      societyId: "1",
      applicantEmail: "john.doe@email.com",
      firstName: "John",
      lastName: "Doe",
      phone: "+234-801-111-2222",
      address: "123 Main Street, Lagos",
      occupation: "Teacher",
      isReapplication: false,
      previousApplications: [],
      documents: ["id_card.pdf", "bank_statement.pdf"],
      letterOfIntent: "letter_of_intent.pdf",
      policyAccepted: true,
      status: ApplicationStatus.PENDING,
      appliedDate: new Date(),
    },
    {
      id: "2",
      societyId: "1",
      applicantEmail: "jane.smith@email.com",
      firstName: "Jane",
      lastName: "Smith",
      phone: "+234-802-333-4444",
      address: "456 Oak Avenue, Lagos",
      occupation: "Administrator",
      isReapplication: false,
      previousApplications: [],
      documents: ["passport.pdf", "bank_statement.pdf"],
      letterOfIntent: "letter_of_intent.pdf",
      policyAccepted: true,
      status: ApplicationStatus.PENDING,
      appliedDate: new Date(),
    }
  ];

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Members</p>
                <p className="text-3xl font-bold text-blue-600">{mockStats.totalMembers}</p>
                <p className="text-xs text-green-600">+12 this month</p>
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
                <p className="text-xs text-orange-600">₦{(mockStats.activeLoans * 45000).toLocaleString()}</p>
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
                <p className="text-xs text-green-600">+₦250K this month</p>
              </div>
              <PiggyBank className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Collection</p>
                <p className="text-2xl font-bold text-purple-600">₦{(mockStats.monthlyCollection / 1000000).toFixed(1)}M</p>
                <p className="text-xs text-purple-600">Target: ₦2.5M</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts and Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Important Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <p className="font-medium text-red-800">3 Defaulted Loans</p>
                <p className="text-sm text-red-600">Members with overdue loan payments requiring attention</p>
              </div>
              <Button size="sm" variant="outline" className="ml-auto">
                Review
              </Button>
            </div>

            <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <Clock className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-800">12 Pending Applications</p>
                <p className="text-sm text-yellow-600">New member applications awaiting approval</p>
              </div>
              <Button size="sm" variant="outline" className="ml-auto">
                Process
              </Button>
            </div>

            <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <Calendar className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <p className="font-medium text-blue-800">Monthly Meeting Due</p>
                <p className="text-sm text-blue-600">March meeting scheduled for March 15th - Prepare agenda</p>
              </div>
              <Button size="sm" variant="outline" className="ml-auto">
                Prepare
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Button className="h-20 flex flex-col items-center justify-center space-y-2">
          <Send className="h-6 w-6" />
          <span>Send Announcement</span>
        </Button>
        <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2" asChild>
          <a href="/society/invite">
            <Users className="h-6 w-6" />
            <span>Invite Members</span>
          </a>
        </Button>
        <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
          <CreditCard className="h-6 w-6" />
          <span>Process Loans</span>
        </Button>
        <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
          <DollarSign className="h-6 w-6" />
          <span>Financial Report</span>
        </Button>
      </div>
    </div>
  );

  const MemberApplicationsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Member Applications</h2>
          <p className="text-gray-600">Review and approve new member applications</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Occupation</TableHead>
                <TableHead>Applied Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockMemberApplications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{application.firstName} {application.lastName}</p>
                      <p className="text-sm text-gray-500">{application.applicantEmail}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{application.phone}</p>
                      <p className="text-xs text-gray-500">{application.address}</p>
                    </div>
                  </TableCell>
                  <TableCell>{application.occupation}</TableCell>
                  <TableCell>{application.appliedDate.toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={application.status === ApplicationStatus.PENDING ? "outline" : "default"}>
                      {application.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive">
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const LoanManagementTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Loan Management</h2>
          <p className="text-gray-600">Review and approve loan applications</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Loan Settings
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Manual Loan Entry
          </Button>
        </div>
      </div>

      {/* Loan Settings Card */}
      <Card>
        <CardHeader>
          <CardTitle>Current Loan Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-sm font-medium">Interest Rate</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input value={mockSociety.interestRate} className="w-20" />
                <span className="text-sm">% per month</span>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium">Maximum Term</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input value={mockSociety.loanTermMonths} className="w-20" />
                <span className="text-sm">months</span>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium">Min. Membership</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input value={mockSociety.minimumMembershipMonths} className="w-20" />
                <span className="text-sm">months</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loan Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Loan Applications</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Monthly Payment</TableHead>
                <TableHead>Applied Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLoanApplications.map((loan) => (
                <TableRow key={loan.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">Member #{loan.memberId}</p>
                      <p className="text-sm text-gray-500">View Profile</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">₦{loan.amount.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">{loan.termMonths} months @ {loan.interestRate}%</p>
                    </div>
                  </TableCell>
                  <TableCell>{loan.purpose}</TableCell>
                  <TableCell>₦{loan.monthlyPayment.toLocaleString()}</TableCell>
                  <TableCell>{loan.appliedDate.toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{loan.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive">
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const AnnouncementsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Announcements</h2>
          <p className="text-gray-600">Send announcements to society members</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Announcement
        </Button>
      </div>

      {/* Create Announcement Form */}
      <Card>
        <CardHeader>
          <CardTitle>Create New Announcement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Enter announcement title" />
          </div>

          <div>
            <Label htmlFor="content">Message</Label>
            <textarea
              id="content"
              className="w-full p-3 border rounded-md"
              rows={4}
              placeholder="Enter your announcement message"
            />
          </div>

          <div>
            <Label htmlFor="audience">Target Audience</Label>
            <select className="w-full p-3 border rounded-md">
              <option>All Members</option>
              <option>Specific Members</option>
              <option>Committee Members Only</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="important" />
            <Label htmlFor="important">Mark as Important</Label>
          </div>

          <div className="flex gap-2">
            <Button>Send Now</Button>
            <Button variant="outline">Save Draft</Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Announcements */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Announcements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                title: "Monthly Meeting Reminder",
                content: "Don't forget about our monthly meeting on March 15th at 2:00 PM",
                date: "2 hours ago",
                audience: "All Members"
              },
              {
                title: "New Interest Rate",
                content: "Loan interest rate has been adjusted to 2.5% effective April 1st",
                date: "1 day ago",
                audience: "All Members"
              },
              {
                title: "Committee Meeting",
                content: "Executive committee meeting scheduled for March 10th",
                date: "3 days ago",
                audience: "Committee Members"
              }
            ].map((announcement, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold">{announcement.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{announcement.content}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-gray-500">{announcement.date}</span>
                      <Badge variant="outline" className="text-xs">
                        {announcement.audience}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Society Dashboard</h1>
              <p className="text-gray-600">Welcome back, {mockUser.firstName}!</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="px-3 py-1">
                {mockUser.role.replace('_', ' ').toUpperCase()}
              </Badge>
              <Button variant="outline">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="loans">Loans</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab />
          </TabsContent>

          <TabsContent value="applications">
            <MemberApplicationsTab />
          </TabsContent>

          <TabsContent value="loans">
            <LoanManagementTab />
          </TabsContent>

          <TabsContent value="announcements">
            <AnnouncementsTab />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
