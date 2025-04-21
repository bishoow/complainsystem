"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, BarChart3, PieChart, TrendingUp, Download } from "lucide-react"
import { getAllComplaints } from "@/lib/complaints-store"

interface Complaint {
  department: string
  complaintType: string
  status: "resolved" | "in-progress" | "pending" | "rejected"
  // Add more fields as needed
}

interface ComplaintStats {
  totalComplaints: number
  resolutionRate: number
  avgResolutionDays: number
  byDepartment: {
    name: string
    count: number
    percentage: number
    color: string
  }[]
  byCategory: {
    name: string
    count: number
    percentage: number
    color: string
  }[]
  byStatus: {
    name: string
    count: number
    percentage: number
    color: string
  }[]
  trend: {
    direction: "up" | "down"
    percentage: number
  }
}

// Helper function to get consistent colors for departments
const getDepartmentColor = (department: string): string => {
  const colorMap: Record<string, string> = {
    "Water Supply": "bg-blue-500",
    Electricity: "bg-yellow-500",
    "Roads & Infrastructure": "bg-green-500",
    "Sanitation & Waste": "bg-purple-500",
    "Public Health": "bg-red-500",
    Education: "bg-orange-500",
    "Public Transport": "bg-indigo-500",
    Other: "bg-slate-500",
  }
  return colorMap[department] || "bg-slate-500"
}

// Helper function to get consistent colors for categories
const getCategoryColor = (category: string): string => {
  const colorMap: Record<string, string> = {
    "Service Not Available": "bg-blue-500",
    "Poor Quality of Service": "bg-yellow-500",
    "Delay in Service": "bg-green-500",
    "Staff Behavior": "bg-purple-500",
    Corruption: "bg-red-500",
    "Infrastructure Issue": "bg-orange-500",
    Other: "bg-slate-500",
  }
  return colorMap[category] || "bg-slate-500"
}

// Moved outside component to avoid React hook lint issues
const generateStatistics = (complaints: Complaint[], timeframe: string): ComplaintStats => {
  if (complaints.length === 0) {
    return {
      totalComplaints: 0,
      resolutionRate: 0,
      avgResolutionDays: 0,
      byDepartment: [],
      byCategory: [],
      byStatus: [],
      trend: {
        direction: "up",
        percentage: 0,
      },
    }
  }

  const departmentCounts: Record<string, number> = {}
  complaints.forEach((complaint) => {
    departmentCounts[complaint.department] = (departmentCounts[complaint.department] || 0) + 1
  })

  const departmentData = Object.entries(departmentCounts).map(([name, count]) => ({
    name,
    count,
    percentage: 0,
    color: getDepartmentColor(name),
  }))

  const totalDeptCount = departmentData.reduce((sum, dept) => sum + dept.count, 0)
  const departmentsWithPercentage = departmentData.map((dept) => ({
    ...dept,
    percentage: Math.round((dept.count / (totalDeptCount || 1)) * 100),
  }))

  const categoryCounts: Record<string, number> = {}
  complaints.forEach((complaint) => {
    categoryCounts[complaint.complaintType] = (categoryCounts[complaint.complaintType] || 0) + 1
  })

  const categoryData = Object.entries(categoryCounts).map(([name, count]) => ({
    name,
    count,
    percentage: 0,
    color: getCategoryColor(name),
  }))

  const totalCatCount = categoryData.reduce((sum, cat) => sum + cat.count, 0)
  const categoriesWithPercentage = categoryData.map((cat) => ({
    ...cat,
    percentage: Math.round((cat.count / (totalCatCount || 1)) * 100),
  }))

  const statusCounts = {
    resolved: 0,
    "in-progress": 0,
    pending: 0,
    rejected: 0,
  }

  complaints.forEach((complaint) => {
    statusCounts[complaint.status] += 1
  })

  const statusData = [
    { name: "Resolved", count: statusCounts.resolved, color: "bg-green-500" },
    { name: "In Progress", count: statusCounts["in-progress"], color: "bg-blue-500" },
    { name: "Pending Review", count: statusCounts.pending, color: "bg-amber-500" },
    { name: "Rejected", count: statusCounts.rejected, color: "bg-red-500" },
  ]

  const totalStatusCount = statusData.reduce((sum, status) => sum + status.count, 0)
  const statusesWithPercentage = statusData.map((status) => ({
    ...status,
    percentage: Math.round((status.count / (totalStatusCount || 1)) * 100),
  }))

  const resolvedCount = statusCounts.resolved
  const resolutionRate = Math.round((resolvedCount / (totalStatusCount || 1)) * 100)

  return {
    totalComplaints: complaints.length,
    resolutionRate,
    avgResolutionDays: 5.2,
    byDepartment: departmentsWithPercentage,
    byCategory: categoriesWithPercentage,
    byStatus: statusesWithPercentage,
    trend: {
      direction: "up",
      percentage: 5,
    },
  }
}

export default function Statistics() {
  const [timeframe, setTimeframe] = useState("month")
  const [stats, setStats] = useState<ComplaintStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      const complaints = getAllComplaints()
      const data = generateStatistics(complaints, timeframe)
      setStats(data)
      setLoading(false)
    }, 500)
  }, [timeframe])

  // Component JSX stays unchanged...
  // (The rest of your rendering logic remains the same)
}
