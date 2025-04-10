"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  ChevronLeft,
  Plus,
  Edit,
  Trash,
  ChevronDown,
  Mail,
  MessageSquare,
  Phone,
  Calendar,
  Filter,
  Download,
  MoreHorizontal,
  Menu,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  FileText,
  LayoutList,
  Kanban,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import {
  Bar,
  BarChart as RechartsBarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts";
// Add these imports after the existing imports
import { LineChart, Line, Legend } from "recharts";

import { Play } from "lucide-react";
// Import KanbanBoard and LeadFilters components
import { KanbanBoard } from "./components/kanban-board";
import { LeadFilters } from "./components/lead-filters";
// Add this import at the top of the file
import { DealKanbanBoard } from "./components/deal-kanban-board";
import { BulkActions } from "./bulk-actions";
// Add LogoutButton import
import LogoutButton from "./components/logout-button";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();

  // Add these state variables inside the Dashboard component
  const [editLeadDialogOpen, setEditLeadDialogOpen] = useState(false);
  const [editDealDialogOpen, setEditDealDialogOpen] = useState(false);
  const [editTaskDialogOpen, setEditTaskDialogOpen] = useState(false);
  const [currentLead, setCurrentLead] = useState<any>(null);
  const [currentDeal, setCurrentDeal] = useState<any>(null);
  const [currentTask, setCurrentTask] = useState<any>(null);
  // Add these state variables inside the Dashboard component
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteItemType, setDeleteItemType] = useState<
    "lead" | "deal" | "task" | null
  >(null);
  const [deleteItemId, setDeleteItemId] = useState<string | number | null>(
    null
  );
  const [deleteItemName, setDeleteItemName] = useState<string>("");
  // Add these state variables inside the Dashboard component
  const [viewLeadDetailsOpen, setViewLeadDetailsOpen] = useState(false);
  // Inside the Dashboard component, add a new state variable for view mode
  const [leadViewMode, setLeadViewMode] = useState("list"); // "list" or "kanban"
  // Inside the Dashboard component, add a new state variable for deal view mode
  const [dealViewMode, setDealViewMode] = useState("kanban"); // "pipeline" or "kanban"
  // Add these state variables inside the Dashboard component
  const [selectedLeads, setSelectedLeads] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Sample data for charts
  const revenueData = [
    { name: "Jan", value: 12000 },
    { name: "Feb", value: 15000 },
    { name: "Mar", value: 18000 },
    { name: "Apr", value: 14000 },
    { name: "May", value: 21000 },
    { name: "Jun", value: 25000 },
  ];

  const leadsData = [
    { name: "Jan", inbound: 45, outbound: 30 },
    { name: "Feb", inbound: 52, outbound: 35 },
    { name: "Mar", inbound: 48, outbound: 40 },
    { name: "Apr", inbound: 61, outbound: 45 },
    { name: "May", inbound: 55, outbound: 48 },
    { name: "Jun", inbound: 67, outbound: 52 },
  ];

  const conversionData = [
    { name: "Jan", rate: 15 },
    { name: "Feb", rate: 18 },
    { name: "Mar", rate: 16 },
    { name: "Apr", rate: 21 },
    { name: "May", rate: 19 },
    { name: "Jun", rate: 23 },
  ];

  const leadSourceData = [
    { name: "Website", value: 35 },
    { name: "Referral", value: 25 },
    { name: "Social", value: 20 },
    { name: "Direct", value: 15 },
    { name: "Other", value: 5 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  const leadsTableData = [
    {
      id: 1,
      name: "Sarah Johnson",
      company: "Acme Corp",
      email: "sarah@acmecorp.com",
      phone: "+1 (555) 123-4567",
      status: "New Lead",
      source: "Website",
      value: "$5,000",
      lastContact: "2 days ago",
      avatar: "/placeholder.svg?height=32&width=32",
      priority: "Medium",
      assignedTo: "John Doe",
      tags: ["Tech", "Enterprise"],
      dueDate: "2023-08-15",
      notes:
        "Initial contact through website form. Interested in our premium package.",
      createdAt: "2023-07-28",
    },
    {
      id: 2,
      name: "Michael Chen",
      company: "TechSolutions Inc",
      email: "michael@techsolutions.com",
      phone: "+1 (555) 987-6543",
      status: "Qualified",
      source: "Referral",
      value: "$12,000",
      lastContact: "Yesterday",
      avatar: "/placeholder.svg?height=32&width=32",
      priority: "High",
      assignedTo: "Jane Smith",
      tags: ["Software", "B2B"],
      dueDate: "2023-08-10",
      notes:
        "Referred by existing client. Looking for a comprehensive solution.",
      createdAt: "2023-07-25",
    },
    {
      id: 3,
      name: "Jessica Williams",
      company: "Global Services",
      email: "jessica@globalservices.com",
      phone: "+1 (555) 456-7890",
      status: "Negotiation",
      source: "LinkedIn",
      value: "$8,500",
      lastContact: "3 days ago",
      avatar: "/placeholder.svg?height=32&width=32",
      priority: "Medium",
      assignedTo: "John Doe",
      tags: ["Services", "International"],
      dueDate: "2023-08-20",
      notes:
        "Connected on LinkedIn. Interested in our international services package.",
      createdAt: "2023-07-20",
    },
    {
      id: 4,
      name: "David Rodriguez",
      company: "Innovative Solutions",
      email: "david@innovative.com",
      phone: "+1 (555) 234-5678",
      status: "Proposal",
      source: "Cold Call",
      value: "$15,000",
      lastContact: "1 week ago",
      avatar: "/placeholder.svg?height=32&width=32",
      priority: "High",
      assignedTo: "Jane Smith",
      tags: ["Innovation", "Startup"],
      dueDate: "2023-08-05",
      notes:
        "Initial cold call was successful. Sent proposal for their new project.",
      createdAt: "2023-07-15",
    },
    {
      id: 5,
      name: "Emily Johnson",
      company: "Retail Innovations",
      email: "emily@retailinnovations.com",
      phone: "+1 (555) 876-5432",
      status: "Closed Won",
      source: "Email",
      value: "$7,500",
      lastContact: "4 days ago",
      avatar: "/placeholder.svg?height=32&width=32",
      priority: "Low",
      assignedTo: "John Doe",
      tags: ["Retail", "E-commerce"],
      dueDate: "2023-07-30",
      notes: "Deal closed successfully. Implementation starting next week.",
      createdAt: "2023-07-10",
    },
    {
      id: 6,
      name: "Robert Kim",
      company: "Financial Services Ltd",
      email: "robert@financialservices.com",
      phone: "+1 (555) 345-6789",
      status: "Closed Lost",
      source: "Social",
      value: "$20,000",
      lastContact: "2 weeks ago",
      avatar: "/placeholder.svg?height=32&width=32",
      priority: "Medium",
      assignedTo: "Jane Smith",
      tags: ["Finance", "Enterprise"],
      dueDate: "2023-07-25",
      notes: "Lost to competitor due to pricing concerns.",
      createdAt: "2023-07-05",
    },
  ];

  const dealsData = [
    {
      id: "DEAL-2023-001",
      client: "Acme Corp",
      product: "Enterprise Package",
      value: "$25,000",
      stage: "Proposal",
      probability: 60,
      expectedClose: "Jul 30, 2023",
      owner: "Sarah Johnson",
    },
    {
      id: "DEAL-2023-002",
      client: "TechSolutions Inc",
      product: "Premium Support",
      value: "$12,000",
      stage: "Negotiation",
      probability: 80,
      expectedClose: "Aug 15, 2023",
      owner: "Michael Chen",
    },
    {
      id: "DEAL-2023-003",
      client: "Global Services",
      product: "Basic Package",
      value: "$8,500",
      stage: "Discovery",
      probability: 40,
      expectedClose: "Sep 5, 2023",
      owner: "Jessica Williams",
    },
  ];

  const tasksData = [
    {
      id: 1,
      task: "Follow up with Acme Corp",
      dueDate: "Today",
      priority: "High",
      related: "Sarah Johnson",
      type: "Call",
      status: "Pending",
    },
    {
      id: 2,
      task: "Send proposal to TechSolutions",
      dueDate: "Tomorrow",
      priority: "High",
      related: "Michael Chen",
      type: "Email",
      status: "Pending",
    },
    {
      id: 3,
      task: "Product demo for Global Services",
      dueDate: "Jul 28, 2023",
      priority: "Medium",
      related: "Jessica Williams",
      type: "Meeting",
      status: "Scheduled",
    },
    {
      id: 4,
      task: "Quarterly review with Innovative",
      dueDate: "Aug 5, 2023",
      priority: "Medium",
      related: "David Rodriguez",
      type: "Meeting",
      status: "Scheduled",
    },
  ];

  const emailsData = [
    {
      id: "EM-001",
      from: "Sarah Johnson",
      subject: "Re: Product Inquiry",
      preview: "Thank you for the information. I'd like to schedule a demo...",
      time: "10:30 AM",
      read: false,
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "EM-002",
      from: "Michael Chen",
      subject: "Proposal Feedback",
      preview: "We've reviewed your proposal and have a few questions...",
      time: "Yesterday",
      read: true,
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "EM-003",
      from: "Jessica Williams",
      subject: "Meeting Confirmation",
      preview: "I'm confirming our meeting scheduled for tomorrow at 2 PM...",
      time: "Yesterday",
      read: true,
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ];

  const whatsappData = [
    {
      id: "WA-001",
      contact: "Sarah Johnson",
      preview: "Hi, I'm interested in learning more about your services.",
      time: "11:45 AM",
      unread: true,
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "WA-002",
      contact: "Michael Chen",
      preview: "Thanks for the information. When can we schedule a call?",
      time: "Yesterday",
      unread: false,
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "WA-003",
      contact: "David Rodriguez",
      preview: "The proposal looks good. Let's discuss the pricing.",
      time: "2 days ago",
      unread: false,
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ];

  // Add this after the existing sample data (after whatsappData)
  const salesTrendData = [
    { name: "Jan", revenue: 12000, target: 15000 },
    { name: "Feb", revenue: 15000, target: 15000 },
    { name: "Mar", revenue: 18000, target: 15000 },
    { name: "Apr", revenue: 14000, target: 15000 },
    { name: "May", revenue: 21000, target: 20000 },
    { name: "Jun", revenue: 25000, target: 20000 },
    { name: "Jul", revenue: 23000, target: 20000 },
    { name: "Aug", revenue: 28000, target: 25000 },
    { name: "Sep", revenue: 30000, target: 25000 },
    { name: "Oct", revenue: 32000, target: 30000 },
    { name: "Nov", revenue: 35000, target: 30000 },
    { name: "Dec", revenue: 40000, target: 35000 },
  ];

  const leadSourceConversionData = [
    { name: "Website", leads: 120, conversions: 24 },
    { name: "Referral", leads: 80, conversions: 32 },
    { name: "LinkedIn", leads: 60, conversions: 15 },
    { name: "Cold Call", leads: 40, conversions: 8 },
    { name: "Email", leads: 30, conversions: 9 },
    { name: "Social", leads: 25, conversions: 5 },
  ];

  const pipelineData = [
    { name: "Discovery", value: 45000, count: 12 },
    { name: "Proposal", value: 75000, count: 8 },
    { name: "Negotiation", value: 120000, count: 6 },
    { name: "Closed Won", value: 250000, count: 15 },
    { name: "Closed Lost", value: 80000, count: 10 },
  ];

  const salesTeamData = [
    {
      name: "Sarah Johnson",
      revenue: 85000,
      deals: 12,
      conversion: 28,
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      name: "Michael Chen",
      revenue: 72000,
      deals: 10,
      conversion: 25,
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      name: "Jessica Williams",
      revenue: 65000,
      deals: 8,
      conversion: 22,
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      name: "David Rodriguez",
      revenue: 58000,
      deals: 7,
      conversion: 20,
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ];

  const acquisitionData = [
    { name: "Website", cac: 250, ltv: 1200 },
    { name: "Referral", cac: 100, ltv: 1800 },
    { name: "LinkedIn", cac: 350, ltv: 1500 },
    { name: "Cold Call", cac: 400, ltv: 1100 },
    { name: "Email", cac: 180, ltv: 1300 },
  ];

  // Add these functions to handle editing leads, deals, and tasks
  const handleEditLead = (lead) => {
    setCurrentLead(lead);
    setEditLeadDialogOpen(true);
  };

  const handleEditDeal = (deal) => {
    setCurrentDeal(deal);
    setEditDealDialogOpen(true);
  };

  const handleEditTask = (task) => {
    setCurrentTask(task);
    setEditTaskDialogOpen(true);
  };

  const handleAddNewLead = () => {
    setCurrentLead(null);
    setEditLeadDialogOpen(true);
  };

  const handleAddNewDeal = () => {
    setCurrentDeal(null);
    setEditDealDialogOpen(true);
  };

  const handleAddNewTask = () => {
    setCurrentTask(null);
    setEditTaskDialogOpen(true);
  };

  // Add these functions to handle deleting items
  const handleDeleteLead = (lead) => {
    setDeleteItemType("lead");
    setDeleteItemId(lead.id);
    setDeleteItemName(lead.name);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteDeal = (deal) => {
    setDeleteItemType("deal");
    setDeleteItemId(deal.id);
    setDeleteItemName(deal.client);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteTask = (task) => {
    setDeleteItemType("task");
    setDeleteItemId(task.id);
    setDeleteItemName(task.task);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    // Here you would typically delete the item from your backend
    // For now, we'll just show a success message
    toast({
      title: "Item deleted",
      description: `${deleteItemName} has been deleted successfully.`,
    });

    // Reset delete state
    setDeleteItemType(null);
    setDeleteItemId(null);
    setDeleteItemName("");
    setDeleteConfirmOpen(false);
  };

  // Add this function to handle viewing lead details
  const handleViewLeadDetails = (lead) => {
    setCurrentLead(lead);
    setViewLeadDetailsOpen(true);
  };

  // Add a function to handle lead status updates from the Kanban board
  const handleLeadStatusUpdate = (lead, newStatus) => {
    // In a real app, you would update the lead in your database
    toast({
      title: "Lead status updated",
      description: `${lead.name} moved to ${newStatus}`,
    });
  };

  // Add a function to handle deal stage updates from the Kanban board
  const handleDealStageUpdate = (deal, newStage) => {
    // In a real app, you would update the deal in your database
    toast({
      title: "Deal stage updated",
      description: `${deal.client} moved to ${newStage}`,
    });
  };

  // Add these functions inside the Dashboard component
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(leadsTableData.map((lead) => lead.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectLead = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedLeads([...selectedLeads, id]);
    } else {
      setSelectedLeads(selectedLeads.filter((leadId) => leadId !== id));
    }
  };

  const handleBulkDelete = () => {
    setDeleteItemType("lead");
    setDeleteItemName(`${selectedLeads.length} leads`);
    setDeleteConfirmOpen(true);
  };

  const handleBulkAssign = () => {
    toast({
      title: "Assign Leads",
      description: `${selectedLeads.length} leads ready to be assigned.`,
    });
    // Here you would typically open a dialog to select a team member
  };

  const handleBulkTag = () => {
    toast({
      title: "Add Tags",
      description: `Add tags to ${selectedLeads.length} leads.`,
    });
    // Here you would typically open a dialog to select or create tags
  };

  const handleBulkEmail = () => {
    toast({
      title: "Send Email",
      description: `Compose email to ${selectedLeads.length} leads.`,
    });
    // Here you would typically open a dialog to compose an email
  };

  const handleBulkExport = () => {
    toast({
      title: "Export Leads",
      description: `${selectedLeads.length} leads exported successfully.`,
    });
    // Here you would typically trigger a download of the selected leads
  };

  // Update the renderLeads function to include the Kanban board view
  const renderLeads = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Lead Management</h2>
        <div className="flex gap-2">
          <Button
            variant={leadViewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setLeadViewMode("list")}
            className="flex items-center gap-1"
          >
            <LayoutList className="h-4 w-4" />
            List
          </Button>
          <Button
            variant={leadViewMode === "kanban" ? "default" : "outline"}
            size="sm"
            onClick={() => setLeadViewMode("kanban")}
            className="flex items-center gap-1"
          >
            <Kanban className="h-4 w-4" />
            Kanban
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button
            size="sm"
            className="flex items-center gap-1"
            onClick={handleAddNewLead}
          >
            <Plus className="h-4 w-4" />
            Add Lead
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <LeadFilters
            onFilterChange={(filters) => {
              console.log("Filters applied:", filters);
              // In a real app, you would filter your leads based on these filters
            }}
            className="mb-4"
          />

          {leadViewMode === "kanban" ? (
            <KanbanBoard
              leads={leadsTableData.map((lead) => ({
                ...lead,
                tags: lead.tags || ["Hot Lead", "Needs Follow-up"],
                priority:
                  lead.priority ||
                  (lead.id % 3 === 0
                    ? "High"
                    : lead.id % 3 === 1
                    ? "Medium"
                    : "Low"),
              }))}
              onLeadUpdate={handleLeadStatusUpdate}
              onViewDetails={handleViewLeadDetails}
              onEditLead={handleEditLead}
              onDeleteLead={handleDeleteLead}
            />
          ) : (
            <Tabs defaultValue="all">
              <TabsList className="mb-4 border-b w-full justify-start rounded-none bg-transparent p-0">
                <TabsTrigger
                  value="all"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  All Leads
                </TabsTrigger>
                <TabsTrigger
                  value="new"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  New
                </TabsTrigger>
                <TabsTrigger
                  value="qualified"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  Qualified
                </TabsTrigger>
                <TabsTrigger
                  value="proposal"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  Proposal
                </TabsTrigger>
                <TabsTrigger
                  value="negotiation"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  Negotiation
                </TabsTrigger>
                <TabsTrigger
                  value="closed"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  Closed
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="m-0">
                {selectedLeads.length > 0 && (
                  <BulkActions
                    selectedCount={selectedLeads.length}
                    onDelete={handleBulkDelete}
                    onAssign={handleBulkAssign}
                    onTag={handleBulkTag}
                    onEmail={handleBulkEmail}
                    onExport={handleBulkExport}
                  />
                )}
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>
                          <div className="flex items-center">
                            <Checkbox
                              id="select-all"
                              className="mr-2"
                              checked={selectAll}
                              onCheckedChange={handleSelectAll}
                            />
                            <Label htmlFor="select-all">Name</Label>
                            <ChevronDown className="h-4 w-4 ml-1" />
                          </div>
                        </TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Last Contact</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leadsTableData.map((lead) => (
                        <TableRow key={lead.id}>
                          <TableCell>
                            <div className="flex items-center">
                              <Checkbox
                                id={`select-${lead.id}`}
                                className="mr-2"
                                checked={selectedLeads.includes(lead.id)}
                                onCheckedChange={(checked) =>
                                  handleSelectLead(lead.id, checked as boolean)
                                }
                              />
                              <Avatar className="h-8 w-8 mr-3">
                                <AvatarImage
                                  src={lead.avatar}
                                  alt={lead.name}
                                />
                                <AvatarFallback>
                                  {lead.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{lead.name}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{lead.company}</TableCell>
                          <TableCell>{lead.email}</TableCell>
                          <TableCell>{lead.phone}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                lead.status === "New Lead"
                                  ? "default"
                                  : lead.status === "Qualified"
                                  ? "success"
                                  : lead.status === "Negotiation"
                                  ? "warning"
                                  : lead.status === "Closed Won"
                                  ? "outline"
                                  : lead.status === "Closed Lost"
                                  ? "destructive"
                                  : "outline"
                              }
                            >
                              {lead.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{lead.source}</TableCell>
                          <TableCell>{lead.value}</TableCell>
                          <TableCell>{lead.lastContact}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <Phone className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <Mail className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={() => handleViewLeadDetails(lead)}
                                  >
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleEditLead(lead)}
                                  >
                                    Edit Lead
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>Add Task</DropdownMenuItem>
                                  <DropdownMenuItem>
                                    Convert to Deal
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    className="text-red-500"
                                    onClick={() => handleDeleteLead(lead)}
                                  >
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </>
  );

  // Update the renderDeals function to include the Kanban board view
  const renderDeals = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Sales Pipeline</h2>
        <div className="flex gap-2">
          <Button
            variant={dealViewMode === "pipeline" ? "default" : "outline"}
            size="sm"
            onClick={() => setDealViewMode("pipeline")}
            className="flex items-center gap-1"
          >
            <LayoutList className="h-4 w-4" />
            Pipeline
          </Button>
          <Button
            variant={dealViewMode === "kanban" ? "default" : "outline"}
            size="sm"
            onClick={() => setDealViewMode("kanban")}
            className="flex items-center gap-1"
          >
            <Kanban className="h-4 w-4" />
            Kanban
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button
            size="sm"
            className="flex items-center gap-1"
            onClick={handleAddNewDeal}
          >
            <Plus className="h-4 w-4" />
            New Deal
          </Button>
        </div>
      </div>

      {dealViewMode === "kanban" ? (
        <DealKanbanBoard
          deals={dealsData}
          onDealUpdate={handleDealStageUpdate}
          onEditDeal={handleEditDeal}
          onDeleteDeal={handleDeleteDeal}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mb-6">
          <Card>
            <CardHeader className="p-4 pb-2 border-b">
              <CardTitle className="text-base font-medium">Discovery</CardTitle>
              <CardDescription>2 deals · $15,000</CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <Card className="border shadow-sm">
                <CardContent className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">Global Services</h4>
                    <Badge variant="outline">$8,500</Badge>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">Basic Package</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Jessica Williams</span>
                    <span>40%</span>
                  </div>
                  <Progress value={40} className="h-1 mt-1" />
                </CardContent>
              </Card>
              <Card className="border shadow-sm">
                <CardContent className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">Nexus Technologies</h4>
                    <Badge variant="outline">$6,500</Badge>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">Starter Plan</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>David Rodriguez</span>
                    <span>25%</span>
                  </div>
                  <Progress value={25} className="h-1 mt-1" />
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4 pb-2 border-b">
              <CardTitle className="text-base font-medium">Proposal</CardTitle>
              <CardDescription>1 deal · $25,000</CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <Card className="border shadow-sm">
                <CardContent className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">Acme Corp</h4>
                    <Badge variant="outline">$25,000</Badge>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">
                    Enterprise Package
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Sarah Johnson</span>
                    <span>60%</span>
                  </div>
                  <Progress value={60} className="h-1 mt-1" />
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4 pb-2 border-b">
              <CardTitle className="text-base font-medium">
                Negotiation
              </CardTitle>
              <CardDescription>1 deal · $12,000</CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <Card className="border shadow-sm">
                <CardContent className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">TechSolutions Inc</h4>
                    <Badge variant="outline">$12,000</Badge>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">Premium Support</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Michael Chen</span>
                    <span>80%</span>
                  </div>
                  <Progress value={80} className="h-1 mt-1" />
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4 pb-2 border-b">
              <CardTitle className="text-base font-medium">
                Closed Won
              </CardTitle>
              <CardDescription>3 deals · $45,000</CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <Card className="border shadow-sm">
                <CardContent className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">Stellar Industries</h4>
                    <Badge variant="outline">$18,000</Badge>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">Advanced Package</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Sarah Johnson</span>
                    <span>100%</span>
                  </div>
                  <Progress value={100} className="h-1 mt-1" />
                </CardContent>
              </Card>
              <Card className="border shadow-sm">
                <CardContent className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">Quantum Dynamics</h4>
                    <Badge variant="outline">$15,000</Badge>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">Standard Plan</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Michael Chen</span>
                    <span>100%</span>
                  </div>
                  <Progress value={100} className="h-1 mt-1" />
                </CardContent>
              </Card>
              <Card className="border shadow-sm">
                <CardContent className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">Pinnacle Group</h4>
                    <Badge variant="outline">$12,000</Badge>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">Basic Support</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Jessica Williams</span>
                    <span>100%</span>
                  </div>
                  <Progress value={100} className="h-1 mt-1" />
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );

  const renderCommunications = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Communications</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button size="sm" className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            New Message
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader className="p-4 pb-0">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base font-medium">
                Email Integration
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-blue-500">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              {emailsData.map((email) => (
                <div
                  key={email.id}
                  className={`p-3 rounded-lg border ${
                    email.read ? "bg-white" : "bg-blue-50 border-blue-100"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={email.avatar} alt={email.from} />
                      <AvatarFallback>
                        {email.from
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <p
                          className={`font-medium truncate ${
                            email.read ? "" : "text-blue-700"
                          }`}
                        >
                          {email.from}
                        </p>
                        <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                          {email.time}
                        </span>
                      </div>
                      <p
                        className={`text-sm ${
                          email.read
                            ? "text-gray-700"
                            : "text-blue-700 font-medium"
                        }`}
                      >
                        {email.subject}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {email.preview}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-2">
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Mail className="h-4 w-4 mr-1" />
                      Reply
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <ArrowRight className="h-4 w-4 mr-1" />
                      Forward
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                Connect Email Account
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 pb-0">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base font-medium">
                WhatsApp Integration
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-green-500">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              {whatsappData.map((message) => (
                <div
                  key={message.id}
                  className={`p-3 rounded-lg border ${
                    message.unread ? "bg-green-50 border-green-100" : "bg-white"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={message.avatar} alt={message.contact} />
                      <AvatarFallback>
                        {message.contact
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <p
                          className={`font-medium truncate ${
                            message.unread ? "text-green-700" : ""
                          }`}
                        >
                          {message.contact}
                        </p>
                        <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                          {message.time}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 truncate">
                        {message.preview}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-green-600"
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Reply
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full">
                <MessageSquare className="h-4 w-4 mr-2" />
                Connect WhatsApp Business
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-base font-medium">
            Communication History
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Direction</TableHead>
                  <TableHead>Subject/Summary</TableHead>
                  <TableHead>Related To</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">Today</span>
                      <span className="text-xs text-gray-500">10:30 AM</span>
                    </div>
                  </TableCell>
                  <TableCell>Sarah Johnson</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-1 text-blue-500" />
                      Email
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">Inbound</Badge>
                  </TableCell>
                  <TableCell>Re: Product Inquiry</TableCell>
                  <TableCell>
                    <Badge>Lead</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">Today</span>
                      <span className="text-xs text-gray-500">11:45 AM</span>
                    </div>
                  </TableCell>
                  <TableCell>Sarah Johnson</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-1 text-green-500" />
                      WhatsApp
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">Inbound</Badge>
                  </TableCell>
                  <TableCell>
                    Interested in learning more about services
                  </TableCell>
                  <TableCell>
                    <Badge>Lead</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">Yesterday</span>
                      <span className="text-xs text-gray-500">2:15 PM</span>
                    </div>
                  </TableCell>
                  <TableCell>Michael Chen</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-1 text-purple-500" />
                      Call
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">Outbound</Badge>
                  </TableCell>
                  <TableCell>Follow-up on proposal</TableCell>
                  <TableCell>
                    <Badge>Deal</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  );

  // Add the renderAnalytics function after the renderCommunications function

  const renderAnalytics = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Analytics & Reports</h2>
        <div className="flex gap-2">
          <Select defaultValue="last30days">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last7days">Last 7 Days</SelectItem>
              <SelectItem value="last30days">Last 30 Days</SelectItem>
              <SelectItem value="last90days">Last 90 Days</SelectItem>
              <SelectItem value="thisyear">This Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base font-medium">
              Sales Performance
            </CardTitle>
            <CardDescription>Revenue vs Target</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Current</span>
                <span className="text-sm font-medium">$256,000</span>
              </div>
              <Progress value={75} className="h-2" />
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>$0</span>
                <span>Target: $340,000</span>
              </div>
              <div className="pt-2 flex items-center text-sm text-green-600">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>75% of quarterly target</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base font-medium">
              Conversion Rate
            </CardTitle>
            <CardDescription>Lead to Customer</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Current</span>
                <span className="text-sm font-medium">18.5%</span>
              </div>
              <Progress value={18.5} className="h-2" />
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>0%</span>
                <span>Target: 25%</span>
              </div>
              <div className="pt-2 flex items-center text-sm text-amber-600">
                <ArrowDownRight className="h-4 w-4 mr-1" />
                <span>2% decrease from last period</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base font-medium">
              Average Deal Size
            </CardTitle>
            <CardDescription>Revenue per Deal</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Current</span>
                <span className="text-sm font-medium">$8,000</span>
              </div>
              <Progress value={80} className="h-2" />
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>$0</span>
                <span>Target: $10,000</span>
              </div>
              <div className="pt-2 flex items-center text-sm text-green-600">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>12% increase from last period</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader className="p-4 pb-0">
            <CardTitle className="text-base font-medium">Sales Trend</CardTitle>
            <CardDescription>Revenue over time</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={salesTrendData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="target" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 pb-0">
            <CardTitle className="text-base font-medium">
              Lead Sources
            </CardTitle>
            <CardDescription>Conversion by source</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={leadSourceConversionData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="leads" fill="#8884d8" />
                  <Bar dataKey="conversions" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6">
        <Card>
          <CardHeader className="p-4 pb-0">
            <CardTitle className="text-base font-medium">
              Sales Pipeline Analysis
            </CardTitle>
            <CardDescription>Deal value by stage</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={pipelineData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                  <Bar dataKey="count" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader className="p-4 pb-0">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-base font-medium">
                  Sales Team Performance
                </CardTitle>
                <CardDescription>Revenue by sales rep</CardDescription>
              </div>
              <Select defaultValue="revenue">
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Metric" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="deals">Deals</SelectItem>
                  <SelectItem value="conversion">Conversion</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              {salesTeamData.map((rep) => (
                <div key={rep.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={rep.avatar} alt={rep.name} />
                        <AvatarFallback>
                          {rep.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{rep.name}</span>
                    </div>
                    <span className="font-medium">
                      ${rep.revenue.toLocaleString()}
                    </span>
                  </div>
                  <Progress
                    value={(rep.revenue / 100000) * 100}
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 pb-0">
            <CardTitle className="text-base font-medium">
              Customer Acquisition Cost
            </CardTitle>
            <CardDescription>CAC vs LTV by channel</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={acquisitionData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="cac" fill="#8884d8" name="CAC" />
                  <Bar dataKey="ltv" fill="#82ca9d" name="LTV" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader className="p-4 pb-0">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-base font-medium">
                  Custom Reports
                </CardTitle>
                <CardDescription>Saved and recent reports</CardDescription>
              </div>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Report
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Last Run</TableHead>
                  <TableHead>Created By</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Quarterly Sales Summary</div>
                    <div className="text-xs text-gray-500">
                      Revenue breakdown by product and region
                    </div>
                  </TableCell>
                  <TableCell>Sales</TableCell>
                  <TableCell>2 days ago</TableCell>
                  <TableCell>John Doe</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Lead Conversion Analysis</div>
                    <div className="text-xs text-gray-500">
                      Conversion rates by source and sales rep
                    </div>
                  </TableCell>
                  <TableCell>Leads</TableCell>
                  <TableCell>1 week ago</TableCell>
                  <TableCell>Sarah Johnson</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Sales Pipeline Forecast</div>
                    <div className="text-xs text-gray-500">
                      Projected revenue for next quarter
                    </div>
                  </TableCell>
                  <TableCell>Forecast</TableCell>
                  <TableCell>3 days ago</TableCell>
                  <TableCell>Michael Chen</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );

  const renderTasks = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Tasks & Follow-ups</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button
            size="sm"
            className="flex items-center gap-1"
            onClick={handleAddNewTask}
          >
            <Plus className="h-4 w-4" />
            New Task
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-red-50 p-3 rounded-full mr-4">
              <AlertCircle className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Overdue Tasks</p>
              <h3 className="text-2xl font-bold">5</h3>
              <p className="text-xs text-gray-500">
                Requires immediate attention
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-amber-50 p-3 rounded-full mr-4">
              <Clock className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Due Today</p>
              <h3 className="text-2xl font-bold">8</h3>
              <p className="text-xs text-gray-500">2 completed, 6 pending</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-green-50 p-3 rounded-full mr-4">
              <CheckCircle2 className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Completed (This Week)</p>
              <h3 className="text-2xl font-bold">23</h3>
              <p className="text-xs text-gray-500">Great job!</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader className="p-4 pb-0">
          <div className="flex justify-between items-center">
            <CardTitle className="text-base font-medium">All Tasks</CardTitle>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tasks</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="call">Call</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="follow-up">Follow-up</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Task</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Related To</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasksData.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <Checkbox id={`task-${task.id}`} className="mr-2" />
                        <Label
                          htmlFor={`task-${task.id}`}
                          className="font-medium"
                        >
                          {task.task}
                        </Label>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          task.dueDate === "Today"
                            ? "destructive"
                            : task.dueDate === "Tomorrow"
                            ? "warning"
                            : "outline"
                        }
                      >
                        {task.dueDate}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          task.priority === "High"
                            ? "destructive"
                            : task.priority === "Medium"
                            ? "warning"
                            : "outline"
                        }
                      >
                        {task.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{task.related}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {task.type === "Call" ? (
                          <Phone className="h-4 w-4 mr-1 text-blue-500" />
                        ) : task.type === "Email" ? (
                          <Mail className="h-4 w-4 mr-1 text-green-500" />
                        ) : (
                          <Calendar className="h-4 w-4 mr-1 text-purple-500" />
                        )}
                        {task.type}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          task.status === "Completed"
                            ? "success"
                            : task.status === "Pending"
                            ? "warning"
                            : "outline"
                        }
                      >
                        {task.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleEditTask(task)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleDeleteTask(task)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  );

  const renderDashboard = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <p className="text-sm text-gray-500">Total Revenue</p>
              <div className="flex items-center mt-1">
                <h3 className="text-2xl font-bold mr-2">$256,000</h3>
                <span className="text-xs px-1.5 py-0.5 bg-green-100 text-green-600 rounded flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  12%
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                vs. $228,000 last period
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <p className="text-sm text-gray-500">New Leads</p>
              <div className="flex items-center mt-1">
                <h3 className="text-2xl font-bold mr-2">145</h3>
                <span className="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-600 rounded flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  8%
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">vs. 134 last period</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <p className="text-sm text-gray-500">Deals Closed</p>
              <div className="flex items-center mt-1">
                <h3 className="text-2xl font-bold mr-2">32</h3>
                <span className="text-xs px-1.5 py-0.5 bg-green-100 text-green-600 rounded flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  15%
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">vs. 28 last period</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <p className="text-sm text-gray-500">Conversion Rate</p>
              <div className="flex items-center mt-1">
                <h3 className="text-2xl font-bold mr-2">18.5%</h3>
                <span className="text-xs px-1.5 py-0.5 bg-red-100 text-red-600 rounded flex items-center">
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                  2%
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                vs. 20.5% last period
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader className="p-4 pb-0">
            <CardTitle className="text-base font-medium">
              Revenue Breakdown
            </CardTitle>
            <CardDescription>By Lead Source</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={leadSourceData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {leadSourceData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 pb-0">
            <CardTitle className="text-base font-medium">
              Monthly Revenue
            </CardTitle>
            <CardDescription>Last 6 Months</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                  data={revenueData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Sidebar Toggle */}
      {isMobile && (
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 right-4 z-50 rounded-full h-12 w-12 shadow-lg bg-white"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      )}

      {/* Sidebar */}
      <div
        className={`${
          isMobile
            ? "fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out"
            : "w-64"
        } ${
          isMobile && !sidebarOpen ? "-translate-x-full" : "translate-x-0"
        } bg-white border-r border-gray-200 flex flex-col`}
      >
        {isMobile && (
          <div className="flex justify-end p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>
        )}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-blue-600">SalesTracker</h1>
        </div>
        <div className="flex-1 py-4 overflow-y-auto">
          <nav className="space-y-1 px-2">
            <button
              onClick={() => setActiveSection("dashboard")}
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md ${
                activeSection === "dashboard"
                  ? "text-blue-600 bg-blue-50 border-l-4 border-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <BarChart className="mr-3 h-5 w-5" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveSection("leads")}
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md ${
                activeSection === "leads"
                  ? "text-blue-600 bg-blue-50 border-l-4 border-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Users className="mr-3 h-5 w-5" />
              Leads
            </button>
            <button
              onClick={() => setActiveSection("deals")}
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md ${
                activeSection === "deals"
                  ? "text-blue-600 bg-blue-50 border-l-4 border-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <DollarSign className="mr-3 h-5 w-5" />
              Deals
            </button>
            <button
              onClick={() => setActiveSection("tasks")}
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md ${
                activeSection === "tasks"
                  ? "text-blue-600 bg-blue-50 border-l-4 border-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <CheckSquare className="mr-3 h-5 w-5" />
              Tasks
            </button>
            <button
              onClick={() => setActiveSection("communications")}
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md ${
                activeSection === "communications"
                  ? "text-blue-600 bg-blue-50 border-l-4 border-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <MessageCircle className="mr-3 h-5 w-5" />
              Communications
            </button>
            <button
              onClick={() => setActiveSection("analytics")}
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md ${
                activeSection === "analytics"
                  ? "text-blue-600 bg-blue-50 border-l-4 border-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <BarChart3 className="mr-3 h-5 w-5" />
              Analytics
            </button>
          </nav>
        </div>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage
                src="/placeholder.svg?height=32&width=32"
                alt="User"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-gray-500">Sales Manager</p>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 py-4 px-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">
              {activeSection === "dashboard"
                ? "Dashboard"
                : activeSection === "leads"
                ? "Lead Management"
                : activeSection === "deals"
                ? "Sales Pipeline"
                : activeSection === "tasks"
                ? "Tasks & Follow-ups"
                : activeSection === "communications"
                ? "Communications"
                : "Analytics"}
            </h1>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex items-center gap-1"
              >
                <Calendar className="h-4 w-4" />
                Today
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Search className="h-4 w-4" />
              </Button>
              <LogoutButton />
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src="/placeholder.svg?height=32&width=32"
                  alt="User"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {activeSection === "dashboard" && renderDashboard()}
          {activeSection === "leads" && renderLeads()}
          {activeSection === "deals" && renderDeals()}
          {activeSection === "tasks" && renderTasks()}
          {activeSection === "communications" && renderCommunications()}
          {activeSection === "analytics" && renderAnalytics()}
        </main>
      </div>
    </div>
  );
}

function Users(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function DollarSign(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function CheckSquare(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 11 12 14 22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  );
}

function MessageCircle(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function BarChart3(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
    </svg>
  );
}

function Bell(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function Search(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function Settings(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
