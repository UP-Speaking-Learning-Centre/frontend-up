"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Users, Home, User, LogOut, Menu, Calendar, BookOpen } from "lucide-react"
import Link from "next/link"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Dummy data for students
const dummyStudents = [
  {
    id: "1",
    name: "Budi Santoso",
    age: 10,
    program: "Elementary School",
    level: "Novice 2",
    status: "active",
    schedule: {
      time: "15:00 - 17:00",
      days: "Senin & Rabu",
      location: "Ruang A1",
      mentor: "Ms. Feby",
    },
  },
  {
    id: "2",
    name: "Sari Santoso",
    age: 12,
    program: "Junior High School",
    level: "Beginners 1",
    status: "active",
    schedule: {
      time: "17:00 - 19:00",
      days: "Selasa & Kamis",
      location: "Ruang B2",
      mentor: "Mr. Firdan",
    },
  },
]

const DetailStudentContent = ({ selectedStudent }) => {
  if (!selectedStudent) {
    return (
      <div className="text-center py-20">
        <div className="max-w-md mx-auto">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Student Selected</h3>
          <p className="text-gray-500">Please select a student from the dropdown above to view their details.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Student Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Student Name</p>
                <p className="text-lg font-semibold text-gray-900">{selectedStudent.name}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Current Program</p>
                <p className="text-lg font-semibold text-gray-900">{selectedStudent.program}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Current Level</p>
                <p className="text-lg font-semibold text-gray-900">{selectedStudent.level}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Student Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">Full Name</Label>
                <p className="font-semibold text-gray-900">{selectedStudent.name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Age</Label>
                <p className="font-semibold text-gray-900">{selectedStudent.age} years old</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Program</Label>
                <p className="font-semibold text-gray-900">{selectedStudent.program}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Level</Label>
                <Badge variant="secondary">{selectedStudent.level}</Badge>
              </div>
              <div className="col-span-2">
                <Label className="text-sm font-medium text-gray-600">Status</Label>
                <div className="mt-1">
                  <Badge variant={selectedStudent.status === "active" ? "default" : "secondary"}>
                    {selectedStudent.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Schedule Information */}
        {selectedStudent.schedule && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Class Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">Days</span>
                  </div>
                  <span className="font-semibold">{selectedStudent.schedule.days}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">Time</span>
                  </div>
                  <span className="font-semibold">{selectedStudent.schedule.time}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Home className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">Location</span>
                  </div>
                  <span className="font-semibold">{selectedStudent.schedule.location}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <User className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">Mentor</span>
                  </div>
                  <span className="font-semibold">{selectedStudent.schedule.mentor}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Progress Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            Learning Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Attendance Rate</span>
                <span className="text-sm text-gray-600">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: "85%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Average Score</span>
                <span className="text-sm text-gray-600">8.5/10</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: "85%" }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Perbarui bagian ListStudentsContent untuk menampilkan status yang berbeda

// 1. Ganti fungsi ListStudentsContent dengan kode berikut:

function ListStudentsContent() {
  const [students, setStudents] = useState([])
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const user = localStorage.getItem("currentUser")
    if (user) {
      const userData = JSON.parse(user)
      setCurrentUser(userData)
      setStudents(userData.students || [])
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Students List</h2>
          <p className="text-gray-600">Manage and view all your students</p>
        </div>
        <Button className="bg-[#CE6439] hover:bg-[#CE6439]/90">Add New Student</Button>
      </div>

      <div className="grid gap-6">
        {students.map((student) => (
          <Card key={student.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
                    <p className="text-sm text-gray-600">{student.age} years old</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline">{student.program}</Badge>
                      <Badge variant="secondary">{student.level}</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {student.registrationType === "placement-test" && student.placementTest?.status === "pending" ? (
                    <Badge variant="outline" className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                      Menunggu Hasil Test
                    </Badge>
                  ) : student.status === "active" ? (
                    <Badge variant="default">Aktif</Badge>
                  ) : (
                    <Badge variant="secondary">Tidak Aktif</Badge>
                  )}
                  <Link href={`/dashboard/student/${student.id}`}>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Schedule Selection Content dengan design v8
function ScheduleSelectionContent() {
  const [selectedSchedule, setSelectedSchedule] = useState(null)
  const [estimatedPrice, setEstimatedPrice] = useState(null)

  const scheduleOptions = [
    {
      id: "1",
      day: "Monday & Wednesday",
      time: "15:00 - 17:00",
      mentor: "Ms. Lieken (C)",
      package: "Private",
      available: true,
      price: 2250000,
    },
    {
      id: "2",
      day: "Tuesday & Thursday",
      time: "15:00 - 17:00",
      mentor: "Ms. Binti",
      package: "Private",
      available: true,
      price: 2250000,
    },
    {
      id: "3",
      day: "Monday, Wednesday, Friday",
      time: "15:00 - 17:00",
      mentor: "Mr. Noval",
      package: "Semi-Private",
      available: false,
      price: 1800000,
    },
    {
      id: "4",
      day: "Friday",
      time: "17:00 - 19:00",
      mentor: "Papa Bear Team",
      package: "Group",
      available: true,
      price: 1500000,
    },
  ]

  const handleScheduleSelect = (schedule) => {
    if (schedule.available) {
      setSelectedSchedule(schedule)
      setEstimatedPrice(schedule.price)
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">Choose Your Schedule</h2>
        <p className="mt-2 text-lg text-gray-600">Select a schedule that fits your availability</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {scheduleOptions.map((schedule) => (
          <Card
            key={schedule.id}
            onClick={() => handleScheduleSelect(schedule)}
            className={`cursor-pointer transition-all duration-200 ${
              !schedule.available
                ? "bg-gray-50 border-gray-200 cursor-not-allowed opacity-50"
                : selectedSchedule?.id === schedule.id
                  ? "bg-[#CE6439] text-white border-[#CE6439] shadow-lg transform scale-105"
                  : "bg-white border-gray-200 hover:border-[#CE6439] hover:shadow-md"
            }`}
          >
            <CardContent className="p-6 text-center">
              <div className="space-y-3">
                <div className="p-3 rounded-full bg-white/20 w-fit mx-auto">
                  <Calendar
                    className={`w-6 h-6 ${selectedSchedule?.id === schedule.id ? "text-white" : "text-[#CE6439]"}`}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{schedule.day}</h3>
                  <p className={`text-sm ${selectedSchedule?.id === schedule.id ? "text-white/90" : "text-gray-600"}`}>
                    {schedule.time}
                  </p>
                </div>
                <div>
                  <p
                    className={`text-sm font-medium ${selectedSchedule?.id === schedule.id ? "text-white" : "text-gray-900"}`}
                  >
                    {schedule.mentor}
                  </p>
                  <Badge variant={selectedSchedule?.id === schedule.id ? "secondary" : "outline"} className="mt-1">
                    {schedule.package}
                  </Badge>
                </div>
                <div className="pt-2">
                  <p
                    className={`text-lg font-bold ${selectedSchedule?.id === schedule.id ? "text-white" : "text-[#CE6439]"}`}
                  >
                    Rp {schedule.price.toLocaleString("id-ID")}
                  </p>
                  <p className={`text-xs ${selectedSchedule?.id === schedule.id ? "text-white/80" : "text-gray-500"}`}>
                    per month
                  </p>
                </div>
                {!schedule.available && (
                  <Badge variant="destructive" className="mt-2">
                    Not Available
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedSchedule && (
        <Card className="border-[#CE6439] bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="p-6">
            <div className="text-center">
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Selected Schedule</h4>
              <p className="text-gray-600 mb-4">
                {selectedSchedule.day} at {selectedSchedule.time} with {selectedSchedule.mentor}
              </p>
              <div className="bg-white rounded-lg p-4 inline-block">
                <p className="text-sm text-gray-600">Total Monthly Fee</p>
                <p className="text-3xl font-bold text-[#CE6439]">Rp {estimatedPrice.toLocaleString("id-ID")}</p>
                <p className="text-sm text-gray-500">*Final price may vary based on selected program</p>
              </div>
              <div className="mt-6">
                <Button size="lg" className="bg-[#CE6439] hover:bg-[#CE6439]/90">
                  Confirm Schedule
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

const sidebarItems = [
  {
    id: "detail-student",
    label: "Student Details",
    icon: User,
    content: (props) => <DetailStudentContent {...props} />,
  },
  {
    id: "list-students",
    label: "All Students",
    icon: Users,
    content: () => <ListStudentsContent />,
  },
  {
    id: "schedule",
    label: "Schedule Selection",
    icon: Calendar,
    content: () => <ScheduleSelectionContent />,
  },
]

export default function DashboardPage() {
  const [open, setOpen] = useState(false)
  const [activeItemId, setActiveItemId] = useState(sidebarItems[0].id)
  const [students, setStudents] = useState(dummyStudents)
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || "")
  const [currentUser, setCurrentUser] = useState(null)

  const activeItem = sidebarItems.find((item) => item.id === activeItemId)
  const selectedStudent = students.find((s) => s.id === selectedStudentId)

  // Load user data from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("currentUser")
    if (userData) {
      try {
        const user = JSON.parse(userData)
        setCurrentUser(user)
        if (user.students && user.students.length > 0) {
          setStudents(user.students)
          setSelectedStudentId(user.students[0].id)
        }
      } catch (e) {
        console.error("Error parsing user data:", e)
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    window.location.href = "/login"
  }

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-full sm:max-w-[280px] p-0">
          <div className="py-4 flex flex-col h-full bg-white">
            <div className="px-6 mb-6">
              <Link href="/" className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-[#CE6439] flex items-center justify-center text-white font-bold text-sm">
                  UP
                </div>
                <span className="text-lg font-bold text-[#254116]">Dashboard</span>
              </Link>
            </div>
            <div className="space-y-1 flex-1 px-3">
              {sidebarItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={`w-full justify-start font-normal ${
                    activeItemId === item.id
                      ? "bg-[#CE6439]/10 text-[#CE6439] border-r-2 border-[#CE6439]"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    setActiveItemId(item.id)
                    setOpen(false)
                  }}
                >
                  <item.icon className="h-4 w-4 mr-3" />
                  <span>{item.label}</span>
                </Button>
              ))}
            </div>
            <div className="px-3 pt-4 border-t">
              <Button
                variant="ghost"
                className="w-full justify-start font-normal text-red-600 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-3" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-full w-64 flex-col bg-white shadow-sm border-r">
        <div className="py-6 flex flex-col h-full">
          <div className="px-6 mb-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-[#CE6439] flex items-center justify-center text-white font-bold text-lg">
                UP
              </div>
              <span className="text-xl font-bold text-[#254116]">Dashboard</span>
            </Link>
          </div>
          <div className="space-y-1 flex-1 px-3">
            {sidebarItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className={`w-full justify-start font-normal ${
                  activeItemId === item.id
                    ? "bg-[#CE6439]/10 text-[#CE6439] border-r-2 border-[#CE6439]"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveItemId(item.id)}
              >
                <item.icon className="h-4 w-4 mr-3" />
                <span>{item.label}</span>
              </Button>
            ))}
          </div>
          <div className="px-3 pt-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start font-normal text-red-600 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-3" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" className="md:hidden mr-2" onClick={() => setOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">{activeItem?.label}</h1>
          </div>

          {/* Current Student Selector - only show on detail student page */}
          {activeItemId === "detail-student" && (
            <div className="flex items-center space-x-4">
              {students.length > 1 ? (
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 mr-3">Current Student:</span>
                  <Select value={selectedStudentId} onValueChange={setSelectedStudentId}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select student" />
                    </SelectTrigger>
                    <SelectContent>
                      {students.map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 mr-2">Current Student:</span>
                  <span className="font-medium text-gray-900">{selectedStudent?.name}</span>
                </div>
              )}
            </div>
          )}
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">{activeItem?.content({ selectedStudent })}</main>
      </div>
    </div>
  )
}
