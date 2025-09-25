"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MainLayout } from "@/components/layout/main-layout";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/lib/types";
import { inviteMember, getMemberInvitations, MemberInvitation } from "@/lib/data-service";
import {
  Users,
  Mail,
  UserPlus,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
  Shield
} from "lucide-react";

export default function InviteMemberPage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState<UserRole>(UserRole.SOCIETY_MEMBER);
  const [invitations, setInvitations] = useState<MemberInvitation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { user, society, isLoading } = useAuth();

  // Redirect if not society admin
  useEffect(() => {
    if (!isLoading && (!user || !society || ![UserRole.SOCIETY_PRESIDENT, UserRole.SOCIETY_SECRETARY, UserRole.SOCIETY_TREASURER].includes(user.role))) {
      window.location.href = '/login?redirect=/society/invite';
    }
  }, [user, society, isLoading]);

  const loadInvitations = useCallback(() => {
    if (society) {
      const data = getMemberInvitations(society.id);
      setInvitations(data);
    }
  }, [society]);

  // Load invitations on component mount
  useEffect(() => {
    if (user && society) {
      loadInvitations();
    }
  }, [user, society, loadInvitations]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !society) return;

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Validate form
      if (!email || !firstName || !lastName) {
        setError("Please fill in all required fields");
        return;
      }

      // Send invitation
      const invitation = inviteMember(
        society.id,
        { email, firstName, lastName, role },
        user.id
      );

      setSuccess(`Invitation sent successfully to ${firstName} ${lastName} (${email})`);

      // Reset form
      setEmail("");
      setFirstName("");
      setLastName("");
      setRole(UserRole.SOCIETY_MEMBER);

      // Reload invitations
      loadInvitations();

    } catch (error) {
      console.error('Invitation error:', error);
      setError("Failed to send invitation. Please try again.");
    } finally {
      setLoading(false);
    }
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
  if (!user || !society || ![UserRole.SOCIETY_PRESIDENT, UserRole.SOCIETY_SECRETARY, UserRole.SOCIETY_TREASURER].includes(user.role)) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Shield className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
            <p className="text-gray-600 mb-4">You need society admin privileges to access this page.</p>
            <Button asChild>
              <a href="/login?redirect=/society/invite">Login as Society Admin</a>
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Invite New Members</h1>
          <p className="text-gray-600">Send invitations to new members to join {society?.name}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Invitation Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Send Member Invitation
              </CardTitle>
              <CardDescription>
                Invite new members to join your cooperative society
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <span className="text-sm text-red-700">{error}</span>
                  </div>
                )}

                {success && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-700">{success}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Enter first name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Enter last name"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Member Role</Label>
                  <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select member role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={UserRole.SOCIETY_MEMBER}>Regular Member</SelectItem>
                      <SelectItem value={UserRole.SOCIETY_TREASURER}>Treasurer</SelectItem>
                      <SelectItem value={UserRole.SOCIETY_SECRETARY}>Secretary</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">
                    Most members should be "Regular Member". Only assign admin roles to trusted individuals.
                  </p>
                </div>

                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending Invitation...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Invitation
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Recent Invitations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Recent Invitations
              </CardTitle>
              <CardDescription>
                Track the status of member invitations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {invitations.length === 0 ? (
                <div className="text-center py-6">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">No invitations sent yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {invitations.slice(0, 5).map((invitation) => (
                    <div key={invitation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{invitation.firstName} {invitation.lastName}</p>
                        <p className="text-sm text-gray-600">{invitation.email}</p>
                        <p className="text-xs text-gray-500">
                          {invitation.invitedDate.toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={
                          invitation.status === 'pending' ? 'outline' :
                          invitation.status === 'accepted' ? 'default' : 'secondary'
                        }>
                          {invitation.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                          {invitation.status === 'accepted' && <CheckCircle className="h-3 w-3 mr-1" />}
                          {invitation.status}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">
                          {invitation.role.replace('society_', '').replace('_', ' ')}
                        </p>
                      </div>
                    </div>
                  ))}

                  {invitations.length > 5 && (
                    <div className="text-center">
                      <p className="text-sm text-gray-500">
                        Showing 5 of {invitations.length} invitations
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Invitation Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>How Member Invitations Work</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Send className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-medium mb-2">1. Send Invitation</h4>
                <p className="text-sm text-gray-600">
                  Enter member details and send invitation email
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Mail className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-medium mb-2">2. Member Registers</h4>
                <p className="text-sm text-gray-600">
                  Invited member clicks link and completes registration
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-medium mb-2">3. Admin Approval</h4>
                <p className="text-sm text-gray-600">
                  Review and approve member application in dashboard
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
