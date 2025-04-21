// This file is kept for compatibility with existing imports
// We're now using the in-memory store in complaints-store.ts instead of Prisma

// Re-export the complaints store functions for backward compatibility
import {
  addComplaint,
  getComplaintById,
  getAllComplaints,
  updateComplaintStatus,
  generateComplaintId,
  NewComplaintInput,
  ComplaintStatus,
  Complaint, // 👈 needed for return types
} from "./complaints-store"

export { addComplaint, getComplaintById, getAllComplaints, updateComplaintStatus, generateComplaintId }

interface CreateInput {
  data: NewComplaintInput
}

interface UpdateInput {
  data: {
    id: string
    status: ComplaintStatus
    description: string
  }
}

interface FindUniqueInput {
  where: {
    complaintId: string
  }
}

// Export a dummy object for any code that might be using prisma directly
export const prisma = {
  complaint: {
    create: async (data: CreateInput): Promise<Complaint> => {
      const id = addComplaint(data.data)
      return {
        id,
        status: "pending",
        submittedDate: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        timeline: [
          {
            date: new Date().toISOString(),
            status: "Submitted",
            description: "Complaint received and registered in the system",
          },
        ],
        ...data.data,
      }
    },
    findUnique: async (query: FindUniqueInput): Promise<Complaint | undefined> => {
      return getComplaintById(query.where.complaintId)
    },
    findMany: async (): Promise<Complaint[]> => {
      return getAllComplaints()
    },
    update: async (query: UpdateInput): Promise<Complaint | undefined> => {
      const { id, status, description } = query.data
      updateComplaintStatus(id, status, description)
      return getComplaintById(id)
    },
  },
}

export default prisma
