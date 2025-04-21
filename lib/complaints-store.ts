// This is a simple in-memory store for complaints
// In a production environment, you would use a database

export interface TimelineItem {
  date: string
  status: string
  description: string
}

export type ComplaintStatus = "pending" | "in-progress" | "resolved" | "rejected"

export interface Complaint {
  id: string
  fullName: string
  idNumber: string
  email: string
  phone: string
  address: string
  department: string
  complaintType: string
  subject: string
  description: string
  location: string
  priority: string
  status: ComplaintStatus
  submittedDate: string
  lastUpdated: string
  timeline: TimelineItem[]
}

// Define the input type expected by addComplaint (excluding auto-generated fields)
export type NewComplaintInput = Omit<Complaint, "id" | "status" | "submittedDate" | "lastUpdated" | "timeline">

// In-memory store for complaints
const complaints: Complaint[] = []

// Generate a random complaint ID (e.g., ABC123)
export function generateComplaintId(): string {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const numbers = "0123456789"
  let id = ""

  // Add 3 random letters
  for (let i = 0; i < 3; i++) {
    id += letters.charAt(Math.floor(Math.random() * letters.length))
  }

  // Add 3 random numbers
  for (let i = 0; i < 3; i++) {
    id += numbers.charAt(Math.floor(Math.random() * numbers.length))
  }

  return id
}

// Add a new complaint
export function addComplaint(complaintData: NewComplaintInput): string {
  const now = new Date().toISOString()
  const id = generateComplaintId()

  const newComplaint: Complaint = {
    ...complaintData,
    id,
    status: "pending",
    submittedDate: now,
    lastUpdated: now,
    timeline: [
      {
        date: now,
        status: "Submitted",
        description: "Complaint received and registered in the system",
      },
    ],
  }

  complaints.push(newComplaint)
  return id
}

// Get a complaint by ID
export function getComplaintById(id: string): Complaint | undefined {
  return complaints.find((complaint) => complaint.id === id)
}

// Get all complaints
export function getAllComplaints(): Complaint[] {
  return [...complaints]
}

// Update a complaint's status
export function updateComplaintStatus(
  id: string,
  status: ComplaintStatus,
  description: string,
): boolean {
  const complaint = complaints.find((c) => c.id === id)

  if (!complaint) {
    return false
  }

  complaint.status = status
  complaint.lastUpdated = new Date().toISOString()
  complaint.timeline.push({
    date: new Date().toISOString(),
    status:
      status === "in-progress"
        ? "In Progress"
        : status === "resolved"
        ? "Resolved"
        : status === "rejected"
        ? "Rejected"
        : "Pending Review",
    description,
  })

  return true
}
