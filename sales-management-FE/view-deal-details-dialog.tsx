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
import { formatCurrency } from "@/lib/utils"

interface ViewDealDetailsDialogProps {
  isOpen: boolean
  onClose: () => void
  onEdit: () => void
  deal?: {
    id: string
    client: string
    product: string
    value: string
    status: string
    probability: number
    expectedCloseDate: string
    notes?: string
    assignedTo?: string
    createdAt: string
    updatedAt?: string
  }
}

export function ViewDealDetailsDialog({ isOpen, onClose, onEdit, deal }: ViewDealDetailsDialogProps) {
  if (!deal) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Deal Details</DialogTitle>
          <DialogDescription>View detailed information about this deal.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-sm">Client</h3>
              <p className="text-sm">{deal.client}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm">Product</h3>
              <p className="text-sm">{deal.product}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-sm">Value</h3>
              <p className="text-sm">{formatCurrency(Number.parseFloat(deal.value))}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm">Status</h3>
              <p className="text-sm">{deal.status}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-sm">Probability</h3>
              <p className="text-sm">{deal.probability}%</p>
            </div>
            <div>
              <h3 className="font-medium text-sm">Expected Close Date</h3>
              <p className="text-sm">{new Date(deal.expectedCloseDate).toLocaleDateString()}</p>
            </div>
          </div>
          {deal.assignedTo && (
            <div>
              <h3 className="font-medium text-sm">Assigned To</h3>
              <p className="text-sm">{deal.assignedTo}</p>
            </div>
          )}
          {deal.notes && (
            <div>
              <h3 className="font-medium text-sm">Notes</h3>
              <p className="text-sm whitespace-pre-wrap">{deal.notes}</p>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-sm">Created</h3>
              <p className="text-sm">{new Date(deal.createdAt).toLocaleString()}</p>
            </div>
            {deal.updatedAt && (
              <div>
                <h3 className="font-medium text-sm">Last Updated</h3>
                <p className="text-sm">{new Date(deal.updatedAt).toLocaleString()}</p>
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={onEdit}>Edit Deal</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
