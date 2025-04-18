// This file is kept for compatibility with existing imports
// We're now using the in-memory store in complaints-store.ts instead of Prisma

// Re-export the complaints store functions for backward compatibility
import {
  addComplaint,
  getComplaintById,
  getAllComplaints,
  updateComplaintStatus,
  generateComplaintId,
} from "./complaints-store"

export { addComplaint, getComplaintById, getAllComplaints, updateComplaintStatus, generateComplaintId }

// Export a dummy object for any code that might be using prisma directly
export const prisma = {
  complaint: {
    create: async (data: any) => {
      const id = addComplaint(data.data)
      return { id, complaintId: id, ...data.data }
    },
    findUnique: async (query: any) => {
      return getComplaintById(query.where.complaintId)
    },
    findMany: async () => {
      return getAllComplaints()
    },
    update: async (query: any) => {
      const { id, status, description } = query.data
      updateComplaintStatus(id, status, description)
      return getComplaintById(id)
    },
  },
}

export default prisma
