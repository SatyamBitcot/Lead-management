"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { MoreHorizontal, Calendar, DollarSign, User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface Deal {
  id: string
  client: string
  product: string
  value: string
  stage: string
  probability: number
  expectedClose: string
  owner: string
}

interface DealKanbanBoardProps {
  deals: Deal[]
  onDealUpdate: (deal: Deal, newStage: string) => void
  onEditDeal: (deal: Deal) => void
  onDeleteDeal: (deal: Deal) => void
}

export function DealKanbanBoard({ deals, onDealUpdate, onEditDeal, onDeleteDeal }: DealKanbanBoardProps) {
  const stageColumns = [
    { id: "discovery", title: "Discovery" },
    { id: "proposal", title: "Proposal" },
    { id: "negotiation", title: "Negotiation" },
    { id: "closed-won", title: "Closed Won" },
    { id: "closed-lost", title: "Closed Lost" },
  ]

  // Group deals by stage
  const initialColumns = stageColumns.reduce(
    (acc, column) => {
      acc[column.id] = deals.filter((deal) => {
        const stage = deal.stage.toLowerCase().replace(/\s+/g, "-")
        return stage === column.id
      })
      return acc
    },
    {} as Record<string, Deal[]>,
  )

  const [columns, setColumns] = useState(initialColumns)

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result

    // If there's no destination or the item is dropped back to its original position
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return
    }

    // Find the deal that was dragged
    const deal = columns[source.droppableId].find((d) => d.id === draggableId)
    if (!deal) return

    // Create a copy of the columns
    const newColumns = { ...columns }

    // Remove the deal from the source column
    newColumns[source.droppableId] = newColumns[source.droppableId].filter((d) => d.id !== draggableId)

    // Add the deal to the destination column with the new stage
    const newStage = stageColumns.find((col) => col.id === destination.droppableId)?.title || deal.stage
    const updatedDeal = { ...deal, stage: newStage }

    // Insert the deal at the correct position in the destination column
    newColumns[destination.droppableId] = [
      ...newColumns[destination.droppableId].slice(0, destination.index),
      updatedDeal,
      ...newColumns[destination.droppableId].slice(destination.index),
    ]

    // Update the state
    setColumns(newColumns)

    // Call the callback to update the deal in the parent component
    onDealUpdate(deal, newStage)
  }

  const getStageColor = (stage: string) => {
    switch (stage.toLowerCase().replace(/\s+/g, "-")) {
      case "discovery":
        return "bg-blue-100 text-blue-700"
      case "proposal":
        return "bg-purple-100 text-purple-700"
      case "negotiation":
        return "bg-amber-100 text-amber-700"
      case "closed-won":
        return "bg-emerald-100 text-emerald-700"
      case "closed-lost":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const calculateTotalValue = (deals: Deal[]) => {
    return deals.reduce((total, deal) => {
      const value = Number.parseInt(deal.value.replace(/[^0-9]/g, ""), 10) || 0
      return total + value
    }, 0)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex overflow-x-auto pb-4 gap-4">
        {stageColumns.map((column) => {
          const columnDeals = columns[column.id] || []
          const totalValue = calculateTotalValue(columnDeals)

          return (
            <div key={column.id} className="flex-shrink-0 w-80">
              <div className={`p-2 rounded-t-md ${getStageColor(column.id)}`}>
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{column.title}</h3>
                  <Badge variant="outline" className="bg-white">
                    {columnDeals.length} · ${totalValue.toLocaleString()}
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
                    {columnDeals.map((deal, index) => (
                      <Draggable key={deal.id} draggableId={deal.id} index={index}>
                        {(provided, snapshot) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={cn("mb-3 shadow-sm", snapshot.isDragging && "shadow-md rotate-1")}
                          >
                            <CardContent className="p-3">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium">{deal.client}</h4>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => onEditDeal(deal)}>Edit Deal</DropdownMenuItem>
                                    <DropdownMenuItem>Add Task</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-500" onClick={() => onDeleteDeal(deal)}>
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>

                              <p className="text-sm text-gray-500 mb-2">{deal.product}</p>

                              <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                                <div className="flex items-center">
                                  <DollarSign className="h-3 w-3 mr-1" />
                                  {deal.value}
                                </div>
                                <div className="flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {deal.expectedClose}
                                </div>
                              </div>

                              <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                                <div className="flex items-center">
                                  <User className="h-3 w-3 mr-1" />
                                  {deal.owner}
                                </div>
                                <span>{deal.probability}%</span>
                              </div>

                              <Progress value={deal.probability} className="h-1 mt-1" />
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
          )
        })}
      </div>
    </DragDropContext>
  )
}
