"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
//import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Upload, X } from "lucide-react"
import { toast } from "sonner"
import { addComplaint } from "@/lib/complaints-store"

export default function SubmitComplaint() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    idNumber: "",
    email: "",
    phone: "",
    address: "",
    department: "",
    complaintType: "",
    subject: "",
    colour: "",
    liscenceno:"",
    description: "",
    location: "",
    priority: "medium",
  })

  const [previewImages, setPreviewImages] = useState<{ file: File; preview: string }[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      previewImages.forEach((image) => URL.revokeObjectURL(image.preview))
    }
  }, [previewImages])

  const handleImageUpload = (files: File[]) => {
    // Limit to 5 photos total
    const remainingSlots = 5 - previewImages.length
    const filesToAdd = files.slice(0, remainingSlots)

    if (filesToAdd.length === 0) {
      toast.error("Maximum 5 photos allowed")
      return
    }

    // Check file sizes (5MB limit)
    const validFiles = filesToAdd.filter((file) => file.size <= 5 * 1024 * 1024)
    if (validFiles.length < filesToAdd.length) {
      toast.error("Some files exceed the 5MB limit")
    }

    const newImages = validFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }))

    setPreviewImages((prev) => [...prev, ...newImages])
  }

  const removeImage = (index: number) => {
    setPreviewImages((prev) => {
      const newImages = [...prev]
      URL.revokeObjectURL(newImages[index].preview)
      newImages.splice(index, 1)
      return newImages
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Add the complaint to our in-memory store
      const complaintId = addComplaint(formData)

      toast.success("Complaint Submitted Successfully", {
        description: `Your complaint has been registered with ID: ${complaintId}`,
      })

      router.push(`/confirmation?id=${complaintId}`)
    } catch (error) {
      console.error("Error submitting complaint:", error)
      toast.error("Failed to submit complaint", {
        description: "Please try again later",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="flex items-center text-slate-600 hover:text-slate-900 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <Card className="max-w-3xl mx-auto shadow-md">
      <CardHeader className="bg-slate-800 text-white rounded-t-lg p-6 border-4 border-blue-00 w-full max-w-3xl">
      <CardTitle className="text-white-400">Submit a Complaint</CardTitle>
        <CardDescription className="text-slate-200">
          Please provide details about your complaint
        </CardDescription>
      </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6 pt-6">
            {/* Personal Information section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Personal Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                  
                    id="phone"
                    placeholder="Your contact number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  placeholder="Your current address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Complaint Details section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Vechicle Complaint Details</h3>

              <div className="space-y-2">
                <Label htmlFor="department">Vechicle Type</Label>
                <Select
                  required
                  value={formData.department}
                  onValueChange={(value) => handleSelectChange("department", value)}
                >
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 text-white">
                    <SelectItem value="Car">Car</SelectItem>
                    <SelectItem value="Truck">Truck</SelectItem>
                    <SelectItem value="Bus">Bus</SelectItem>
                    <SelectItem value="Motercycle">Motorcycle</SelectItem>
                    <SelectItem value="Jeep">Jeep</SelectItem>
                    <SelectItem value="Scooter">Scooter</SelectItem>
                    <SelectItem value="Tractor">Tractor</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="complaintType">Pollution Type Observed:</Label>
                <Select
                  required
                  value={formData.complaintType}
                  onValueChange={(value) => handleSelectChange("complaintType", value)}
                >
                  <SelectTrigger id="complaintType">
                    <SelectValue placeholder="Select complaint type" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 text-white">
                    <SelectItem value="Service Not Available">Excessive Black Smoke</SelectItem>
                    <SelectItem value="Poor Quality of Service">Strong Fuel Smell</SelectItem>
                    <SelectItem value="Delay in Service">Leaking Oil</SelectItem>
                    <SelectItem value="Staff Behavior">Staff Behavior</SelectItem>
                    <SelectItem value="Corruption">Noise Pollution</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="Subject">Liscence no</Label>
                <Input
                  id="subject"
                  placeholder=""
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              {/*

              */}

              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description</Label>
                <Textarea
                  id="description"
                  placeholder="Please provide detailed information about your complaint"
                  className="min-h-[150px]"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location of Incident</Label>
                <Input
                  id="location"
                  placeholder="Where did this issue occur?"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="colour">Vechicle Colour</Label>
                <Input
                  id="colour"
                  placeholder="Colour of the vechicle?"
                  value={formData.colour}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Supporting Photos</Label>
                <div
                  className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center relative"
                  onDragOver={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onDrop={(e) => {
                    e.preventDefault()
                    e.stopPropagation()

                    const files = Array.from(e.dataTransfer.files)
                    const imageFiles = files.filter((file) => file.type.startsWith("image/"))

                    if (imageFiles.length > 0) {
                      handleImageUpload(imageFiles)
                    }
                  }}
                >
                  {!previewImages.length && (
                    <>
                      <Upload className="h-8 w-8 mx-auto text-slate-400 mb-2" />
                      <p className="text-sm text-slate-600 mb-2">Drag and drop photos here or click to browse</p>
                      <p className="text-xs text-slate-500">Supported formats: JPG, PNG (Max 5MB)</p>
                    </>
                  )}

                  {previewImages.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                      {previewImages.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image.preview || "/placeholder.svg"}
                            alt={`Preview ${index + 1}`}
                            className="h-24 w-full object-cover rounded-md"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Remove image"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <input
                    type="file"
                    id="photo-upload"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        handleImageUpload(Array.from(e.target.files))
                      }
                    }}
                    ref={fileInputRef}
                  />

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-2"
                  >
                    {previewImages.length > 0 ? "Add More Photos" : "Browse Photos"}
                  </Button>

                  {previewImages.length > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setPreviewImages([])}
                      className="mt-2 ml-2 text-red-500 border-red-200 hover:bg-red-50"
                    >
                      Clear All
                    </Button>
                  )}
                </div>
                {previewImages.length > 0 && (
                  <p className="text-sm text-slate-500">{previewImages.length} photo(s) selected</p>
                )}
              </div>
            </div>

            <div className="flex items-start space-x-2 pt-2">
              <Checkbox id="terms" required />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="terms" className="text-sm font-normal">
                  I hereby declare that the information provided is true and correct to the best of my knowledge.
                </Label>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between border-t px-6 py-4">
            <Button variant="outline" type="button" onClick={() => router.push("/")}>
              Cancel
            </Button>
            <Button type="submit" className="bg-slate-800 hover:bg-slate-700" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Complaint"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
