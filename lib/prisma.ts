// This file is kept for compatibility with existing imports
// We're now using the in-memory store in complaints-store.ts instead of Prisma

// Re-export the complaints store functions for backward compatibility
import {
  addComplaint,
  getComplaintById,
  getAllComplaints,
  updateComplaintStatus,
  generateComplaintId,
  NewComplaintInput, // ✅ Import the correct type
  ComplaintStatus,   // ✅ Import this to restrict valid status values
} from "./complaints-store"

export { addComplaint, getComplaintById, getAllComplaints, updateComplaintStatus, generateComplaintId }

interface CreateInput {
  data: NewComplaintInput // ✅ USE the actual expected type from complaints-store.ts
}

interface UpdateInput {
  data: {
    id: string
    status: ComplaintStatus // ✅ Limit to accepted strings
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
    create: async (data: CreateInput) => {
      const id = addComplaint(data.data)
      return { id, complaintId: id, ...data.data }
    },
    findUnique: async (query: FindUniqueInput) => {
      return getComplaintById(query.where.complaintId)
    },
    findMany: async () => {
      return getAllComplaints()
    },
    update: async (query: UpdateInput) => {
      const { id, status, description } = query.data
      updateComplaintStatus(id, status, description)
      return getComplaintById(id)
    },
  },
}

export default prisma
