{/*"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, BarChart3, PieChart, TrendingUp, Download } from "lucide-react"

// Define our complaint data structure
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

export default function Statistics() {
  const [timeframe, setTimeframe] = useState("month")
  const [stats, setStats] = useState<ComplaintStats | null>(null)
  const [loading, setLoading] = useState(true)

  // Simulate fetching statistics data
  useEffect(() => {
    setLoading(true)

    // Simulate API delay
    setTimeout(() => {
      // Generate statistics based on timeframe
      const data: ComplaintStats = generateStatistics(timeframe)
      setStats(data)
      setLoading(false)
    }, 800)
  }, [timeframe])

  // Function to generate mock statistics based on timeframe
  const generateStatistics = (timeframe: string): ComplaintStats => {
    // Base numbers that will be adjusted by timeframe
    let baseTotal = 0
    let multiplier = 1

    switch (timeframe) {
      case "week":
        baseTotal = 320
        multiplier = 1
        break
      case "month":
        baseTotal = 1248
        multiplier = 4
        break
      case "quarter":
        baseTotal = 3750
        multiplier = 12
        break
      case "year":
        baseTotal = 15200
        multiplier = 48
        break
    }

    // Department data - matches our complaint tracking system
    const departmentData = [
      { name: "Water Supply", count: Math.round(baseTotal * 0.26), color: "bg-blue-500" },
      { name: "Electricity", count: Math.round(baseTotal * 0.23), color: "bg-yellow-500" },
      { name: "Roads & Infrastructure", count: Math.round(baseTotal * 0.17), color: "bg-green-500" },
      { name: "Sanitation & Waste", count: Math.round(baseTotal * 0.16), color: "bg-purple-500" },
      { name: "Public Health", count: Math.round(baseTotal * 0.09), color: "bg-red-500" },
      { name: "Public Works", count: Math.round(baseTotal * 0.05), color: "bg-orange-500" },
      { name: "Others", count: Math.round(baseTotal * 0.04), color: "bg-slate-500" },
    ]

    // Calculate percentages for departments
    const totalDeptCount = departmentData.reduce((sum, dept) => sum + dept.count, 0)
    const departmentsWithPercentage = departmentData.map((dept) => ({
      ...dept,
      percentage: Math.round((dept.count / totalDeptCount) * 100),
    }))

    // Category data - matches our complaint form categories
    const categoryData = [
      { name: "Service Not Available", count: Math.round(baseTotal * 0.29), color: "bg-blue-500" },
      { name: "Poor Quality of Service", count: Math.round(baseTotal * 0.24), color: "bg-yellow-500" },
      { name: "Delay in Service", count: Math.round(baseTotal * 0.18), color: "bg-green-500" },
      { name: "Staff Behavior", count: Math.round(baseTotal * 0.12), color: "bg-purple-500" },
      { name: "Infrastructure Issue", count: Math.round(baseTotal * 0.1), color: "bg-red-500" },
      { name: "Others", count: Math.round(baseTotal * 0.07), color: "bg-slate-500" },
    ]

    // Calculate percentages for categories
    const totalCatCount = categoryData.reduce((sum, cat) => sum + cat.count, 0)
    const categoriesWithPercentage = categoryData.map((cat) => ({
      ...cat,
      percentage: Math.round((cat.count / totalCatCount) * 100),
    }))

    // Status data - matches our complaint statuses
    const resolvedCount = Math.round(baseTotal * 0.78)
    const inProgressCount = Math.round(baseTotal * 0.13)
    const pendingCount = Math.round(baseTotal * 0.07)
    const rejectedCount = Math.round(baseTotal * 0.02)

    const statusData = [
      { name: "Resolved", count: resolvedCount, color: "bg-green-500" },
      { name: "In Progress", count: inProgressCount, color: "bg-blue-500" },
      { name: "Pending Review", count: pendingCount, color: "bg-amber-500" },
      { name: "Rejected", count: rejectedCount, color: "bg-red-500" },
    ]

    // Calculate percentages for statuses
    const totalStatusCount = statusData.reduce((sum, status) => sum + status.count, 0)
    const statusesWithPercentage = statusData.map((status) => ({
      ...status,
      percentage: Math.round((status.count / totalStatusCount) * 100),
    }))

    // Generate random trend data
    const trendDirection = Math.random() > 0.3 ? "up" : ("down" as "up" | "down")
    const trendPercentage = Math.floor(Math.random() * 15) + 1

    return {
      totalComplaints: baseTotal,
      resolutionRate: 78,
      avgResolutionDays: 5.2,
      byDepartment: departmentsWithPercentage,
      byCategory: categoriesWithPercentage,
      byStatus: statusesWithPercentage,
      trend: {
        direction: trendDirection,
        percentage: trendPercentage,
      },
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="flex items-center text-slate-600 hover:text-slate-900 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold">Complaint Statistics</h1>
            <p className="text-slate-500">Public data on registered complaints and resolution performance</p>
          </div>

          <div className="flex items-center gap-3">
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="quarter">Last Quarter</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export Data
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-pulse text-slate-500">Loading statistics...</div>
          </div>
        ) : (
          stats && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-slate-500">Total Complaints</p>
                        <p className="text-3xl font-bold">{stats.totalComplaints.toLocaleString()}</p>
                      </div>
                      <div className="bg-slate-100 p-2 rounded-full">
                        <BarChart3 className="h-5 w-5 text-slate-600" />
                      </div>
                    </div>
                    <div className="flex items-center mt-4 text-sm">
                      {stats.trend.direction === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <TrendingUp className="h-4 w-4 text-red-500 mr-1 transform rotate-180" />
                      )}
                      <span
                        className={`${stats.trend.direction === "up" ? "text-green-500" : "text-red-500"} font-medium`}
                      >
                        {stats.trend.percentage}%{" "}
                      </span>
                      <span className="text-slate-500 ml-1">from previous period</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-slate-500">Resolution Rate</p>
                        <p className="text-3xl font-bold">{stats.resolutionRate}%</p>
                      </div>
                      <div className="bg-slate-100 p-2 rounded-full">
                        <PieChart className="h-5 w-5 text-slate-600" />
                      </div>
                    </div>
                    <div className="flex items-center mt-4 text-sm">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-500 font-medium">5% </span>
                      <span className="text-slate-500 ml-1">from previous period</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-slate-500">Avg. Resolution Time</p>
                        <p className="text-3xl font-bold">{stats.avgResolutionDays} days</p>
                      </div>
                      <div className="bg-slate-100 p-2 rounded-full">
                        <TrendingUp className="h-5 w-5 text-slate-600" />
                      </div>
                    </div>
                    <div className="flex items-center mt-4 text-sm">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-500 font-medium">8% </span>
                      <span className="text-slate-500 ml-1">faster than target</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="department" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="department">By Department</TabsTrigger>
                  <TabsTrigger value="category">By Category</TabsTrigger>
                  <TabsTrigger value="status">By Status</TabsTrigger>
                </TabsList>

                <TabsContent value="department">
                  <Card>
                    <CardHeader>
                      <CardTitle>Complaints by Department</CardTitle>
                      <CardDescription>
                        Distribution of complaints across different government departments
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {stats.byDepartment.map((dept, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">{dept.name}</span>
                              <span className="text-sm text-slate-500">
                                {dept.count.toLocaleString()} ({dept.percentage}%)
                              </span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2.5">
                              <div
                                className={`${dept.color} h-2.5 rounded-full`}
                                style={{ width: `${dept.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="category">
                  <Card>
                    <CardHeader>
                      <CardTitle>Complaints by Category</CardTitle>
                      <CardDescription>Distribution of complaints by category type</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {stats.byCategory.map((cat, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">{cat.name}</span>
                              <span className="text-sm text-slate-500">
                                {cat.count.toLocaleString()} ({cat.percentage}%)
                              </span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2.5">
                              <div
                                className={`${cat.color} h-2.5 rounded-full`}
                                style={{ width: `${cat.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="status">
                  <Card>
                    <CardHeader>
                      <CardTitle>Complaints by Status</CardTitle>
                      <CardDescription>Current status of all complaints in the system</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {stats.byStatus.map((status, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">{status.name}</span>
                              <span className="text-sm text-slate-500">
                                {status.count.toLocaleString()} ({status.percentage}%)
                              </span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2.5">
                              <div
                                className={`${status.color} h-2.5 rounded-full`}
                                style={{ width: `${status.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )
        )}
      </div>
    </div>
  )
}
*/}