"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MainLayout } from "@/components/layout/main-layout";
import { UserRole, User } from "@/lib/types";
import { useAuth } from "@/contexts/AuthContext";
import {
  getSocietyApplications,
  approveSocietyApplication,
  rejectSocietyApplication,
  suspendSociety,
  SocietyApplication,
  clearAllData,
  debugStoredData
} from "@/lib/data-service";
import {
  Building2,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Shield,
  Search,
  Filter,
  Download,
  Eye,
  AlertTriangle,
  Mail,
  Phone,
  MapPin,
  FileText,
  Calendar,
  TrendingUp,
  Activity
} from "lucide-react";

export default function CoopkonnectAdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApplication, setSelectedApplication] = useState<SocietyApplication | null>(null);
  const [applications, setApplications] = useState<SocietyApplication[]>([]);
  const [loading, setLoading] = useState(false);

  const { user, isLoading } = useAuth();

  // Redirect if not admin
  useEffect(() => {
    if (!isLoading && (!user || user.role !== UserRole.COOPKONNECT_ADMIN)) {
      window.location.href = '/login?redirect=/admin/dashboard';
    }
  }, [user, isLoading]);

  // Load applications on component mount
  useEffect(() => {
    if (user && user.role === UserRole.COOPKONNECT_ADMIN) {
      loadApplications();
    }
  }, [user]);

  const loadApplications = () => {
    console.log('🔄 Admin dashboard loading applications...');
    const data = getSocietyApplications();
    console.log('📊 Admin dashboard loaded applications:', data.length);
    console.log('📋 Applications data:', data);
    setApplications(data);
  };

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Show error if not authorized
  if (!user || user.role !== UserRole.COOPKONNECT_ADMIN) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Shield className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
            <p className="text-gray-600 mb-4">You need admin privileges to access this page.</p>
            <Button asChild>
              <a href="/login?redirect=/admin/dashboard">Login as Admin</a>
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  const handleApprove = async (applicationId: string) => {
    if (!user) return;

    setLoading(true);
    try {
      const result = approveSocietyApplication(applicationId, user.id);
      alert(`Society application approved successfully!

Society: ${result.society.name}
Activation Link Sent: An email with account setup instructions has been sent to the society representative.

The society representative has 72 hours to activate their account using the activation link.`);

      // Reload applications
      loadApplications();
      setSelectedApplication(null);
    } catch (error) {
      alert('Failed to approve application. Please try again.');
      console.error('Approval error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (applicationId: string) => {
    const reason = prompt("Please provide a reason for rejection:");
    if (!reason || !user) return;

    setLoading(true);
    try {
      rejectSocietyApplication(applicationId, user.id, reason);
      alert(`Society application rejected successfully. The applicant will be notified via email.`);

      // Reload applications
      loadApplications();
      setSelectedApplication(null);
    } catch (error) {
      alert('Failed to reject application. Please try again.');
      console.error('Rejection error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSuspend = async (societyId: string) => {
    const reason = prompt("Please provide a reason for suspension:");
    if (!reason || !user) return;

    setLoading(true);
    try {
      suspendSociety(societyId, user.id, reason);
      alert(`Society suspended successfully. All society members have been notified.`);

      // Reload applications
      loadApplications();
    } catch (error) {
      alert('Failed to suspend society. Please try again.');
      console.error('Suspension error:', error);
    } finally {
      setLoading(false);
    }
  };

  const OverviewTab = () => {
    const pendingCount = applications.filter(app => app.status === 'pending').length;
    const approvedCount = applications.filter(app => app.status === 'approved').length;
    const rejectedCount = applications.filter(app => app.status === 'rejected').length;
    const suspendedCount = applications.filter(app => app.status === 'suspended').length;

    return (
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Applications</p>
                  <p className="text-3xl font-bold text-orange-600">{pendingCount}</p>
                  <p className="text-xs text-orange-600">Requires review</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Societies</p>
                  <p className="text-3xl font-bold text-green-600">{approvedCount}</p>
                  <p className="text-xs text-green-600">Currently operating</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rejected Applications</p>
                  <p className="text-3xl font-bold text-red-600">{rejectedCount}</p>
                  <p className="text-xs text-red-600">Did not meet criteria</p>
                </div>
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Suspended Societies</p>
                  <p className="text-3xl font-bold text-yellow-600">{suspendedCount}</p>
                  <p className="text-xs text-yellow-600">Under review</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div className="flex-1">
                  <p className="font-medium">Society Approved</p>
                  <p className="text-sm text-gray-600">Artisan Workers Cooperative application approved</p>
                </div>
                <span className="text-xs text-gray-500">2 hours ago</span>
              </div>

              <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <Clock className="h-5 w-5 text-blue-500" />
                <div className="flex-1">
                  <p className="font-medium">New Application</p>
                  <p className="text-sm text-gray-600">Market Traders Association submitted application</p>
                </div>
                <span className="text-xs text-gray-500">1 day ago</span>
              </div>

              <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <Clock className="h-5 w-5 text-blue-500" />
                <div className="flex-1">
                  <p className="font-medium">New Application</p>
                  <p className="text-sm text-gray-600">Lagos Teachers Cooperative Society submitted application</p>
                </div>
                <span className="text-xs text-gray-500">3 days ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button onClick={() => setActiveTab("applications")} className="h-16 flex flex-col items-center justify-center space-y-2">
            <Clock className="h-6 w-6" />
            <span>Review Applications</span>
          </Button>
          <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-2">
            <TrendingUp className="h-6 w-6" />
            <span>Platform Analytics</span>
          </Button>
          <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-2">
            <Users className="h-6 w-6" />
            <span>Society Management</span>
          </Button>
        </div>
      </div>
    );
  };

  const ApplicationsTab = () => {
    const filteredApplications = applications.filter(app =>
      app.societyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.repFirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.repLastName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Society Applications</h2>
            <p className="text-gray-600">Review and manage society registration applications</p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                debugStoredData();
                loadApplications();
              }}
            >
              🔍 Debug Data
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                if (confirm('Clear all localStorage data? This will reset to default template data.')) {
                  clearAllData();
                  loadApplications();
                }
              }}
            >
              🗑️ Clear Data
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Society Details</TableHead>
                  <TableHead>Representative</TableHead>
                  <TableHead>Applied Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{application.societyName}</p>
                        <p className="text-sm text-gray-500">{application.description}</p>
                        <p className="text-xs text-gray-400">{application.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{application.repFirstName} {application.repLastName}</p>
                        <p className="text-sm text-gray-500">{application.repPosition}</p>
                        <p className="text-xs text-gray-400">{application.repEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell>{application.appliedDate.toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={
                        application.status === 'pending' ? 'outline' :
                        application.status === 'approved' ? 'default' :
                        application.status === 'rejected' ? 'destructive' : 'secondary'
                      }>
                        {application.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedApplication(application)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {application.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              disabled={loading}
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleApprove(application.id)}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              disabled={loading}
                              variant="destructive"
                              onClick={() => handleReject(application.id)}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        {application.status === 'approved' && (
                          <Button
                            size="sm"
                            disabled={loading}
                            variant="outline"
                            className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
                            onClick={() => handleSuspend(application.id)}
                          >
                            <AlertTriangle className="h-4 w-4" />
                          </Button>
                        )}
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
  };

  const ApplicationDetailModal = () => {
    if (!selectedApplication) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Society Application Details</h2>
              <Button variant="outline" onClick={() => setSelectedApplication(null)}>
                <XCircle className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Society Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Society Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="font-medium">Society Name</Label>
                    <p className="text-sm">{selectedApplication.societyName}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Description</Label>
                    <p className="text-sm">{selectedApplication.description}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Established Year</Label>
                    <p className="text-sm">{selectedApplication.establishedYear}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <p className="text-sm">{selectedApplication.address}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <p className="text-sm">{selectedApplication.phone}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <p className="text-sm">{selectedApplication.email}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Representative Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Representative
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="font-medium">Name</Label>
                    <p className="text-sm">{selectedApplication.repFirstName} {selectedApplication.repLastName}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Position</Label>
                    <p className="text-sm">{selectedApplication.repPosition}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <p className="text-sm">{selectedApplication.repEmail}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <p className="text-sm">{selectedApplication.repPhone}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Banking Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Banking & Operations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="font-medium">Bank</Label>
                    <p className="text-sm">{selectedApplication.bankName}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Account Number</Label>
                    <p className="text-sm">{selectedApplication.accountNumber}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Account Name</Label>
                    <p className="text-sm">{selectedApplication.accountName}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Interest Rate</Label>
                    <p className="text-sm">{selectedApplication.interestRate}% per month</p>
                  </div>
                  <div>
                    <Label className="font-medium">Membership Fee</Label>
                    <p className="text-sm">₦{selectedApplication.membershipFee}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Documents */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Documents
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="font-medium">Logo</Label>
                    <p className="text-sm text-gray-500">
                      {selectedApplication.logo ? "✓ Uploaded" : "Not provided"}
                    </p>
                  </div>
                  <div>
                    <Label className="font-medium">Registration Certificate</Label>
                    <p className="text-sm text-gray-500">
                      {selectedApplication.registrationCertificate ? "✓ Uploaded" : "Not provided"}
                    </p>
                  </div>
                  <div>
                    <Label className="font-medium">Bank Statement</Label>
                    <p className="text-sm text-gray-500">
                      {selectedApplication.bankStatement ? "✓ Uploaded" : "Not provided"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            {selectedApplication.status === 'pending' && (
              <div className="flex justify-end gap-4 mt-6 pt-6 border-t">
                <Button
                  variant="destructive"
                  disabled={loading}
                  onClick={() => handleReject(selectedApplication.id)}
                >
                  {loading ? "Processing..." : "Reject Application"}
                </Button>
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  disabled={loading}
                  onClick={() => handleApprove(selectedApplication.id)}
                >
                  {loading ? "Processing..." : "Approve Application"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Coopkonnect Admin Dashboard</h1>
              <p className="text-gray-600">Manage society applications and platform operations</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="px-3 py-1 bg-red-100 text-red-800">
                ADMIN ACCESS
              </Badge>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8 max-w-md">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab />
          </TabsContent>

          <TabsContent value="applications">
            <ApplicationsTab />
          </TabsContent>
        </Tabs>

        {/* Application Detail Modal */}
        <ApplicationDetailModal />
      </div>
    </MainLayout>
  );
}
