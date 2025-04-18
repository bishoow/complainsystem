import { type NextRequest, NextResponse } from "next/server"
import { getComplaintById } from "@/lib/complaints-store"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const complaintId = params.id

    // Find the complaint by its ID
    const complaint = getComplaintById(complaintId)

    if (!complaint) {
      return NextResponse.json({ success: false, error: "Complaint not found" }, { status: 404 })
    }

    // Format the data for the frontend
    const formattedComplaint = {
      id: complaint.id,
      subject: complaint.subject,
      department: complaint.department,
      status: complaint.status,
      submittedDate: complaint.submittedDate,
      lastUpdated: complaint.lastUpdated,
      timeline: complaint.timeline,
    }

    return NextResponse.json({
      success: true,
      complaint: formattedComplaint,
    })
  } catch (error) {
    console.error("Error fetching complaint:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch complaint" }, { status: 500 })
  }
}
