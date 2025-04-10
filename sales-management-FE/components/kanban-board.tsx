"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MoreHorizontal, Clock, DollarSign, Building } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface Lead {
  id: number | string
  name: string
  company: string
  email: string
  phone: string
  status: string
  source: string
  value: string
  lastContact: string
  avatar: string
  tags?: string[]
  priority?: "High" | "Medium" | "Low"
}

interface KanbanBoardProps {
  leads: Lead[]
  onLeadUpdate: (lead: Lead, newStatus: string) => void
  onViewDetails: (lead: Lead) => void
  onEditLead: (lead: Lead) => void
  onDeleteLead: (lead: Lead) => void
}

export function KanbanBoard({ leads, onLeadUpdate, onViewDetails, onEditLead, onDeleteLead }: KanbanBoardProps) {
  const statusColumns = [
    { id: "new-lead", title: "New Lead" },
    { id: "qualified", title: "Qualified" },
    { id: "proposal", title: "Proposal" },
    { id: "negotiation", title: "Negotiation" },
    { id: "closed-won", title: "Closed Won" },
    { id: "closed-lost", title: "Closed Lost" },
  ]

  // Group leads by status
  const initialColumns = statusColumns.reduce(
    (acc, column) => {
      acc[column.id] = leads.filter((lead) => {
        const status = lead.status.toLowerCase().replace(/\s+/g, "-")
        return status === column.id
      })
      return acc
    },
    {} as Record<string, Lead[]>,
  )

  const [columns, setColumns] = useState(initialColumns)

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result

    // If there's no destination or the item is dropped back to its original position
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return
    }

    // Find the lead that was dragged
    const lead = columns[source.droppableId].find((l) => l.id.toString() === draggableId)
    if (!lead) return

    // Create a copy of the columns
    const newColumns = { ...columns }

    // Remove the lead from the source column
    newColumns[source.droppableId] = newColumns[source.droppableId].filter((l) => l.id.toString() !== draggableId)

    // Add the lead to the destination column with the new status
    const newStatus = statusColumns.find((col) => col.id === destination.droppableId)?.title || lead.status
    const updatedLead = { ...lead, status: newStatus }

    // Insert the lead at the correct position in the destination column
    newColumns[destination.droppableId] = [
      ...newColumns[destination.droppableId].slice(0, destination.index),
      updatedLead,
      ...newColumns[destination.droppableId].slice(destination.index),
    ]

    // Update the state
    setColumns(newColumns)

    // Call the callback to update the lead in the parent component
    onLeadUpdate(lead, newStatus)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "new lead":
      case "new-lead":
        return "bg-blue-100 text-blue-700"
      case "qualified":
        return "bg-green-100 text-green-700"
      case "proposal":
        return "bg-purple-100 text-purple-700"
      case "negotiation":
        return "bg-amber-100 text-amber-700"
      case "closed won":
      case "closed-won":
        return "bg-emerald-100 text-emerald-700"
      case "closed lost":
      case "closed-lost":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700"
      case "Medium":
        return "bg-amber-100 text-amber-700"
      case "Low":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex overflow-x-auto pb-4 gap-4">
        {statusColumns.map((column) => (
          <div key={column.id} className="flex-shrink-0 w-80">
            <div className={`p-2 rounded-t-md ${getStatusColor(column.title)}`}>
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{column.title}</h3>
                <Badge variant="outline" className="bg-white">
                  {columns[column.id]?.length || 0}
                </Badge>
              </div>
            </div>
            <Droppable droppableId={column.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={cn(
                    "min-h-[500px] p-2 rounded-b-md bg-gray-50 border border-gray-200",
                    snapshot.isDraggingOver && "bg-gray-100",
                  )}
                >
                  {columns[column.id]?.map((lead, index) => (
                    <Draggable key={lead.id.toString()} draggableId={lead.id.toString()} index={index}>
                      {(provided, snapshot) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={cn("mb-3 shadow-sm", snapshot.isDragging && "shadow-md rotate-1")}
                        >
                          <CardContent className="p-3">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center">
                                <Avatar className="h-8 w-8 mr-2">
                                  <AvatarImage src={lead.avatar} alt={lead.name} />
                                  <AvatarFallback>
                                    {lead.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h4 className="font-medium text-sm">{lead.name}</h4>
                                  <div className="flex items-center text-xs text-gray-500">
                                    <Building className="h-3 w-3 mr-1" />
                                    {lead.company}
                                  </div>
                                </div>
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => onViewDetails(lead)}>View Details</DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => onEditLead(lead)}>Edit Lead</DropdownMenuItem>
                                  <DropdownMenuItem>Add Task</DropdownMenuItem>
                                  <DropdownMenuItem>Convert to Deal</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-500" onClick={() => onDeleteLead(lead)}>
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>

                            <div className="flex flex-wrap gap-1 mb-2">
                              {lead.tags?.map((tag, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {lead.priority && (
                                <Badge variant="outline" className={`text-xs ${getPriorityColor(lead.priority)}`}>
                                  {lead.priority}
                                </Badge>
                              )}
                            </div>

                            <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                              <div className="flex items-center">
                                <DollarSign className="h-3 w-3 mr-1" />
                                {lead.value}
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {lead.lastContact}
                              </div>
                            </div>

                            <div className="flex justify-between mt-2">
                              <Button variant="ghost" size="icon" className="h-7 w-7">
                                <Phone className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-7 w-7">
                                <Mail className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-xs" onClick={() => onViewDetails(lead)}>
                                View
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  )
}
