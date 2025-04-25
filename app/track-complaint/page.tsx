"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Search, Clock, CheckCircle, AlertCircle, XCircle } from "lucide-react"
import { toast } from "sonner"
import { getComplaintById } from "@/lib/complaints-store"

interface TimelineItem {
  date: string
  status: string
  description: string
}

interface ComplaintData {
  id: string
  subject: string
  department: string
  status: "pending" | "in-progress" | "resolved" | "rejected"
  submittedDate: string
  lastUpdated: string
  timeline: TimelineItem[]
}

export default function TrackComplaint() {
  const [complaintId, setComplaintId] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [complaintData, setComplaintData] = useState<ComplaintData | null>(null)
  const [error, setError] = useState("")

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!complaintId.trim()) {
      setError("Please enter a complaint ID")
      return
    }

    setIsSearching(true)

    try {
      // Get the complaint from our in-memory store
      const complaint = getComplaintById(complaintId)

      if (complaint) {
        setComplaintData(complaint)
      } else {
        setError("No complaint found with this ID. Please check and try again.")
        setComplaintData(null)
      }
    } catch (error) {
      console.error("Error fetching complaint:", error)
      toast.error("Failed to fetch complaint", {
        description: "Please try again later",
      })
      setError("Failed to fetch complaint. Please try again later.")
    } finally {
      setIsSearching(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-amber-500" />
      case "in-progress":
        return <AlertCircle className="h-5 w-5 text-blue-500" />
      case "resolved":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-slate-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending Review"
      case "in-progress":
        return "In Progress"
      case "resolved":
        return "Resolved"
      case "rejected":
        return "Rejected"
      default:
        return status
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-amber-600"
      case "in-progress":
        return "text-blue-600"
      case "resolved":
        return "text-green-600"
      case "rejected":
        return "text-red-600"
      default:
        return "text-slate-600"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="flex items-center text-slate-600 hover:text-slate-900 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <Card className="max-w-3xl mx-auto shadow-md">
        <CardHeader  className="bg-slate-800 text-white rounded-t-lg p-6 border-4 border-blue-00 w-full max-w-3xl">
          <CardTitle>Track Your Complaint</CardTitle>
          <CardDescription className="text-slate-200">
            Enter your complaint ID to check its current status
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="complaintId">Complaint ID</Label>
              <div className="flex gap-2">
                <Input
                  id="complaintId"
                  value={complaintId}
                  onChange={(e) => setComplaintId(e.target.value.toUpperCase())}
                  placeholder="Enter your complaint ID (e.g., ABC123)"
                  className="flex-1"
                />
                <Button type="submit" className="bg-slate-800 hover:bg-slate-700" disabled={isSearching}>
                  {isSearching ? "Searching..." : "Track"}
                  {!isSearching && <Search className="ml-2 h-4 w-4" />}
                </Button>
              </div>
              {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
            </div>
          </form>

          {complaintData && (
            <div className="mt-8 space-y-6">
              <div className="bg-slate-50 p-6 rounded-lg border border-slate-100">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium">{complaintData.subject}</h3>
                    <p className="text-sm text-slate-500">Department: {complaintData.department}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(complaintData.status)}
                    <span className={`font-medium ${getStatusColor(complaintData.status)}`}>
                      {getStatusText(complaintData.status)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-500">Complaint ID</p>
                    <p className="font-medium font-mono">{complaintData.id}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Submitted On</p>
                    <p className="font-medium">{new Date(complaintData.submittedDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Last Updated</p>
                    <p className="font-medium">{new Date(complaintData.lastUpdated).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Expected Resolution</p>
                    <p className="font-medium">Within 7 working days</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-4">Complaint Timeline</h3>
                <div className="space-y-4">
                  {complaintData.timeline.map((item, index) => (
                    <div key={index} className="relative pl-6 pb-4">
                      {index !== complaintData.timeline.length - 1 && (
                        <div className="absolute left-[0.6rem] top-2 w-0.5 h-full bg-slate-200"></div>
                      )}
                      <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-slate-800"></div>
                      <div>
                        <div className="flex justify-between">
                          <p className="font-medium">{item.status}</p>
                          <p className="text-sm text-slate-500">{new Date(item.date).toLocaleDateString()}</p>
                        </div>
                        <p className="text-sm text-slate-600 mt-1">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t px-6 py-4">
          <Button asChild variant="outline">
            <Link href="/">Return to Home</Link>
          </Button>
          <Button asChild className="bg-slate-800 hover:bg-slate-700">
            <Link href="/submit-complaint">Submit New Complaint</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
