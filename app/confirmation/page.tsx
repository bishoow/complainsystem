"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, ArrowRight, Printer, Download } from "lucide-react"

export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  const complaintId = searchParams.get("id") || "UNKNOWN"

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-2xl mx-auto shadow-md">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Complaint Submitted Successfully</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-100">
            <div className="text-center mb-4">
              <p className="text-sm text-slate-500">Your Complaint ID</p>
              <p className="text-2xl font-bold font-mono">{complaintId}</p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Submission Date:</span>
                <span className="font-medium">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Current Status:</span>
                <span className="font-medium text-amber-600">Pending Review</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estimated Response:</span>
                <span className="font-medium">Within 7 working days</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">What happens next?</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="bg-slate-800 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  1
                </div>
                <p className="text-sm">
                  Your complaint will be reviewed by our team and assigned to the relevant department.
                </p>
              </li>
              <li className="flex items-start">
                <div className="bg-slate-800 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  2
                </div>
                <p className="text-sm">You will receive updates via email and SMS as your complaint progresses.</p>
              </li>
              <li className="flex items-start">
                <div className="bg-slate-800 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  3
                </div>
                <p className="text-sm">
                  You can track the status of your complaint using your Complaint ID at any time.
                </p>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button variant="outline" className="flex-1 gap-2">
              <Printer className="h-4 w-4" />
              Print Receipt
            </Button>
            <Button variant="outline" className="flex-1 gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4 justify-between border-t px-6 py-4">
          <Button asChild variant="outline">
            <Link href="/">Return to Home</Link>
          </Button>
          <Button asChild className="bg-slate-800 hover:bg-slate-700">
            <Link href="/track-complaint">
              Track Your Complaint <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
