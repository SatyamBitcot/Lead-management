"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, UserPlus, Tag, Trash2, Download } from "lucide-react"

interface BulkActionsProps {
  selectedCount: number
  onDelete: () => void
  onAssign: () => void
  onTag: () => void
  onEmail: () => void
  onExport: () => void
}

export function BulkActions({ selectedCount, onDelete, onAssign, onTag, onEmail, onExport }: BulkActionsProps) {
  return (
    <Card className="mb-4 border-blue-200 bg-blue-50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="font-medium text-blue-700">{selectedCount} items selected</span>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="ghost" className="text-blue-700" onClick={onEmail}>
              <Mail className="h-4 w-4 mr-1" />
              Email
            </Button>
            <Button size="sm" variant="ghost" className="text-blue-700" onClick={onAssign}>
              <UserPlus className="h-4 w-4 mr-1" />
              Assign
            </Button>
            <Button size="sm" variant="ghost" className="text-blue-700" onClick={onTag}>
              <Tag className="h-4 w-4 mr-1" />
              Tag
            </Button>
            <Button size="sm" variant="ghost" className="text-blue-700" onClick={onExport}>
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
            <Button size="sm" variant="ghost" className="text-red-600" onClick={onDelete}>
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
