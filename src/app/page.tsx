"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MainLayout } from "@/components/layout/main-layout";
import {
  Building2,
  Users,
  CreditCard,
  PiggyBank,
  Shield,
  BarChart3,
  Globe,
  CheckCircle,
  ArrowRight,
  Star,
  TrendingUp,
  FileText,
  Bell
} from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Building2,
      title: "Multi-Society Management",
      description: "Manage multiple cooperative societies from a single platform with enterprise-grade security."
    },
    {
      icon: Users,
      title: "Member Management",
      description: "Complete member lifecycle management from application to discontinuation."
    },
    {
      icon: CreditCard,
      title: "Loan Management",
      description: "Comprehensive loan processing with automated interest calculations and repayment tracking."
    },
    {
      icon: PiggyBank,
      title: "Savings & Shares",
      description: "Track member savings, shares, and dividend distributions with real-time updates."
    },
    {
      icon: Shield,
      title: "Role-Based Access",
      description: "Secure access control for Presidents, Secretaries, Treasurers, and Members."
    },
    {
      icon: BarChart3,
      title: "Financial Analytics",
      description: "Detailed financial reporting and analytics for informed decision making."
    }
  ];

  const benefits = [
    "Automated loan calculations and interest management",
    "Real-time member account tracking",
    "Customizable society branding and policies",
    "Document management and storage",
    "Email notifications and announcements",
    "Meeting agenda and minutes management",
    "Dividend distribution automation",
    "Withdrawal request processing"
  ];

  const testimonials = [
    {
      name: "Lagos State Cooperative Society",
      role: "President",
      content: "Coopkonnect has revolutionized how we manage our 500+ members. The loan processing is now automated and transparent.",
      rating: 5
    },
    {
      name: "Teachers Cooperative Union",
      role: "Secretary",
      content: "The member communication features have improved our engagement significantly. Highly recommended!",
      rating: 5
    },
    {
      name: "Market Traders Association",
      role: "Treasurer",
      content: "Financial tracking and reporting features have made our AGM preparations seamless.",
      rating: 5
    }
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              Enterprise Cooperative Management Platform
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Modernize Your
              <span className="text-blue-600"> Cooperative Society</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Complete digital transformation for cooperative societies. Manage members,
              loans, savings, and operations with enterprise-grade security and automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-8">
                <Link href="/society-registration">
                  Register Your Society
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8">
                <Link href="/demo">View Demo</Link>
              </Button>
              <Button size="lg" variant="secondary" asChild className="text-lg px-8">
                <Link href="/admin/dashboard">Admin Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Floating cards showing key metrics */}
        <div className="max-w-5xl mx-auto mt-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">100+</h3>
                <p className="text-gray-600">Societies Managed</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">50K+</h3>
                <p className="text-gray-600">Active Members</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-4">
                  <CreditCard className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">₦2B+</h3>
                <p className="text-gray-600">Loans Processed</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything Your Society Needs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive features designed specifically for cooperative societies
              and their unique operational requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Coopkonnect?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Built specifically for cooperative societies in Nigeria and Africa,
                with deep understanding of local requirements and regulations.
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <FileText className="h-8 w-8 text-blue-600 mb-3" />
                  <h3 className="font-semibold mb-2">Digital Records</h3>
                  <p className="text-sm text-gray-600">
                    Paperless record keeping with secure cloud storage
                  </p>
                </CardContent>
              </Card>
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <Bell className="h-8 w-8 text-green-600 mb-3" />
                  <h3 className="font-semibold mb-2">Notifications</h3>
                  <p className="text-sm text-gray-600">
                    Automated email and SMS notifications
                  </p>
                </CardContent>
              </Card>
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <Globe className="h-8 w-8 text-purple-600 mb-3" />
                  <h3 className="font-semibold mb-2">Cloud Access</h3>
                  <p className="text-sm text-gray-600">
                    Access from anywhere, anytime
                  </p>
                </CardContent>
              </Card>
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <Shield className="h-8 w-8 text-red-600 mb-3" />
                  <h3 className="font-semibold mb-2">Bank Security</h3>
                  <p className="text-sm text-gray-600">
                    Enterprise-grade security standards
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Societies Across Nigeria
            </h2>
            <p className="text-xl text-gray-600">
              See what society leaders are saying about Coopkonnect
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Society?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of cooperative societies already using Coopkonnect
            to streamline their operations and improve member satisfaction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="text-lg px-8">
              <Link href="/society-registration">
                Register Your Society
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 text-white border-white hover:bg-white hover:text-blue-600">
              <Link href="/demo">View Demo</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild className="text-lg px-8">
              <Link href="/admin/dashboard">Admin Panel</Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
