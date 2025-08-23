"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  User,
  BookOpen,
  Star,
  AlertCircle,
  CheckCircle,
  FileText,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function StudentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [student, setStudent] = useState<any>(null)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const user = localStorage.getItem("currentUser")
    if (user) {
      const userData = JSON.parse(user)
      setCurrentUser(userData)

      // Find student by ID
      const foundStudent = userData.students?.find((s: any) => s.id === params.id)
      setStudent(foundStudent)
      setLoading(false)
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CE6439] mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold">Loading student data...</h2>
        </div>
      </div>
    )
  }

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Student tidak ditemukan</h2>
          <Button onClick={() => router.back()}>Kembali</Button>
        </div>
      </div>
    )
  }

  // Render different content based on registration type and status
  const renderStudentContent = () => {
    // Case 1: Placement Test with pending results
    if (student.registrationType === "placement-test" && student.placementTest?.status === "pending") {
      return (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="bg-amber-100 p-2 rounded-full">
                <AlertCircle className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-amber-800 mb-2">Hasil Placement Test Belum Tersedia</h3>
                <p className="text-amber-700">
                  Hasil Placement Test Anda belum tersedia. Mohon tunggu hingga hasil diumumkan untuk dapat memilih
                  jadwal kelas.
                </p>
                <div className="mt-4 bg-white p-3 rounded-md border border-amber-200">
                  <p className="text-sm text-gray-600">
                    Tanggal Placement Test:{" "}
                    {new Date(student.placementTest.date).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Status:{" "}
                    <Badge variant="outline" className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                      Menunggu Hasil
                    </Badge>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    }

    // Case 2: Placement Test with completed results
    if (student.registrationType === "placement-test" && student.placementTest?.status === "completed") {
      return (
        <div className="space-y-6">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-2 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Hasil Placement Test Tersedia</h3>
                  <p className="text-green-700">
                    Berdasarkan hasil placement test, Anda telah ditempatkan pada level yang sesuai dengan kemampuan
                    Anda.
                  </p>
                  <div className="mt-4 bg-white p-4 rounded-md border border-green-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Tanggal Test:</p>
                        <p className="font-medium">
                          {new Date(student.placementTest.date).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Skor:</p>
                        <p className="font-medium">{student.placementTest.score}/100</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Level yang Direkomendasikan:</p>
                        <p className="font-medium">{student.placementTest.recommendedLevel}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Status:</p>
                        <Badge variant="outline" className="bg-green-100 text-green-700 hover:bg-green-100">
                          Selesai
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Schedule Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Jadwal Kelas yang Dipilihkan
              </CardTitle>
              <CardDescription>
                Berikut adalah jadwal kelas yang telah dipilihkan berdasarkan hasil placement test Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {student.schedule.options.map((option, index) => (
                    <Card
                      key={option.id}
                      className={`border-2 ${index === 0 ? "border-[#CE6439]" : "border-gray-200"}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold">Opsi {index + 1}</h3>
                          {index === 0 && <Badge className="bg-[#CE6439]">Direkomendasikan</Badge>}
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-600">Hari:</p>
                              <p className="font-medium">{option.days}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-600">Waktu:</p>
                              <p className="font-medium">{option.time}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-600">Mentor:</p>
                              <p className="font-medium">{option.mentor}</p>
                            </div>
                          </div>
                        </div>
                        <Button
                          className={`w-full mt-4 ${index === 0 ? "bg-[#CE6439] hover:bg-[#CE6439]/90" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                        >
                          {index === 0 ? "Pilih Jadwal Ini" : "Pilih Alternatif"}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    // Case 3: Regular registration (without placement test)
    return (
      <div className="space-y-6">
        {/* Student Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Informasi Pribadi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Nama Lengkap</label>
                <p className="font-semibold">{student.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Umur</label>
                <p className="font-semibold">{student.age} tahun</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Program</label>
                <p className="font-semibold">{student.program}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Level</label>
                <Badge variant="secondary">{student.level}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Schedule Info */}
        {student.schedule && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Jadwal Kelas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Waktu</p>
                    <p className="font-semibold">{student.schedule.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Hari</p>
                    <p className="font-semibold">{student.schedule.days}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Lokasi</p>
                    <p className="font-semibold">{student.schedule.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Mentor</p>
                    <p className="font-semibold">{student.schedule.mentor}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Progress Belajar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Kehadiran</span>
                  <span className="text-sm text-gray-600">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Nilai Rata-rata</span>
                  <span className="text-sm text-gray-600">8.5/10</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
          <h1 className="text-2xl font-bold">Detail Student</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">{renderStudentContent()}</div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge
                  variant={
                    student.status === "active" ? "default" : student.status === "pending" ? "secondary" : "outline"
                  }
                  className="w-full justify-center"
                >
                  {student.status === "active"
                    ? "Aktif"
                    : student.status === "pending"
                      ? "Menunggu Konfirmasi"
                      : "Tidak Aktif"}
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Aksi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full" variant="outline">
                  Edit Informasi
                </Button>
                {student.status === "active" && (
                  <Button className="w-full" variant="outline">
                    Ubah Jadwal
                  </Button>
                )}
                {student.registrationType === "placement-test" && student.placementTest?.status === "completed" && (
                  <Button className="w-full" variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Lihat Detail Hasil Test
                  </Button>
                )}
                {student.status === "active" && (
                  <Button className="w-full" variant="outline">
                    Lihat Laporan
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity - Only show for active students */}
            {student.status === "active" && (
              <Card>
                <CardHeader>
                  <CardTitle>Aktivitas Terbaru</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <p className="font-medium">Kelas Speaking</p>
                    <p className="text-gray-600">2 hari yang lalu</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Quiz Grammar</p>
                    <p className="text-gray-600">5 hari yang lalu</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">Nilai: 9/10</span>
                    </div>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Kelas Listening</p>
                    <p className="text-gray-600">1 minggu yang lalu</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
