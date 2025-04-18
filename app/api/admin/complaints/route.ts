import { NextResponse } from "next/server"
import { getAllComplaints, updateComplaintStatus } from "@/lib/complaints-store"

export async function GET() {
  try {
    const complaints = getAllComplaints()
    return NextResponse.json({ success: true, complaints })
  } catch (error) {
    console.error("Error fetching complaints:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch complaints" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    const { id, status, description } = data

    if (!id || !status || !description) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: id, status, description" },
        { status: 400 },
      )
    }

    const updated = updateComplaintStatus(id, status, description)

    if (!updated) {
      return NextResponse.json({ success: false, error: "Complaint not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating complaint:", error)
    return NextResponse.json({ success: false, error: "Failed to update complaint" }, { status: 500 })
  }
}
