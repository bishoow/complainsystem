import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, FileText, Clock } from "lucide-react"
import Image from 'next/image';

export default function Home() {
  return (
    <div className="container mx-auto  px-4 py-8 pt-1">
     {/* Nepali Government Header */}
<div className="md:w-4/5 mx-auto flex justify-between items-center pt-0 py-4 border-b border-gray-300 mb-8">
  {/* Left: Government Emblem */}
 

<div className="flex-shrink-0">
  <Image
    src="/images/Emblem_of_Nepal.svg"
    alt="Government of Nepal Emblem"
    width={90}
    height={80}
  />
</div>


  {/* Center: Text in Nepali */}
  <div className="text-center">
    <h2 className="text-2xl font-medium leading-snug text-red-800">Government of Nepal</h2>
    <h2 className="text-2xl font-medium leading-snug text-red-800">Office of the Prime Minister and Council of MInister</h2>
    <h1 className="text-2xl font-bold text-red-700"></h1>
    <h2 className="text-2xl font-medium leading-snug text-red-800">SinghaDurbar,Kathmandu</h2>
  </div>

  {/* Right: Nepali Flag and Date/Time */}
  <div className="text-right flex flex-col items-end gap-1">
    <img
      src="/images/Flag_of_Nepal.gif"
      alt="Nepali Flag"
      style={{ width: "60px", height: "auto" }}
    />

  </div>
</div>

      {/* Portal Main Content */}
      <header className="mb-8">
        <div className="bg-slate-800 text-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold">JanSewa Voice</h1>
          <p className="mt-2 text-slate-200">
            A platform for citizens to report issues with government services
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-15">
        {/* Submit a Complaint Card */}
        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Submit a Complaint</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Report an issue with any government service
                </p>
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

        {/* Track Complaint Card */}
        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Track Complaint</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Check the status of your submitted complaint
                </p>
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
      </div>
      {/* How It Works Section */}
      <div className="bg-slate-50 p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-4">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Submit Your Complaint", desc: "Fill out the complaint form with all relevant details" },
            { title: "Receive Tracking ID", desc: "Get a unique ID to track your complaint status" },
            { title: "Get Resolution", desc: "Concerned department will address your complaint" },
          ].map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="bg-slate-800 text-white rounded-full w-10 h-10 flex items-center justify-center mb-3">
                {index + 1}
              </div>
              <h3 className="font-medium mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
