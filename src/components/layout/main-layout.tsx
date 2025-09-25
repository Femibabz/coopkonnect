"use client";

import { ReactNode } from "react";
import { Navbar } from "./navbar";
import { User, Society } from "@/lib/types";

interface MainLayoutProps {
  children: ReactNode;
  user?: User;
  society?: Society;
}

export function MainLayout({ children, user, society }: MainLayoutProps) {

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} society={society} />
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                © 2024 Coopkonnect. All rights reserved.
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-900">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-900">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-900">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
