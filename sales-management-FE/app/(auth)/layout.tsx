import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Authentication - SMB Sales Tracker",
  description: "Login or register to access the SMB Sales Tracker",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="absolute top-6 left-6">
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-blue-600"
          >
            <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h1" />
            <path d="M15 3h1a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1" />
            <line x1="2" x2="22" y1="12" y2="12" />
            <path d="M10 16v4a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-4" />
            <path d="M18 16v4" />
            <path d="M15 16v4" />
          </svg>
          <span className="text-xl font-bold text-gray-900">
            SMB Sales Tracker
          </span>
        </div>
      </div>
      {children}
      <Toaster />
    </div>
  );
}
