"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { UserRole, User, Society } from "@/lib/types";
import { useAuth } from "@/contexts/AuthContext";
import {
  Building2,
  Users,
  Settings,
  LogOut,
  Bell,
  CreditCard,
  PiggyBank,
  FileText,
  Calendar
} from "lucide-react";

interface NavbarProps {
  user?: User;
  society?: Society;
  onLogout?: () => void;
}

export function Navbar({ user: propUser, society: propSociety, onLogout: propOnLogout }: NavbarProps) {
  const { user: authUser, society: authSociety, logout } = useAuth();

  // Use auth context data if available, otherwise fall back to props
  const user = authUser || propUser;
  const society = authSociety || propSociety;
  const handleLogout = () => {
    logout();
    if (propOnLogout) propOnLogout();
  };
  const getNavItems = () => {
    if (!user) return [];

    switch (user.role) {
      case UserRole.COOPKONNECT_ADMIN:
        return [
          { href: "/admin/dashboard", label: "Admin Dashboard", icon: Building2 },
          { href: "/admin/societies", label: "Manage Societies", icon: Users },
          { href: "/admin/analytics", label: "Platform Analytics", icon: FileText },
          { href: "/admin/settings", label: "System Settings", icon: Settings },
        ];

      case UserRole.SOCIETY_PRESIDENT:
      case UserRole.SOCIETY_SECRETARY:
      case UserRole.SOCIETY_TREASURER:
        return [
          { href: "/society/dashboard", label: "Dashboard", icon: Building2 },
          { href: "/society/members", label: "Members", icon: Users },
          { href: "/society/invite", label: "Invite Members", icon: Users },
          { href: "/society/applications", label: "Applications", icon: FileText },
          { href: "/society/loans", label: "Loans", icon: CreditCard },
          { href: "/society/finances", label: "Finances", icon: PiggyBank },
          { href: "/society/meetings", label: "Meetings", icon: Calendar },
          { href: "/society/announcements", label: "Announcements", icon: Bell },
        ];

      case UserRole.SOCIETY_MEMBER:
        return [
          { href: "/member/dashboard", label: "Dashboard", icon: Building2 },
          { href: "/member/loans", label: "My Loans", icon: CreditCard },
          { href: "/member/savings", label: "Savings & Shares", icon: PiggyBank },
          { href: "/member/transactions", label: "Transactions", icon: FileText },
          { href: "/member/meetings", label: "Meetings", icon: Calendar },
        ];

      default:
        return [];
    }
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case UserRole.COOPKONNECT_ADMIN:
        return "bg-red-100 text-red-800";
      case UserRole.SOCIETY_PRESIDENT:
        return "bg-purple-100 text-purple-800";
      case UserRole.SOCIETY_SECRETARY:
        return "bg-blue-100 text-blue-800";
      case UserRole.SOCIETY_TREASURER:
        return "bg-green-100 text-green-800";
      case UserRole.SOCIETY_MEMBER:
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const navItems = getNavItems();

  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Coopkonnect</span>
            </Link>

            {/* Society Name */}
            {society && user?.role !== UserRole.COOPKONNECT_ADMIN && (
              <div className="ml-8 flex items-center space-x-2">
                <div className="h-6 w-px bg-gray-300" />
                <div className="flex items-center space-x-2">
                  {society.logo && (
                    <img
                      src={society.logo}
                      alt={society.name}
                      className="h-6 w-6 rounded"
                    />
                  )}
                  <span className="text-sm font-medium text-gray-700">
                    {society.name}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
            </Button>

            {/* User Dropdown */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" />
                      <AvatarFallback>
                        {user.firstName[0]}{user.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left">
                      <div className="text-sm font-medium text-gray-900">
                        {user.firstName} {user.lastName}
                      </div>
                      <Badge
                        variant="secondary"
                        className={getRoleBadgeColor(user.role)}
                      >
                        {user.role.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="space-x-2">
                <Button variant="ghost" asChild>
                  <Link href="/login-portal">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/society-registration">Get Started</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
