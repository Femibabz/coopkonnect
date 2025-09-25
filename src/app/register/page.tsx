"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MainLayout } from "@/components/layout/main-layout";
import { Society } from "@/lib/types";
import {
  Building2,
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  CreditCard
} from "lucide-react";

export default function RegisterPage() {
  const [selectedSociety, setSelectedSociety] = useState<string>("");
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [policyAccepted, setPolicyAccepted] = useState(false);
  const [isReapplication, setIsReapplication] = useState(false);
  const [formStep, setFormStep] = useState(1);

  // Mock societies data
  const mockSocieties: Society[] = [
    {
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
    },
    {
      id: "2",
      name: "Market Traders Association",
      description: "Cooperative society for market traders and entrepreneurs",
      logo: "/api/placeholder/64/64",
      banner: "/api/placeholder/800/200",
      address: "456 Commerce Street, Lagos",
      phone: "+234-802-345-6789",
      email: "info@markettraders.coop",
      bankAccount: {
        bankName: "Access Bank",
        accountNumber: "0987654321",
        accountName: "Market Traders Association"
      },
      isActive: true,
      interestRate: 3.0,
      loanTermMonths: 10,
      minimumMembershipMonths: 6,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  const selectedSocietyData = mockSocieties.find(s => s.id === selectedSociety);

  const SocietyWelcomePage = () => (
    <div className="max-w-4xl mx-auto">
      {/* Society Banner */}
      {selectedSocietyData?.banner && (
        <div className="relative h-48 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg mb-8 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="relative z-10 flex items-center justify-center h-full text-white">
            <div className="text-center">
              {selectedSocietyData.logo && (
                <img
                  src={selectedSocietyData.logo}
                  alt={selectedSocietyData.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-white"
                />
              )}
              <h1 className="text-3xl font-bold mb-2">{selectedSocietyData.name}</h1>
              <p className="text-lg opacity-90">{selectedSocietyData.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Society Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Society Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{selectedSocietyData?.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{selectedSocietyData?.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{selectedSocietyData?.email}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Membership Benefits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Access to low-interest loans</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Savings and shares management</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Annual dividend distributions</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Financial literacy programs</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Strength Display */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Society Financial Strength</CardTitle>
          <CardDescription>
            Transparency in our financial operations builds trust
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">₦12.5M</div>
              <div className="text-sm text-gray-600">Total Member Savings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">₦8.7M</div>
              <div className="text-sm text-gray-600">Shares Capital</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">245</div>
              <div className="text-sm text-gray-600">Active Members</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Latest AGM Minutes */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Latest AGM Minutes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">Annual General Meeting 2024</h4>
              <p className="text-sm text-gray-600 mb-2">
                Held on January 15, 2024 - Key decisions and financial updates
              </p>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Download Minutes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Membership Policy */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-red-600">Membership Policy & Terms</CardTitle>
          <CardDescription>
            Please read and accept our membership policy before proceeding
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg max-h-64 overflow-y-auto">
            <h4 className="font-semibold">Membership Requirements:</h4>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Must be 18 years or older</li>
              <li>Must provide valid identification documents</li>
              <li>Minimum initial share purchase of ₦5,000</li>
              <li>Regular monthly savings contribution</li>
            </ul>

            <h4 className="font-semibold">Loan Eligibility:</h4>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Must be a member for at least {selectedSocietyData?.minimumMembershipMonths} months</li>
              <li>Can borrow up to 2x your combined savings and shares</li>
              <li>Interest rate: {selectedSocietyData?.interestRate}% per month</li>
              <li>Maximum loan term: {selectedSocietyData?.loanTermMonths} months</li>
            </ul>

            <h4 className="font-semibold">Withdrawal Terms:</h4>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>30 days notice required for withdrawal</li>
              <li>No outstanding loans before withdrawal</li>
              <li>Processing fee may apply</li>
            </ul>
          </div>

          <div className="mt-4 flex items-center space-x-2">
            <input
              type="checkbox"
              id="policy"
              checked={policyAccepted}
              onChange={(e) => setPolicyAccepted(e.target.checked)}
              className="rounded"
            />
            <label htmlFor="policy" className="text-sm">
              I have read and accept the membership policy and terms
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Register Button */}
      <div className="text-center">
        <Button
          size="lg"
          disabled={!policyAccepted}
          onClick={() => setShowRegistrationForm(true)}
          className="px-8"
        >
          Proceed to Registration
        </Button>
      </div>
    </div>
  );

  const RegistrationForm = () => (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Membership Application Form
          </CardTitle>
          <CardDescription>
            Step {formStep} of 3 - Complete your application to join {selectedSocietyData?.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {formStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Personal Information</h3>

              {/* Application Type */}
              <div className="space-y-2">
                <Label>Application Type</Label>
                <Select onValueChange={(value) => setIsReapplication(value === "reapplication")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select application type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fresh">Fresh Application</SelectItem>
                    <SelectItem value="reapplication">Re-application</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {isReapplication && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-800">Re-application Notice</span>
                  </div>
                  <p className="text-sm text-yellow-700 mt-1">
                    Please note that previous application records will be reviewed as part of this application.
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input id="firstName" placeholder="Enter your first name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input id="lastName" placeholder="Enter your last name" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" type="email" placeholder="Enter your email address" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" placeholder="Enter your phone number" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address *</Label>
                <Input id="address" placeholder="Enter your full address" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="occupation">Occupation *</Label>
                <Input id="occupation" placeholder="Enter your occupation" />
              </div>

              <Button onClick={() => setFormStep(2)} className="w-full">
                Continue to Bank Details
              </Button>
            </div>
          )}

          {formStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Bank Details</h3>

              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="first-bank">First Bank Nigeria</SelectItem>
                    <SelectItem value="access-bank">Access Bank</SelectItem>
                    <SelectItem value="gtbank">Guaranty Trust Bank</SelectItem>
                    <SelectItem value="zenith-bank">Zenith Bank</SelectItem>
                    <SelectItem value="uba">United Bank for Africa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number *</Label>
                <Input id="accountNumber" placeholder="Enter your account number" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountName">Account Name *</Label>
                <Input id="accountName" placeholder="Enter account name as it appears on bank statement" />
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setFormStep(1)} className="flex-1">
                  Previous
                </Button>
                <Button onClick={() => setFormStep(3)} className="flex-1">
                  Continue to Documents
                </Button>
              </div>
            </div>
          )}

          {formStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Required Documents</h3>

              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm font-medium mb-1">Letter of Intent</p>
                  <p className="text-xs text-gray-500 mb-2">Upload a letter explaining why you want to join</p>
                  <Button variant="outline" size="sm">Choose File</Button>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm font-medium mb-1">Valid ID (PDF)</p>
                  <p className="text-xs text-gray-500 mb-2">National ID, Driver's License, or Passport</p>
                  <Button variant="outline" size="sm">Choose File</Button>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm font-medium mb-1">Bank Statement (PDF)</p>
                  <p className="text-xs text-gray-500 mb-2">Recent 3 months bank statement</p>
                  <Button variant="outline" size="sm">Choose File</Button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setFormStep(2)} className="flex-1">
                  Previous
                </Button>
                <Button className="flex-1">
                  Submit Application
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  if (showRegistrationForm) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <RegistrationForm />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedSociety ? (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Join a Cooperative Society
              </h1>
              <p className="text-xl text-gray-600">
                Select a society to begin your membership application
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockSocieties.map((society) => (
                <Card
                  key={society.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-blue-300"
                  onClick={() => setSelectedSociety(society.id)}
                >
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      {society.logo && (
                        <img
                          src={society.logo}
                          alt={society.name}
                          className="w-16 h-16 rounded-lg"
                        />
                      )}
                      <div>
                        <CardTitle className="text-xl">{society.name}</CardTitle>
                        <CardDescription>{society.description}</CardDescription>
                        <Badge variant="secondary" className="mt-2">
                          {society.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Interest Rate:</span>
                        <span className="font-medium">{society.interestRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Loan Term:</span>
                        <span className="font-medium">{society.loanTermMonths} months</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Min. Membership:</span>
                        <span className="font-medium">{society.minimumMembershipMonths} months</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <SocietyWelcomePage />
        )}
      </div>
    </MainLayout>
  );
}
