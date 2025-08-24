"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LockKeyhole } from "lucide-react"

export default function SetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const phoneNumber = searchParams.get("phone")

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Redirect if no phone number is provided
    if (!phoneNumber) {
      router.push("/login")
    }
  }, [phoneNumber, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate passwords
    if (password.length < 6) {
      setError("Password harus minimal 6 karakter")
      return
    }

    if (password !== confirmPassword) {
      setError("Password tidak cocok")
      return
    }

    setIsLoading(true)

    // Simulate API call to set password
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Create new user account
    const newUser = {
      id: Date.now().toString(),
      phone: phoneNumber,
      password: password,
      accountType: "parent" as const,
      status: "active" as const,
      students: [{ id: "1", name: "Student Baru", age: 10, program: "Belum dipilih", level: "Belum dipilih" }],
    }

    // Save to localStorage for demo
    localStorage.setItem("currentUser", JSON.stringify(newUser))

    // Redirect to dashboard
    router.push("/dashboard")

    setIsLoading(false)
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <div className="text-center mb-6">
          <LockKeyhole className="mx-auto h-12 w-12 text-[#CE6439] mb-2" />
          <h2 className="text-2xl font-semibold">Buat Password</h2>
          <p className="text-sm text-gray-600 mt-1">Buat password untuk akun dengan nomor {phoneNumber}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Minimal 6 karakter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Masukkan password yang sama"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading ? "Menyimpan..." : "Simpan Password"}
          </Button>
        </form>
      </div>
    </div>
  )
}
