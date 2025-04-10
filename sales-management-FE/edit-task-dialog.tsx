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
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface EditTaskDialogProps {
  isOpen: boolean
  onClose: () => void
  task?: {
    id: number
    task: string
    dueDate: string
    priority: string
    related: string
    type: string
    status: string
  }
}

export function EditTaskDialog({ isOpen, onClose, task }: EditTaskDialogProps) {
  const { toast } = useToast()
  const [date, setDate] = useState<Date | undefined>(
    task?.dueDate && !["Today", "Tomorrow"].includes(task.dueDate) ? new Date(task.dueDate) : undefined,
  )

  const [formData, setFormData] = useState({
    task: task?.task || "",
    dueDate: task?.dueDate || "Today",
    priority: task?.priority || "Medium",
    related: task?.related || "",
    type: task?.type || "Call",
    status: task?.status || "Pending",
    reminder: false,
    reminderTime: "15min",
    notes: "",
  })

  useEffect(() => {
    if (task) {
      setFormData({
        task: task.task || "",
        dueDate: task.dueDate || "Today",
        priority: task.priority || "Medium",
        related: task.related || "",
        type: task.type || "Call",
        status: task.status || "Pending",
        reminder: false,
        reminderTime: "15min",
        notes: "",
      })

      // Set the date if it exists and is not Today/Tomorrow
      if (task.dueDate && !["Today", "Tomorrow"].includes(task.dueDate)) {
        try {
          setDate(new Date(task.dueDate))
        } catch (e) {
          setDate(undefined)
        }
      }
    } else {
      // Reset form for new task
      setFormData({
        task: "",
        dueDate: "Today",
        priority: "Medium",
        related: "",
        type: "Call",
        status: "Pending",
        reminder: false,
        reminderTime: "15min",
        notes: "",
      })
      setDate(undefined)
    }
  }, [task])

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.task) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Format the date
    let formattedDueDate = formData.dueDate
    if (formData.dueDate === "custom" && date) {
      formattedDueDate = format(date, "MMM dd, yyyy")
    }

    // Here you would typically save the data to your backend
    // For now, we'll just show a success message
    toast({
      title: task ? "Task updated" : "Task created",
      description: `Task has been ${task ? "updated" : "created"} successfully.`,
    })

    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{task ? "Edit Task" : "Create New Task"}</DialogTitle>
          <DialogDescription>
            {task
              ? "Update the task information below."
              : "Add a new task or follow-up. All fields marked with * are required."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="task-title">Task Title *</Label>
            <Input
              id="task-title"
              value={formData.task}
              onChange={(e) => handleChange("task", e.target.value)}
              placeholder="Enter task title"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="due-date">Due Date *</Label>
              <Select value={formData.dueDate} onValueChange={(value) => handleChange("dueDate", value)}>
                <SelectTrigger id="due-date">
                  <SelectValue placeholder="Select due date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Today">Today</SelectItem>
                  <SelectItem value="Tomorrow">Tomorrow</SelectItem>
                  <SelectItem value="custom">Custom Date</SelectItem>
                </SelectContent>
              </Select>
              {formData.dueDate === "custom" && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "mt-2 w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="priority">Priority *</Label>
              <Select value={formData.priority} onValueChange={(value) => handleChange("priority", value)}>
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="task-type">Task Type *</Label>
              <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
                <SelectTrigger id="task-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Call">Call</SelectItem>
                  <SelectItem value="Email">Email</SelectItem>
                  <SelectItem value="Meeting">Meeting</SelectItem>
                  <SelectItem value="Follow-up">Follow-up</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="related-to">Related To</Label>
              <Select value={formData.related} onValueChange={(value) => handleChange("related", value)}>
                <SelectTrigger id="related-to">
                  <SelectValue placeholder="Select contact or deal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sarah Johnson">Sarah Johnson (Lead)</SelectItem>
                  <SelectItem value="Michael Chen">Michael Chen (Deal)</SelectItem>
                  <SelectItem value="Jessica Williams">Jessica Williams (Lead)</SelectItem>
                  <SelectItem value="Acme Corp">Acme Corp (Deal)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              placeholder="Add details about this task"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="reminder"
              checked={formData.reminder}
              onCheckedChange={(checked) => handleChange("reminder", Boolean(checked))}
            />
            <Label htmlFor="reminder">Set reminder</Label>
          </div>
          {formData.reminder && (
            <div className="grid gap-2 reminder-options">
              <div className="flex items-center space-x-2 ml-6">
                <Select value={formData.reminderTime} onValueChange={(value) => handleChange("reminderTime", value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Reminder time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15min">15 minutes before</SelectItem>
                    <SelectItem value="30min">30 minutes before</SelectItem>
                    <SelectItem value="1hour">1 hour before</SelectItem>
                    <SelectItem value="1day">1 day before</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>{task ? "Update Task" : "Create Task"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
