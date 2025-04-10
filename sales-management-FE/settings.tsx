"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import {
  Save,
  Globe,
  Calendar,
  Users,
  Bell,
  Mail,
  MessageSquare,
  Database,
  FileText,
  Sliders,
  User,
  Building,
  Briefcase,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

export default function Settings() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("general")

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully",
    })
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Settings</h2>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
          <TabsTrigger value="general" className="flex items-center">
            <Sliders className="h-4 w-4 mr-2" />
            <span className="hidden md:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            <span className="hidden md:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="company" className="flex items-center">
            <Building className="h-4 w-4 mr-2" />
            <span className="hidden md:inline">Company</span>
          </TabsTrigger>
          <TabsTrigger value="localization" className="flex items-center">
            <Globe className="h-4 w-4 mr-2" />
            <span className="hidden md:inline">Localization</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            <span className="hidden md:inline">Users</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="h-4 w-4 mr-2" />
            <span className="hidden md:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center">
            <Mail className="h-4 w-4 mr-2" />
            <span className="hidden md:inline">Integrations</span>
          </TabsTrigger>
          <TabsTrigger value="data" className="flex items-center">
            <Database className="h-4 w-4 mr-2" />
            <span className="hidden md:inline">Data</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure general application settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="app-name">Application Name</Label>
                  <Input id="app-name" defaultValue="SalesTracker" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="items-per-page">Items Per Page</Label>
                  <Select defaultValue="10">
                    <SelectTrigger id="items-per-page">
                      <SelectValue placeholder="Select items per page" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="default-dashboard">Default Dashboard View</Label>
                <Select defaultValue="summary">
                  <SelectTrigger id="default-dashboard">
                    <SelectValue placeholder="Select default dashboard" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="summary">Summary</SelectItem>
                    <SelectItem value="sales">Sales Focus</SelectItem>
                    <SelectItem value="leads">Leads Focus</SelectItem>
                    <SelectItem value="tasks">Tasks Focus</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <p className="text-sm text-gray-500">Enable dark mode for the application</p>
                </div>
                <Switch id="dark-mode" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-refresh">Auto Refresh</Label>
                  <p className="text-sm text-gray-500">Automatically refresh data every 5 minutes</p>
                </div>
                <Switch id="auto-refresh" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Manage your personal profile information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                  <p className="text-xs text-gray-500">Recommended size: 200x200px. Max file size: 5MB.</p>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" defaultValue="Doe" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" defaultValue="+1 (555) 123-4567" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="job-title">Job Title</Label>
                <Input id="job-title" defaultValue="Sales Manager" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Change Password</Label>
                <Input id="password" type="password" placeholder="Enter new password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" placeholder="Confirm new password" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="company" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Settings</CardTitle>
              <CardDescription>Manage your company information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Company" />
                  <AvatarFallback>CO</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">
                    Change Logo
                  </Button>
                  <p className="text-xs text-gray-500">Recommended size: 200x200px. Max file size: 5MB.</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input id="company-name" defaultValue="Acme Corporation" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select defaultValue="technology">
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-size">Company Size</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger id="company-size">
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small (1-50 employees)</SelectItem>
                      <SelectItem value="medium">Medium (51-200 employees)</SelectItem>
                      <SelectItem value="large">Large (201-1000 employees)</SelectItem>
                      <SelectItem value="enterprise">Enterprise (1000+ employees)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" defaultValue="https://www.acmecorp.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" defaultValue="123 Main Street, Suite 100, Anytown, CA 12345" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tax-id">Tax ID / VAT Number</Label>
                  <Input id="tax-id" defaultValue="US123456789" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fiscal-year">Fiscal Year Start</Label>
                  <Select defaultValue="january">
                    <SelectTrigger id="fiscal-year">
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="january">January</SelectItem>
                      <SelectItem value="february">February</SelectItem>
                      <SelectItem value="march">March</SelectItem>
                      <SelectItem value="april">April</SelectItem>
                      <SelectItem value="may">May</SelectItem>
                      <SelectItem value="june">June</SelectItem>
                      <SelectItem value="july">July</SelectItem>
                      <SelectItem value="august">August</SelectItem>
                      <SelectItem value="september">September</SelectItem>
                      <SelectItem value="october">October</SelectItem>
                      <SelectItem value="november">November</SelectItem>
                      <SelectItem value="december">December</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business-type">Business Type</Label>
                  <Select defaultValue="corporation">
                    <SelectTrigger id="business-type">
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="soleProprietor">Sole Proprietorship</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="llc">LLC</SelectItem>
                      <SelectItem value="corporation">Corporation</SelectItem>
                      <SelectItem value="nonprofit">Non-profit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="localization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Localization Settings</CardTitle>
              <CardDescription>Configure regional and language preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="en-US">
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="en-GB">English (UK)</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="pt">Portuguese</SelectItem>
                      <SelectItem value="ja">Japanese</SelectItem>
                      <SelectItem value="zh">Chinese (Simplified)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Time Zone</Label>
                  <Select defaultValue="America/New_York">
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                      <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                      <SelectItem value="Europe/Paris">Central European Time (CET)</SelectItem>
                      <SelectItem value="Asia/Tokyo">Japan Standard Time (JST)</SelectItem>
                      <SelectItem value="Australia/Sydney">Australian Eastern Time (AET)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select defaultValue="USD">
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">US Dollar ($)</SelectItem>
                      <SelectItem value="EUR">Euro (€)</SelectItem>
                      <SelectItem value="GBP">British Pound (£)</SelectItem>
                      <SelectItem value="JPY">Japanese Yen (¥)</SelectItem>
                      <SelectItem value="CAD">Canadian Dollar (C$)</SelectItem>
                      <SelectItem value="AUD">Australian Dollar (A$)</SelectItem>
                      <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                      <SelectItem value="CNY">Chinese Yuan (¥)</SelectItem>
                      <SelectItem value="BRL">Brazilian Real (R$)</SelectItem>
                      <SelectItem value="MXN">Mexican Peso (Mex$)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency-format">Currency Format</Label>
                  <Select defaultValue="symbol-before">
                    <SelectTrigger id="currency-format">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="symbol-before">Symbol before amount ($123.45)</SelectItem>
                      <SelectItem value="symbol-after">Symbol after amount (123.45$)</SelectItem>
                      <SelectItem value="code-before">Code before amount (USD 123.45)</SelectItem>
                      <SelectItem value="code-after">Code after amount (123.45 USD)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date-format">Date Format</Label>
                  <Select defaultValue="MM/DD/YYYY">
                    <SelectTrigger id="date-format">
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY (US)</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY (UK/EU)</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD (ISO)</SelectItem>
                      <SelectItem value="YYYY/MM/DD">YYYY/MM/DD (Japan)</SelectItem>
                      <SelectItem value="DD.MM.YYYY">DD.MM.YYYY (Germany)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time-format">Time Format</Label>
                  <Select defaultValue="12h">
                    <SelectTrigger id="time-format">
                      <SelectValue placeholder="Select time format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12h">12-hour (1:30 PM)</SelectItem>
                      <SelectItem value="24h">24-hour (13:30)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-day">First Day of Week</Label>
                  <Select defaultValue="sunday">
                    <SelectTrigger id="first-day">
                      <SelectValue placeholder="Select first day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sunday">Sunday</SelectItem>
                      <SelectItem value="monday">Monday</SelectItem>
                      <SelectItem value="saturday">Saturday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="number-format">Number Format</Label>
                  <Select defaultValue="thousand-comma">
                    <SelectTrigger id="number-format">
                      <SelectValue placeholder="Select number format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="thousand-comma">1,234.56 (US/UK)</SelectItem>
                      <SelectItem value="thousand-dot">1.234,56 (EU)</SelectItem>
                      <SelectItem value="thousand-space">1 234,56 (FR)</SelectItem>
                      <SelectItem value="indian">12,34,567.89 (India)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage users and their permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Team Members</h3>
                <Button size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  Invite User
                </Button>
              </div>
              <div className="border rounded-md">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Email</th>
                        <th className="px-4 py-2 text-left">Role</th>
                        <th className="px-4 py-2 text-left">Status</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="px-4 py-2">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="John Doe" />
                              <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <span>John Doe</span>
                          </div>
                        </td>
                        <td className="px-4 py-2">john.doe@example.com</td>
                        <td className="px-4 py-2">Admin</td>
                        <td className="px-4 py-2">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Active</span>
                        </td>
                        <td className="px-4 py-2">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-4 py-2">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Jane Smith" />
                              <AvatarFallback>JS</AvatarFallback>
                            </Avatar>
                            <span>Jane Smith</span>
                          </div>
                        </td>
                        <td className="px-4 py-2">jane.smith@example.com</td>
                        <td className="px-4 py-2">Sales Manager</td>
                        <td className="px-4 py-2">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Active</span>
                        </td>
                        <td className="px-4 py-2">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-4 py-2">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Robert Johnson" />
                              <AvatarFallback>RJ</AvatarFallback>
                            </Avatar>
                            <span>Robert Johnson</span>
                          </div>
                        </td>
                        <td className="px-4 py-2">robert.johnson@example.com</td>
                        <td className="px-4 py-2">Sales Rep</td>
                        <td className="px-4 py-2">
                          <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded text-xs">Invited</span>
                        </td>
                        <td className="px-4 py-2">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Roles & Permissions</h3>
                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h4 className="font-medium">Admin</h4>
                        <p className="text-sm text-gray-500">Full access to all features</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="text-sm font-medium mb-2">Leads</h5>
                        <ul className="text-sm space-y-1">
                          <li className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                            Create & Edit
                          </li>
                          <li className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                            Delete
                          </li>
                          <li className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                            View All
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium mb-2">Deals</h5>
                        <ul className="text-sm space-y-1">
                          <li className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                            Create & Edit
                          </li>
                          <li className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                            Delete
                          </li>
                          <li className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                            View All
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium mb-2">Settings</h5>
                        <ul className="text-sm space-y-1">
                          <li className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                            Manage Users
                          </li>
                          <li className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                            Billing
                          </li>
                          <li className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                            Integrations
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h4 className="font-medium">Sales Manager</h4>
                        <p className="text-sm text-gray-500">Manage team and view reports</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="text-sm font-medium mb-2">Leads</h5>
                        <ul className="text-sm space-y-1">
                          <li className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                            Create & Edit
                          </li>
                          <li className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                            View All
                          </li>
                          <li className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                            Delete
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium mb-2">Deals</h5>
                        <ul className="text-sm space-y-1">
                          <li className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                            Create & Edit
                          </li>
                          <li className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                            View All
                          </li>
                          <li className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                            Delete
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium mb-2">Settings</h5>
                        <ul className="text-sm space-y-1">
                          <li className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                            Manage Users
                          </li>
                          <li className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                            Billing
                          </li>
                          <li className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                            View Reports
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h4 className="font-medium">Sales Rep</h4>
                        <p className="text-sm text-gray-500">Basic access to manage own leads and deals</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="text-sm font-medium mb-2">Leads</h5>
                        <ul className="text-sm space-y-1">
                          <li className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                            Create & Edit Own
                          </li>
                          <li className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                            Delete
                          </li>
                          <li className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                            View All
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium mb-2">Deals</h5>
                        <ul className="text-sm space-y-1">
                          <li className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                            Create & Edit Own
                          </li>
                          <li className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                            Delete
                          </li>
                          <li className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                            View All
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium mb-2">Settings</h5>
                        <ul className="text-sm space-y-1">
                          <li className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                            Manage Users
                          </li>
                          <li className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                            Billing
                          </li>
                          <li className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                            View Reports
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-leads">New Leads</Label>
                      <p className="text-sm text-gray-500">Receive notifications when new leads are created</p>
                    </div>
                    <Switch id="email-leads" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-deals">Deal Updates</Label>
                      <p className="text-sm text-gray-500">Receive notifications when deals change status</p>
                    </div>
                    <Switch id="email-deals" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-tasks">Task Reminders</Label>
                      <p className="text-sm text-gray-500">Receive reminders for upcoming and overdue tasks</p>
                    </div>
                    <Switch id="email-tasks" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-mentions">Mentions</Label>
                      <p className="text-sm text-gray-500">Receive notifications when you are mentioned in comments</p>
                    </div>
                    <Switch id="email-mentions" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-digest">Daily Digest</Label>
                      <p className="text-sm text-gray-500">Receive a daily summary of activities</p>
                    </div>
                    <Switch id="email-digest" />
                  </div>
                </div>

                <Separator />

                <h3 className="text-lg font-medium">In-App Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="app-leads">New Leads</Label>
                      <p className="text-sm text-gray-500">Show notifications when new leads are created</p>
                    </div>
                    <Switch id="app-leads" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="app-deals">Deal Updates</Label>
                      <p className="text-sm text-gray-500">Show notifications when deals change status</p>
                    </div>
                    <Switch id="app-deals" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="app-tasks">Task Reminders</Label>
                      <p className="text-sm text-gray-500">Show reminders for upcoming and overdue tasks</p>
                    </div>
                    <Switch id="app-tasks" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="app-mentions">Mentions</Label>
                      <p className="text-sm text-gray-500">Show notifications when you are mentioned in comments</p>
                    </div>
                    <Switch id="app-mentions" defaultChecked />
                  </div>
                </div>

                <Separator />

                <h3 className="text-lg font-medium">Mobile Push Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-leads">New Leads</Label>
                      <p className="text-sm text-gray-500">Send push notifications when new leads are created</p>
                    </div>
                    <Switch id="push-leads" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-deals">Deal Updates</Label>
                      <p className="text-sm text-gray-500">Send push notifications when deals change status</p>
                    </div>
                    <Switch id="push-deals" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-tasks">Task Reminders</Label>
                      <p className="text-sm text-gray-500">Send push reminders for upcoming and overdue tasks</p>
                    </div>
                    <Switch id="push-tasks" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Integration Settings</CardTitle>
              <CardDescription>Connect with external services and applications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border rounded-md p-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <Mail className="h-8 w-8 text-blue-500 mr-3" />
                    <div>
                      <h4 className="font-medium">Email Integration</h4>
                      <p className="text-sm text-gray-500">Connect your email account to track communications</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Connected
                    </Badge>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-sync">Email Sync</Label>
                      <p className="text-sm text-gray-500">Automatically sync emails with contacts</p>
                    </div>
                    <Switch id="email-sync" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-tracking">Email Tracking</Label>
                      <p className="text-sm text-gray-500">Track when emails are opened</p>
                    </div>
                    <Switch id="email-tracking" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-templates">Email Templates</Label>
                      <p className="text-sm text-gray-500">Use sales templates in your email client</p>
                    </div>
                    <Switch id="email-templates" defaultChecked />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Connected account: john.doe@example.com</p>
                </div>
              </div>

              <div className="border rounded-md p-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <MessageSquare className="h-8 w-8 text-green-500 mr-3" />
                    <div>
                      <h4 className="font-medium">WhatsApp Business Integration</h4>
                      <p className="text-sm text-gray-500">Connect WhatsApp to communicate with leads and customers</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                      Setup Required
                    </Badge>
                    <Button size="sm">Connect</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">
                    Connect your WhatsApp Business account to send and receive messages directly from the CRM.
                  </p>
                </div>
              </div>

              <div className="border rounded-md p-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-8 w-8 text-purple-500 mr-3" />
                    <div>
                      <h4 className="font-medium">Calendar Integration</h4>
                      <p className="text-sm text-gray-500">Sync with Google Calendar or Outlook</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Connected
                    </Badge>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="calendar-sync">Two-way Sync</Label>
                      <p className="text-sm text-gray-500">Sync events between CRM and calendar</p>
                    </div>
                    <Switch id="calendar-sync" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="calendar-reminders">Meeting Reminders</Label>
                      <p className="text-sm text-gray-500">Get reminders for upcoming meetings</p>
                    </div>
                    <Switch id="calendar-reminders" defaultChecked />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Connected account: Google Calendar (john.doe@example.com)</p>
                </div>
              </div>

              <div className="border rounded-md p-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <FileText className="h-8 w-8 text-blue-500 mr-3" />
                    <div>
                      <h4 className="font-medium">Document Integration</h4>
                      <p className="text-sm text-gray-500">Connect with Google Drive, Dropbox, or OneDrive</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                      Setup Required
                    </Badge>
                    <Button size="sm">Connect</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">
                    Connect your document storage service to attach files to leads and deals.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>Import, export, and manage your data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Import Data</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border">
                    <CardContent className="p-4">
                      <div className="flex items-center mb-4">
                        <Users className="h-6 w-6 text-blue-500 mr-2" />
                        <h4 className="font-medium">Import Leads</h4>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">Import leads from CSV, Excel, or other CRM systems.</p>
                      <Button size="sm">Import Leads</Button>
                    </CardContent>
                  </Card>
                  <Card className="border">
                    <CardContent className="p-4">
                      <div className="flex items-center mb-4">
                        <Briefcase className="h-6 w-6 text-green-500 mr-2" />
                        <h4 className="font-medium">Import Deals</h4>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">Import deals from CSV, Excel, or other CRM systems.</p>
                      <Button size="sm">Import Deals</Button>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Export Data</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border">
                    <CardContent className="p-4">
                      <div className="flex items-center mb-4">
                        <Users className="h-6 w-6 text-blue-500 mr-2" />
                        <h4 className="font-medium">Export Leads</h4>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">Export leads to CSV or Excel format.</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          CSV
                        </Button>
                        <Button variant="outline" size="sm">
                          Excel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border">
                    <CardContent className="p-4">
                      <div className="flex items-center mb-4">
                        <Briefcase className="h-6 w-6 text-green-500 mr-2" />
                        <h4 className="font-medium">Export Deals</h4>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">Export deals to CSV or Excel format.</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          CSV
                        </Button>
                        <Button variant="outline" size="sm">
                          Excel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Custom Fields</h3>
                <p className="text-sm text-gray-500">
                  Create custom fields to store additional information about leads and deals.
                </p>
                <div className="border rounded-md">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="px-4 py-2 text-left">Field Name</th>
                          <th className="px-4 py-2 text-left">Type</th>
                          <th className="px-4 py-2 text-left">Entity</th>
                          <th className="px-4 py-2 text-left">Required</th>
                          <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t">
                          <td className="px-4 py-2">Industry</td>
                          <td className="px-4 py-2">Dropdown</td>
                          <td className="px-4 py-2">Lead</td>
                          <td className="px-4 py-2">Yes</td>
                          <td className="px-4 py-2">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-t">
                          <td className="px-4 py-2">Company Size</td>
                          <td className="px-4 py-2">Dropdown</td>
                          <td className="px-4 py-2">Lead</td>
                          <td className="px-4 py-2">No</td>
                          <td className="px-4 py-2">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-t">
                          <td className="px-4 py-2">Decision Maker</td>
                          <td className="px-4 py-2">Checkbox</td>
                          <td className="px-4 py-2">Lead</td>
                          <td className="px-4 py-2">No</td>
                          <td className="px-4 py-2">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-t">
                          <td className="px-4 py-2">Contract Value</td>
                          <td className="px-4 py-2">Currency</td>
                          <td className="px-4 py-2">Deal</td>
                          <td className="px-4 py-2">Yes</td>
                          <td className="px-4 py-2">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Custom Field
                </Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Data Backup</h3>
                <p className="text-sm text-gray-500">Create and manage backups of your data.</p>
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h4 className="font-medium">Automatic Backups</h4>
                      <p className="text-sm text-gray-500">Create automatic backups of your data</p>
                    </div>
                    <Switch id="auto-backup" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="backup-frequency">Backup Frequency</Label>
                    <Select defaultValue="weekly">
                      <SelectTrigger id="backup-frequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" size="sm">
                      Create Manual Backup
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
