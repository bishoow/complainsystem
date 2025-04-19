import { type NextRequest, NextResponse } from "next/server"
import { addComplaint, generateComplaintId } from "@/lib/complaints-store"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Generate a unique complaint ID (e.g., ABC123)
   // const complaintId = generateComplaintId()

    // Create the complaint in our in-memory store
    const id = addComplaint({
      ...data,
      // Add any missing fields with default values
      fullName: data.fullName || "",
      idNumber: data.idNumber || "",
      email: data.email || "",
      phone: data.phone || "",
      address: data.address || "",
      department: data.department || "",
      complaintType: data.complaintType || "",
      subject: data.subject || "",
      description: data.description || "",
      location: data.location || "",
      priority: data.priority || "medium",
    })

    return NextResponse.json({
      success: true,
      complaintId: id,
    })
  } catch (error) {
    console.error("Error creating complaint:", error)
    return NextResponse.json({ success: false, error: "Failed to create complaint" }, { status: 500 })
  }
}
