"use client"

import type React from "react"

import { useState } from "react"
import { Search, Filter, X, ChevronDown, Calendar, DollarSign, Tag, User, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "./date-range-picker"
import { cn } from "@/lib/utils"

interface LeadFiltersProps {
  onFilterChange: (filters: any) => void
  className?: string
}

export function LeadFilters({ onFilterChange, className }: LeadFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  // Filter states
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })
  const [valueRange, setValueRange] = useState([0, 50000])
  const [selectedSources, setSelectedSources] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedOwners, setSelectedOwners] = useState<string[]>([])
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([])

  const sources = ["Website", "Referral", "LinkedIn", "Cold Call", "Email", "Social Media", "Event", "Other"]
  const tags = ["Hot Lead", "Needs Follow-up", "VIP", "New Business", "Expansion", "Enterprise", "SMB", "Startup"]
  const owners = ["John Doe", "Sarah Johnson", "Michael Chen", "Jessica Williams", "David Rodriguez"]
  const priorities = ["High", "Medium", "Low"]

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    applyFilters()
  }

  const toggleSource = (source: string) => {
    setSelectedSources((prev) => (prev.includes(source) ? prev.filter((s) => s !== source) : [...prev, source]))
    updateActiveFilters()
    applyFilters()
  }

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
    updateActiveFilters()
    applyFilters()
  }

  const toggleOwner = (owner: string) => {
    setSelectedOwners((prev) => (prev.includes(owner) ? prev.filter((o) => o !== owner) : [...prev, owner]))
    updateActiveFilters()
    applyFilters()
  }

  const togglePriority = (priority: string) => {
    setSelectedPriorities((prev) =>
      prev.includes(priority) ? prev.filter((p) => p !== priority) : [...prev, priority],
    )
    updateActiveFilters()
    applyFilters()
  }

  const handleValueRangeChange = (values: number[]) => {
    setValueRange(values)
    updateActiveFilters()
    applyFilters()
  }

  const handleDateRangeChange = (range: { from: Date | undefined; to: Date | undefined }) => {
    setDateRange(range)
    updateActiveFilters()
    applyFilters()
  }

  const updateActiveFilters = () => {
    const filters = []

    if (selectedSources.length > 0) filters.push("Source")
    if (selectedTags.length > 0) filters.push("Tags")
    if (selectedOwners.length > 0) filters.push("Owner")
    if (selectedPriorities.length > 0) filters.push("Priority")
    if (dateRange.from && dateRange.to) filters.push("Date Range")
    if (valueRange[0] > 0 || valueRange[1] < 50000) filters.push("Value Range")

    setActiveFilters(filters)
  }

  const applyFilters = () => {
    onFilterChange({
      searchTerm,
      sources: selectedSources,
      tags: selectedTags,
      owners: selectedOwners,
      priorities: selectedPriorities,
      dateRange,
      valueRange,
    })
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedSources([])
    setSelectedTags([])
    setSelectedOwners([])
    setSelectedPriorities([])
    setDateRange({ from: undefined, to: undefined })
    setValueRange([0, 50000])
    setActiveFilters([])

    onFilterChange({
      searchTerm: "",
      sources: [],
      tags: [],
      owners: [],
      priorities: [],
      dateRange: { from: undefined, to: undefined },
      valueRange: [0, 50000],
    })
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search leads by name, company, email or phone"
            className="pl-10 pr-4 py-2 w-full"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={showFilters ? "default" : "outline"}
            size="sm"
            className="flex items-center gap-1"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            Filters
            {activeFilters.length > 0 && <Badge className="ml-1 bg-white text-primary">{activeFilters.length}</Badge>}
          </Button>

          <Select defaultValue="all">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Leads</SelectItem>
              <SelectItem value="recent">Recently Added</SelectItem>
              <SelectItem value="mine">My Leads</SelectItem>
              <SelectItem value="unassigned">Unassigned</SelectItem>
              <SelectItem value="kanban">Kanban Board</SelectItem>
              <SelectItem value="list">List View</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="created">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="created">Date Created</SelectItem>
              <SelectItem value="updated">Last Updated</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="company">Company</SelectItem>
              <SelectItem value="value">Value</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {showFilters && (
        <div className="bg-white p-4 rounded-md border shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Filters</h3>
            {activeFilters.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Date Range Filter */}
            <div>
              <div className="flex items-center mb-2">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <Label>Date Range</Label>
              </div>
              <DatePickerWithRange date={dateRange} setDate={handleDateRangeChange} />
            </div>

            {/* Value Range Filter */}
            <div>
              <div className="flex items-center mb-2">
                <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                <Label>Deal Value</Label>
                <span className="ml-auto text-sm text-gray-500">
                  ${valueRange[0]} - ${valueRange[1]}
                </span>
              </div>
              <Slider
                defaultValue={[0, 50000]}
                max={50000}
                step={1000}
                value={valueRange}
                onValueChange={handleValueRangeChange}
                className="my-4"
              />
            </div>

            {/* Lead Source Filter */}
            <div>
              <div className="flex items-center mb-2">
                <Building className="h-4 w-4 mr-2 text-gray-500" />
                <Label>Lead Source</Label>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {selectedSources.length > 0 ? `${selectedSources.length} selected` : "Select sources"}
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0" align="start">
                  <div className="p-2 max-h-[200px] overflow-auto">
                    {sources.map((source) => (
                      <div key={source} className="flex items-center space-x-2 p-1">
                        <Checkbox
                          id={`source-${source}`}
                          checked={selectedSources.includes(source)}
                          onCheckedChange={() => toggleSource(source)}
                        />
                        <label
                          htmlFor={`source-${source}`}
                          className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {source}
                        </label>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Tags Filter */}
            <div>
              <div className="flex items-center mb-2">
                <Tag className="h-4 w-4 mr-2 text-gray-500" />
                <Label>Tags</Label>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {selectedTags.length > 0 ? `${selectedTags.length} selected` : "Select tags"}
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0" align="start">
                  <div className="p-2 max-h-[200px] overflow-auto">
                    {tags.map((tag) => (
                      <div key={tag} className="flex items-center space-x-2 p-1">
                        <Checkbox
                          id={`tag-${tag}`}
                          checked={selectedTags.includes(tag)}
                          onCheckedChange={() => toggleTag(tag)}
                        />
                        <label
                          htmlFor={`tag-${tag}`}
                          className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {tag}
                        </label>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Owner Filter */}
            <div>
              <div className="flex items-center mb-2">
                <User className="h-4 w-4 mr-2 text-gray-500" />
                <Label>Owner</Label>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {selectedOwners.length > 0 ? `${selectedOwners.length} selected` : "Select owners"}
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0" align="start">
                  <div className="p-2 max-h-[200px] overflow-auto">
                    {owners.map((owner) => (
                      <div key={owner} className="flex items-center space-x-2 p-1">
                        <Checkbox
                          id={`owner-${owner}`}
                          checked={selectedOwners.includes(owner)}
                          onCheckedChange={() => toggleOwner(owner)}
                        />
                        <label
                          htmlFor={`owner-${owner}`}
                          className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {owner}
                        </label>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Priority Filter */}
            <div>
              <div className="flex items-center mb-2">
                <Filter className="h-4 w-4 mr-2 text-gray-500" />
                <Label>Priority</Label>
              </div>
              <div className="flex flex-wrap gap-2">
                {priorities.map((priority) => (
                  <Badge
                    key={priority}
                    variant={selectedPriorities.includes(priority) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => togglePriority(priority)}
                  >
                    {priority}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {activeFilters.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {activeFilters.map((filter) => (
                <Badge key={filter} variant="secondary" className="flex items-center gap-1">
                  {filter}
                  <X className="h-3 w-3 cursor-pointer" />
                </Badge>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
