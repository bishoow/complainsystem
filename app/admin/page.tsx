"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Clock, CheckCircle, AlertCircle, XCircle } from "lucide-react"
import { getAllComplaints, type Complaint } from "@/lib/complaints-store"

export default function AdminPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchComplaints()
  }, [])

  const fetchComplaints = async () => {
    setLoading(true)
    try {
      const allComplaints = getAllComplaints()
      setComplaints(allComplaints)
    } catch (error) {
      console.error("Error fetching complaints:", error)
    } finally {
      setLoading(false)
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <Link href="/" className="flex items-center text-slate-600 hover:text-slate-900">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Complaint Management</CardTitle>
          <CardDescription>View and manage citizen complaints</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading complaints...</div>
          ) : complaints.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No complaints found</div>
          ) : (
            <div className="space-y-4">
              {complaints.map((complaint) => (
                <div key={complaint.id} className="border p-4 rounded-md">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{complaint.subject}</h3>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(complaint.status)}
                      <span>{getStatusText(complaint.status)}</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500">ID: {complaint.id}</p>
                  <p className="text-sm text-slate-500">Department: {complaint.department}</p>
                  <p className="text-sm text-slate-500">
                    Submitted: {new Date(complaint.submittedDate).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
          <div className="mt-4">
            <Button onClick={fetchComplaints}>Refresh</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
