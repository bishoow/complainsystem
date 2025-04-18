// This is a simple in-memory store for complaints
// In a production environment, you would use a database

interface TimelineItem {
  date: string
  status: string
  description: string
}

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
  status: "pending" | "in-progress" | "resolved" | "rejected"
  submittedDate: string
  lastUpdated: string
  timeline: TimelineItem[]
}

// In-memory store for complaints
let complaints: Complaint[] = []

// Generate a random complaint ID (e.g., ABC123)
export function generateComplaintId() {
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
export function addComplaint(
  complaintData: Omit<Complaint, "id" | "status" | "submittedDate" | "lastUpdated" | "timeline">,
): string {
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
  status: "pending" | "in-progress" | "resolved" | "rejected",
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

// For testing: Add some sample complaints
export function addSampleComplaints() {
  if (complaints.length === 0) {
    const sampleComplaints = [
      {
        id: "ABC123",
        fullName: "John Doe",
        idNumber: "ID12345678",
        email: "john@example.com",
        phone: "1234567890",
        address: "123 Main St, City",
        department: "Water Supply",
        complaintType: "Service Not Available",
        subject: "Water supply interruption in Sector 7",
        description: "No water supply for the last 3 days in Sector 7 area.",
        location: "Sector 7",
        priority: "high",
        status: "in-progress" as const,
        submittedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        timeline: [
          {
            date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            status: "Submitted",
            description: "Complaint received and registered in the system",
          },
          {
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            status: "Under Review",
            description: "Complaint assigned to Water Department for initial assessment",
          },
          {
            date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            status: "In Progress",
            description: "Field team dispatched to investigate the issue",
          },
        ],
      },
      {
        id: "DEF456",
        fullName: "Jane Smith",
        idNumber: "ID87654321",
        email: "jane@example.com",
        phone: "9876543210",
        address: "456 Park Ave, City",
        department: "Electricity",
        complaintType: "Infrastructure Issue",
        subject: "Street light malfunction on Main Road",
        description: "Street lights not working on Main Road causing safety concerns.",
        location: "Main Road",
        priority: "medium",
        status: "pending" as const,
        submittedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        timeline: [
          {
            date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            status: "Submitted",
            description: "Complaint received and registered in the system",
          },
        ],
      },
    ]

    complaints = sampleComplaints
  }
}

// Initialize with sample data
addSampleComplaints()
