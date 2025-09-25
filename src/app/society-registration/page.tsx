"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MainLayout } from "@/components/layout/main-layout";
import { submitSocietyApplication } from "@/lib/data-service";
import {
  Building2,
  User,
  CreditCard,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Shield,
  FileText,
  Upload,
  AlertCircle
} from "lucide-react";

interface FormData {
  societyName: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  establishedYear: string;
  repFirstName: string;
  repLastName: string;
  repPosition: string;
  repEmail: string;
  repPhone: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  routingNumber: string;
  interestRate: string;
  loanTermMonths: string;
  minimumMembershipMonths: string;
  membershipFee: string;
  logo: File | null;
  registrationCertificate: File | null;
  bankStatement: File | null;
}

// Step 1 Component
function Step1({ formData, updateFormData }: { formData: FormData; updateFormData: (field: string, value: string) => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-6 w-6" />
          Society Information
        </CardTitle>
        <CardDescription>
          Tell us about your cooperative society
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="societyName">Society Name *</Label>
            <Input
              id="societyName"
              name="societyName"
              placeholder="Enter society name"
              value={formData.societyName}
              onChange={(e) => updateFormData("societyName", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="establishedYear">Year Established *</Label>
            <Input
              id="establishedYear"
              name="establishedYear"
              type="number"
              placeholder="e.g., 2020"
              value={formData.establishedYear}
              onChange={(e) => updateFormData("establishedYear", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <textarea
            id="description"
            name="description"
            className="w-full p-3 border rounded-md"
            rows={3}
            placeholder="Brief description of your society's purpose and activities"
            value={formData.description}
            onChange={(e) => updateFormData("description", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address *</Label>
          <Input
            id="address"
            name="address"
            placeholder="Full address of society headquarters"
            value={formData.address}
            onChange={(e) => updateFormData("address", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="+234-xxx-xxx-xxxx"
              value={formData.phone}
              onChange={(e) => updateFormData("phone", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="society@example.com"
              value={formData.email}
              onChange={(e) => updateFormData("email", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website (Optional)</Label>
          <Input
            id="website"
            name="website"
            placeholder="https://www.yoursociety.com"
            value={formData.website}
            onChange={(e) => updateFormData("website", e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
}

// Step 2 Component
function Step2({ formData, updateFormData }: { formData: FormData; updateFormData: (field: string, value: string) => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-6 w-6" />
          Representative Information
        </CardTitle>
        <CardDescription>
          Details of the person registering this society
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="repFirstName">First Name *</Label>
            <Input
              id="repFirstName"
              name="repFirstName"
              placeholder="Enter your first name"
              value={formData.repFirstName}
              onChange={(e) => updateFormData("repFirstName", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="repLastName">Last Name *</Label>
            <Input
              id="repLastName"
              name="repLastName"
              placeholder="Enter your last name"
              value={formData.repLastName}
              onChange={(e) => updateFormData("repLastName", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="repPosition">Position in Society *</Label>
          <Select onValueChange={(value) => updateFormData("repPosition", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="president">President</SelectItem>
              <SelectItem value="secretary">Secretary</SelectItem>
              <SelectItem value="treasurer">Treasurer</SelectItem>
              <SelectItem value="chairman">Chairman</SelectItem>
              <SelectItem value="vice-president">Vice President</SelectItem>
              <SelectItem value="other">Other (Executive Member)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="repEmail">Email Address *</Label>
            <Input
              id="repEmail"
              name="repEmail"
              type="email"
              placeholder="your.email@example.com"
              value={formData.repEmail}
              onChange={(e) => updateFormData("repEmail", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="repPhone">Phone Number *</Label>
            <Input
              id="repPhone"
              name="repPhone"
              placeholder="+234-xxx-xxx-xxxx"
              value={formData.repPhone}
              onChange={(e) => updateFormData("repPhone", e.target.value)}
            />
          </div>
        </div>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-800">Verification Required</h4>
              <p className="text-sm text-blue-700">
                As the representative, you will receive admin access to manage your society.
                We'll verify your position before activating the account.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Step 3 Component
function Step3({ formData, updateFormData }: { formData: FormData; updateFormData: (field: string, value: string) => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-6 w-6" />
          Banking & Operations
        </CardTitle>
        <CardDescription>
          Set up banking details and operational parameters
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Banking Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="bankName">Bank Name *</Label>
              <Select onValueChange={(value) => updateFormData("bankName", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select bank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="first-bank">First Bank Nigeria</SelectItem>
                  <SelectItem value="access-bank">Access Bank</SelectItem>
                  <SelectItem value="gtbank">Guaranty Trust Bank</SelectItem>
                  <SelectItem value="zenith-bank">Zenith Bank</SelectItem>
                  <SelectItem value="uba">United Bank for Africa</SelectItem>
                  <SelectItem value="fidelity-bank">Fidelity Bank</SelectItem>
                  <SelectItem value="sterling-bank">Sterling Bank</SelectItem>
                  <SelectItem value="union-bank">Union Bank</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number *</Label>
              <Input
                id="accountNumber"
                name="accountNumber"
                placeholder="Enter society's account number"
                value={formData.accountNumber}
                onChange={(e) => updateFormData("accountNumber", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <Label htmlFor="accountName">Account Name *</Label>
            <Input
              id="accountName"
              name="accountName"
              placeholder="Account name as it appears in bank records"
              value={formData.accountName}
              onChange={(e) => updateFormData("accountName", e.target.value)}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Loan & Membership Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="interestRate">Monthly Interest Rate (%) *</Label>
              <Input
                id="interestRate"
                name="interestRate"
                type="number"
                step="0.1"
                placeholder="e.g., 2.5"
                value={formData.interestRate}
                onChange={(e) => updateFormData("interestRate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="loanTermMonths">Max Loan Term (Months) *</Label>
              <Input
                id="loanTermMonths"
                name="loanTermMonths"
                type="number"
                placeholder="e.g., 12"
                value={formData.loanTermMonths}
                onChange={(e) => updateFormData("loanTermMonths", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="space-y-2">
              <Label htmlFor="minimumMembershipMonths">Min. Membership Before Loan (Months) *</Label>
              <Input
                id="minimumMembershipMonths"
                name="minimumMembershipMonths"
                type="number"
                placeholder="e.g., 6"
                value={formData.minimumMembershipMonths}
                onChange={(e) => updateFormData("minimumMembershipMonths", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="membershipFee">Membership Fee (₦) *</Label>
              <Input
                id="membershipFee"
                name="membershipFee"
                type="number"
                placeholder="e.g., 5000"
                value={formData.membershipFee}
                onChange={(e) => updateFormData("membershipFee", e.target.value)}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Step 4 Component - Optional Documents
function Step4({ formData, handleFileUpload }: { formData: FormData; handleFileUpload: (field: string, file: File | null) => void }) {
  const handleFileChange = (field: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    handleFileUpload(field, file);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-6 w-6" />
          Documents (Optional)
        </CardTitle>
        <CardDescription>
          Upload supporting documents to speed up your application review
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-6">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-green-800">Optional Step</h4>
              <p className="text-sm text-green-700">
                These documents are not required to submit your application, but uploading them
                will help us process your registration faster.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Society Logo */}
          <div className="space-y-2">
            <Label htmlFor="logo">Society Logo (Optional)</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm font-medium mb-1">Upload Society Logo</p>
              <p className="text-xs text-gray-500 mb-3">PNG, JPG up to 2MB</p>
              <input
                type="file"
                id="logo"
                accept="image/*"
                onChange={(e) => handleFileChange("logo", e)}
                className="hidden"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById("logo")?.click()}
                type="button"
              >
                Choose File
              </Button>
              {formData.logo && (
                <p className="text-sm text-green-600 mt-2">
                  ✓ {formData.logo.name} uploaded
                </p>
              )}
            </div>
          </div>

          {/* Registration Certificate */}
          <div className="space-y-2">
            <Label htmlFor="certificate">Society Registration Certificate (Optional)</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm font-medium mb-1">Upload Registration Certificate</p>
              <p className="text-xs text-gray-500 mb-3">PDF format, up to 5MB</p>
              <input
                type="file"
                id="certificate"
                accept=".pdf"
                onChange={(e) => handleFileChange("registrationCertificate", e)}
                className="hidden"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById("certificate")?.click()}
                type="button"
              >
                Choose File
              </Button>
              {formData.registrationCertificate && (
                <p className="text-sm text-green-600 mt-2">
                  ✓ {formData.registrationCertificate.name} uploaded
                </p>
              )}
            </div>
          </div>

          {/* Bank Statement */}
          <div className="space-y-2">
            <Label htmlFor="bankStatement">Last 3 Months Bank Statement (Optional)</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm font-medium mb-1">Upload Bank Statement</p>
              <p className="text-xs text-gray-500 mb-3">PDF format, up to 10MB</p>
              <input
                type="file"
                id="bankStatement"
                accept=".pdf"
                onChange={(e) => handleFileChange("bankStatement", e)}
                className="hidden"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById("bankStatement")?.click()}
                type="button"
              >
                Choose File
              </Button>
              {formData.bankStatement && (
                <p className="text-sm text-green-600 mt-2">
                  ✓ {formData.bankStatement.name} uploaded
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-800">Can't Upload Now?</h4>
              <p className="text-sm text-blue-700">
                No problem! You can upload these documents later through your society dashboard
                after your application is approved.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function SocietyRegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4; // 4 steps including optional documents
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    societyName: "",
    description: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    establishedYear: "",
    repFirstName: "",
    repLastName: "",
    repPosition: "",
    repEmail: "",
    repPhone: "",
    bankName: "",
    accountNumber: "",
    accountName: "",
    routingNumber: "",
    interestRate: "",
    loanTermMonths: "",
    minimumMembershipMonths: "",
    membershipFee: "",
    logo: null,
    registrationCertificate: null,
    bankStatement: null
  });

  const updateFormData = useCallback((field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleFileUpload = useCallback((field: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  }, []);

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Validate required fields
      const requiredFields = [
        'societyName', 'description', 'address', 'phone', 'email', 'establishedYear',
        'repFirstName', 'repLastName', 'repPosition', 'repEmail', 'repPhone',
        'bankName', 'accountNumber', 'accountName', 'interestRate', 'loanTermMonths',
        'minimumMembershipMonths', 'membershipFee'
      ];

      const missingFields = requiredFields.filter(field => !formData[field as keyof FormData]);

      if (missingFields.length > 0) {
        setSubmitError(`Please fill in all required fields: ${missingFields.join(', ')}`);
        setIsSubmitting(false);
        return;
      }

      // Submit application
      const application = await submitSocietyApplication({
        societyName: formData.societyName,
        description: formData.description,
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
        website: formData.website,
        establishedYear: formData.establishedYear,
        repFirstName: formData.repFirstName,
        repLastName: formData.repLastName,
        repPosition: formData.repPosition,
        repEmail: formData.repEmail,
        repPhone: formData.repPhone,
        bankName: formData.bankName,
        accountNumber: formData.accountNumber,
        accountName: formData.accountName,
        interestRate: formData.interestRate,
        loanTermMonths: formData.loanTermMonths,
        minimumMembershipMonths: formData.minimumMembershipMonths,
        membershipFee: formData.membershipFee,
        logo: formData.logo,
        registrationCertificate: formData.registrationCertificate,
        bankStatement: formData.bankStatement
      });

      // Show success message
      alert(`Society registration submitted successfully!

Application ID: ${application.id}
Status: Pending Review

You will receive an email confirmation within 24 hours. Our team will review your application and notify you of the decision.`);

      // Redirect to home page
      router.push('/');

    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4].map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
              step <= currentStep
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
          </div>
          {step < totalSteps && (
            <div
              className={`w-16 h-1 mx-2 ${
                step < currentStep ? "bg-blue-600" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Society Registration
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Register Your Cooperative Society
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join the Coopkonnect platform and digitize your society's operations.
            Complete this form to get started.
          </p>
        </div>

        {/* Progress Indicator */}
        <StepIndicator />

        {/* Error Message */}
        {submitError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <span className="text-red-700">{submitError}</span>
          </div>
        )}

        {/* Form Content */}
        <div className="mb-8">
          {currentStep === 1 && <Step1 formData={formData} updateFormData={updateFormData} />}
          {currentStep === 2 && <Step2 formData={formData} updateFormData={updateFormData} />}
          {currentStep === 3 && <Step3 formData={formData} updateFormData={updateFormData} />}
          {currentStep === 4 && <Step4 formData={formData} handleFileUpload={handleFileUpload} />}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>

          {currentStep < 3 ? (
            <Button onClick={nextStep} className="flex items-center gap-2">
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : currentStep === 3 ? (
            <div className="flex gap-2">
              <Button onClick={nextStep} variant="outline" className="flex items-center gap-2">
                Optional Documents
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? "Submitting..." : "Submit Without Documents"}
                <CheckCircle className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
              <CheckCircle className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* What happens next */}
        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">What happens next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-medium mb-2">Application Review</h4>
              <p className="text-sm text-gray-600">
                Our team reviews your application and verifies submitted documents
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-medium mb-2">Account Activation</h4>
              <p className="text-sm text-gray-600">
                Receive login credentials and access to your society dashboard
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Building2 className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-medium mb-2">Start Managing</h4>
              <p className="text-sm text-gray-600">
                Begin adding members and managing your society operations
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
