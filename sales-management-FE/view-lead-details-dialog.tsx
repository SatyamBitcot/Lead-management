"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone, Building, Calendar, DollarSign, Tag, Clock } from "lucide-react"

interface ViewLeadDetailsDialogProps {
  isOpen: boolean
  onClose: () => void
  onEdit: () => void
  lead?: {
    id: number
    name: string
    company: string
    email: string
    phone: string
    status: string
    source: string
    value: string
    lastContact: string
  }
}

export function ViewLeadDetailsDialog({ isOpen, onClose, onEdit, lead }: ViewLeadDetailsDialogProps) {
  if (!lead) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Lead Details</DialogTitle>
          <DialogDescription>View detailed information about this lead.</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4 pt-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{lead.name}</h3>
                <p className="text-sm text-gray-500">{lead.company}</p>
              </div>
              <Badge
                variant={
                  lead.status === "New Lead"
                    ? "default"
                    : lead.status === "Qualified"
                      ? "success"
                      : lead.status === "Negotiation"
                        ? "warning"
                        : "outline"
                }
              >
                {lead.status}
              </Badge>
            </div>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm font-medium">Email:</span>
                    <a href={`mailto:${lead.email}`} className="text-sm ml-2 text-blue-600 hover:underline">
                      {lead.email}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm font-medium">Phone:</span>
                    <a href={`tel:${lead.phone}`} className="text-sm ml-2 text-blue-600 hover:underline">
                      {lead.phone}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Building className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm font-medium">Company:</span>
                    <span className="text-sm ml-2">{lead.company}</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm font-medium">Source:</span>
                    <span className="text-sm ml-2">{lead.source}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm font-medium">Estimated Value:</span>
                    <span className="text-sm ml-2">{lead.value}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm font-medium">Last Contact:</span>
                    <span className="text-sm ml-2">{lead.lastContact}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="activity" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <Mail className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center">
                    <h4 className="text-sm font-medium">Email Sent</h4>
                    <span className="text-xs text-gray-500 ml-2">2 days ago</span>
                  </div>
                  <p className="text-sm text-gray-600">Initial outreach email sent to {lead.name}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <Phone className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <div className="flex items-center">
                    <h4 className="text-sm font-medium">Call Made</h4>
                    <span className="text-xs text-gray-500 ml-2">1 day ago</span>
                  </div>
                  <p className="text-sm text-gray-600">Follow-up call with {lead.name} to discuss requirements</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-purple-100 p-2 rounded-full mr-3">
                  <Calendar className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <div className="flex items-center">
                    <h4 className="text-sm font-medium">Meeting Scheduled</h4>
                    <span className="text-xs text-gray-500 ml-2">Today</span>
                  </div>
                  <p className="text-sm text-gray-600">Demo meeting scheduled with {lead.name} for next week</p>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="notes" className="space-y-4 pt-4">
            <Card>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium">Initial Contact Notes</h4>
                    <span className="text-xs text-gray-500">2 days ago</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {lead.name} expressed interest in our premium package. They are currently using a competitor's
                    product but are looking to switch due to scaling issues.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium">Follow-up Call Notes</h4>
                    <span className="text-xs text-gray-500">1 day ago</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Discussed specific requirements with {lead.name}. They need a solution that can handle their growing
                    team of 50+ people. Budget is approximately {lead.value}.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={onEdit}>Edit Lead</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
