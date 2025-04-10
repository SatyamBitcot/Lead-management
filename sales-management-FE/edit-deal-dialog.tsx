"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface EditDealDialogProps {
  isOpen: boolean
  onClose: () => void
  deal?: {
    id: string
    client: string
    product: string
    value: string
    stage: string
    probability: number
    expectedClose: string
    owner: string
  }
}

export function EditDealDialog({ isOpen, onClose, deal }: EditDealDialogProps) {
  const { toast } = useToast()
  const [date, setDate] = useState<Date | undefined>(deal?.expectedClose ? new Date(deal.expectedClose) : undefined)

  const [formData, setFormData] = useState({
    client: deal?.client || "",
    product: deal?.product || "",
    value: deal?.value?.replace("$", "") || "",
    stage: deal?.stage || "Discovery",
    probability: deal?.probability?.toString() || "20",
    expectedClose: deal?.expectedClose || "",
    owner: deal?.owner || "",
    notes: "",
  })

  useEffect(() => {
    if (deal) {
      setFormData({
        client: deal.client || "",
        product: deal.product || "",
        value: deal.value?.replace("$", "") || "",
        stage: deal.stage || "Discovery",
        probability: deal.probability?.toString() || "20",
        expectedClose: deal.expectedClose || "",
        owner: deal.owner || "",
        notes: "",
      })

      // Set the date if it exists
      if (deal.expectedClose) {
        try {
          setDate(new Date(deal.expectedClose))
        } catch (e) {
          setDate(undefined)
        }
      }
    } else {
      // Reset form for new deal
      setFormData({
        client: "",
        product: "",
        value: "",
        stage: "Discovery",
        probability: "20",
        expectedClose: "",
        owner: "",
        notes: "",
      })
      setDate(undefined)
    }
  }, [deal])

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.client || !formData.product || !formData.value) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Format the value with $ if it doesn't have one
    const formattedValue = formData.value
      ? formData.value.startsWith("$")
        ? formData.value
        : `$${formData.value}`
      : ""

    // Format the date
    const formattedDate = date ? format(date, "MMM dd, yyyy") : ""

    // Here you would typically save the data to your backend
    // For now, we'll just show a success message
    toast({
      title: deal ? "Deal updated" : "Deal created",
      description: `${formData.client} deal has been ${deal ? "updated" : "created"} successfully.`,
    })

    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{deal ? "Edit Deal" : "Add New Deal"}</DialogTitle>
          <DialogDescription>
            {deal
              ? "Update the deal information below."
              : "Enter the details of the new deal. All fields marked with * are required."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="client">Client/Company *</Label>
              <Input
                id="client"
                value={formData.client}
                onChange={(e) => handleChange("client", e.target.value)}
                placeholder="Enter client name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="product">Product/Service *</Label>
              <Input
                id="product"
                value={formData.product}
                onChange={(e) => handleChange("product", e.target.value)}
                placeholder="Enter product or service"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="value">Deal Value *</Label>
              <Input
                id="value"
                value={formData.value}
                onChange={(e) => handleChange("value", e.target.value)}
                placeholder="Enter deal value"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="stage">Deal Stage *</Label>
              <Select value={formData.stage} onValueChange={(value) => handleChange("stage", value)}>
                <SelectTrigger id="stage">
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Discovery">Discovery</SelectItem>
                  <SelectItem value="Proposal">Proposal</SelectItem>
                  <SelectItem value="Negotiation">Negotiation</SelectItem>
                  <SelectItem value="Closed Won">Closed Won</SelectItem>
                  <SelectItem value="Closed Lost">Closed Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="probability">Probability (%) *</Label>
              <Select value={formData.probability} onValueChange={(value) => handleChange("probability", value)}>
                <SelectTrigger id="probability">
                  <SelectValue placeholder="Select probability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10%</SelectItem>
                  <SelectItem value="20">20%</SelectItem>
                  <SelectItem value="30">30%</SelectItem>
                  <SelectItem value="40">40%</SelectItem>
                  <SelectItem value="50">50%</SelectItem>
                  <SelectItem value="60">60%</SelectItem>
                  <SelectItem value="70">70%</SelectItem>
                  <SelectItem value="80">80%</SelectItem>
                  <SelectItem value="90">90%</SelectItem>
                  <SelectItem value="100">100%</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="expectedClose">Expected Close Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="owner">Deal Owner</Label>
            <Select value={formData.owner} onValueChange={(value) => handleChange("owner", value)}>
              <SelectTrigger id="owner">
                <SelectValue placeholder="Select owner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="John Doe">John Doe</SelectItem>
                <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                <SelectItem value="Michael Chen">Michael Chen</SelectItem>
                <SelectItem value="Jessica Williams">Jessica Williams</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              placeholder="Add any additional information about this deal"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>{deal ? "Update Deal" : "Save Deal"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
