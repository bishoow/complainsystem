import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, FileText, BarChart3, Clock } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <div className="bg-slate-800 text-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold">Citizen Complaint Portal</h1>
          <p className="mt-2 text-slate-200">A platform for citizens to report issues with government services</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Submit a Complaint</h3>
                <p className="text-sm text-muted-foreground mt-1">Report an issue with any government service</p>
              </div>
              <FileText className="h-8 w-8 text-slate-600" />
            </div>
            <Button asChild className="w-full mt-4 bg-slate-800 hover:bg-slate-700">
              <Link href="/submit-complaint">
                File Complaint <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Track Complaint</h3>
                <p className="text-sm text-muted-foreground mt-1">Check the status of your submitted complaint</p>
              </div>
              <Clock className="h-8 w-8 text-slate-600" />
            </div>
            <Button asChild className="w-full mt-4 bg-slate-800 hover:bg-slate-700">
              <Link href="/track-complaint">
                Track Status <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Complaint Statistics</h3>
                <p className="text-sm text-muted-foreground mt-1">View public data on complaint resolution</p>
              </div>
              <BarChart3 className="h-8 w-8 text-slate-600" />
            </div>
            <Button asChild className="w-full mt-4 bg-slate-800 hover:bg-slate-700">
              <Link href="/statistics">
                View Statistics <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-4">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="bg-slate-800 text-white rounded-full w-10 h-10 flex items-center justify-center mb-3">
              1
            </div>
            <h3 className="font-medium mb-2">Submit Your Complaint</h3>
            <p className="text-sm text-muted-foreground">Fill out the complaint form with all relevant details</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-slate-800 text-white rounded-full w-10 h-10 flex items-center justify-center mb-3">
              2
            </div>
            <h3 className="font-medium mb-2">Receive Tracking ID</h3>
            <p className="text-sm text-muted-foreground">Get a unique ID to track your complaint status</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-slate-800 text-white rounded-full w-10 h-10 flex items-center justify-center mb-3">
              3
            </div>
            <h3 className="font-medium mb-2">Get Resolution</h3>
            <p className="text-sm text-muted-foreground">Concerned department will address your complaint</p>
          </div>
        </div>
      </div>

      <footer className="text-center text-sm text-muted-foreground mt-12">
        <p>© {new Date().getFullYear()} E-Governance Citizen Complaint Portal. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-2">
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:underline">
            Terms of Service
          </Link>
        </div>
      </footer>
    </div>
  )
}
