"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function SelectProgramPage() {
  const router = useRouter()
  const [level, setLevel] = useState("")
  const [showPlacementDialog, setShowPlacementDialog] = useState(false)

  const levels = ["Beginner", "Intermediate", "Advanced", "Saya tidak tahu level saya"]

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Pilih Program</CardTitle>
          <CardDescription>Pilih program yang sesuai dengan level Anda.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="level">Level</Label>
            <RadioGroup defaultValue={level} onValueChange={setLevel}>
              {levels.map((level) => (
                <div key={level} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={level}
                    id={level}
                    onClick={() => {
                      if (level === "Saya tidak tahu level saya") {
                        setShowPlacementDialog(true)
                      }
                    }}
                  />
                  <Label htmlFor={level}>{level}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <Button onClick={() => router.push("/program-list")}>Lanjut</Button>
        </CardContent>
      </Card>

      <Dialog open={showPlacementDialog} onOpenChange={setShowPlacementDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Placement Test</DialogTitle>
            <DialogDescription>
              Kami akan melakukan tes penempatan untuk menentukan level yang tepat untuk Anda. Tes ini terdiri dari 20
              soal pilihan ganda dan membutuhkan waktu sekitar 15-20 menit.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Yang akan Anda kerjakan:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• 20 soal pilihan ganda</li>
                <li>• Waktu pengerjaan: 20 menit</li>
                <li>• Materi: Grammar, Vocabulary, Reading</li>
                <li>• Hasil langsung tersedia</li>
              </ul>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowPlacementDialog(false)} className="flex-1">
                Batal
              </Button>
              <Button
                onClick={() => {
                  setShowPlacementDialog(false)
                  router.push("/placement-test")
                }}
                className="flex-1"
              >
                Mulai Test
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
