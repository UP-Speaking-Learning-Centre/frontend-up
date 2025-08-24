"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Clock, CheckCircle } from "lucide-react"

const placementQuestions = [
  {
    id: 1,
    question: "What _____ you do yesterday?",
    options: ["do", "did", "does", "doing"],
    correct: 1,
  },
  {
    id: 2,
    question: "She _____ to the store every morning.",
    options: ["go", "goes", "going", "went"],
    correct: 1,
  },
  {
    id: 3,
    question: "I have _____ finished my homework.",
    options: ["already", "yet", "still", "never"],
    correct: 0,
  },
  {
    id: 4,
    question: "The book _____ on the table is mine.",
    options: ["lying", "lies", "lay", "laid"],
    correct: 0,
  },
  {
    id: 5,
    question: "If I _____ rich, I would travel the world.",
    options: ["am", "was", "were", "be"],
    correct: 2,
  },
  {
    id: 6,
    question: "She speaks English _____.",
    options: ["fluent", "fluently", "fluency", "more fluent"],
    correct: 1,
  },
  {
    id: 7,
    question: "I _____ him since last year.",
    options: ["don't see", "didn't see", "haven't seen", "wasn't seeing"],
    correct: 2,
  },
  {
    id: 8,
    question: "The meeting _____ at 3 PM tomorrow.",
    options: ["start", "starts", "starting", "will start"],
    correct: 3,
  },
  {
    id: 9,
    question: "This is the _____ movie I've ever seen.",
    options: ["good", "better", "best", "well"],
    correct: 2,
  },
  {
    id: 10,
    question: "I wish I _____ speak French.",
    options: ["can", "could", "will", "would"],
    correct: 1,
  },
  {
    id: 11,
    question: "The house _____ by my grandfather in 1950.",
    options: ["built", "was built", "is built", "has built"],
    correct: 1,
  },
  {
    id: 12,
    question: "_____ you mind opening the window?",
    options: ["Do", "Would", "Will", "Can"],
    correct: 1,
  },
  {
    id: 13,
    question: "I'm looking forward _____ you again.",
    options: ["see", "to see", "seeing", "to seeing"],
    correct: 3,
  },
  {
    id: 14,
    question: "Neither John _____ Mary came to the party.",
    options: ["or", "nor", "and", "but"],
    correct: 1,
  },
  {
    id: 15,
    question: "The more you practice, _____ you become.",
    options: ["good", "better", "the better", "best"],
    correct: 2,
  },
  {
    id: 16,
    question: "I'd rather _____ at home tonight.",
    options: ["stay", "to stay", "staying", "stayed"],
    correct: 0,
  },
  {
    id: 17,
    question: "By the time you arrive, I _____ cooking.",
    options: ["finish", "will finish", "will have finished", "finished"],
    correct: 2,
  },
  {
    id: 18,
    question: "The project _____ completed by next month.",
    options: ["will be", "will have", "is being", "has been"],
    correct: 0,
  },
  {
    id: 19,
    question: "_____ the weather was bad, we went hiking.",
    options: ["Despite", "Although", "Because", "Since"],
    correct: 1,
  },
  {
    id: 20,
    question: "I suggest _____ early tomorrow.",
    options: ["leave", "to leave", "leaving", "left"],
    correct: 2,
  },
]

export default function PlacementTestPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>(new Array(20).fill(-1))
  const [timeLeft, setTimeLeft] = useState(20 * 60) // 20 minutes in seconds
  const [isCompleted, setIsCompleted] = useState(true)
  const [level, setLevel] = useState("")

  useEffect(() => {
    if (timeLeft > 0 && !isCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      handleSubmit()
    }
  }, [timeLeft, isCompleted])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answerIndex
    setAnswers(newAnswers)
  }

  const calculateLevel = () => {
    const correctAnswers = answers.reduce((count, answer, index) => {
      return answer === placementQuestions[index].correct ? count + 1 : count
    }, 0)

    const percentage = (correctAnswers / 20) * 100

    if (percentage >= 80) return "Advanced"
    if (percentage >= 60) return "Intermediate"
    return "Beginner"
  }

  const handleSubmit = () => {
    const determinedLevel = calculateLevel()
    setLevel(determinedLevel)
    setIsCompleted(true)
  }

  const handleContinueToForm = () => {
    // Store the determined level and redirect to select program with pre-filled level
    localStorage.setItem("placementTestLevel", level)
    router.push("/select-program?fromPlacementTest=true")
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle>Test Selesai!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Rekomendasi Level:</h3>
              <div className="text-2xl font-bold text-blue-600">{level}</div>
            </div>
            <p className="text-gray-600 text-sm">
              Berdasarkan hasil test, kami merekomendasikan level {level} untuk Anda. Silakan lanjutkan untuk melengkapi
              pendaftaran.
            </p>
            <Button onClick={handleContinueToForm} className="w-full">
              Lanjutkan Pendaftaran
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen max-w bg-gray-50 pt-4">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 gap-4 flex items-start justify-between">

      <div className="flex-grow">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Placement Test</h1>
            <div className="flex items-center gap-2 text-red-600">
              <Clock className="w-5 h-5" />
              <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>
                Soal {currentQuestion + 1} dari {placementQuestions.length}
              </span>
              <span>{answers.filter((a) => a !== -1).length} terjawab</span>
            </div>
            <Progress value={((currentQuestion + 1) / placementQuestions.length) * 100} />
          </div>
        </div>

        {/* Question */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">{placementQuestions[currentQuestion].question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={answers[currentQuestion]?.toString() || ""}
              onValueChange={(value) => handleAnswerSelect(Number.parseInt(value))}
            >
              {placementQuestions[currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="cursor-pointer">
                    {String.fromCharCode(65 + index)}. {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
          >
            Sebelumnya
          </Button>

          {currentQuestion === placementQuestions.length - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={answers.filter((a) => a !== -1).length < placementQuestions.length}
            >
              Submit Test
            </Button>
          ) : (
            <Button onClick={() => setCurrentQuestion(Math.min(placementQuestions.length - 1, currentQuestion + 1))}>
              Selanjutnya
            </Button>
          )}
        </div>
      </div>
      {/* Question Navigator */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Navigasi Soal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-10 gap-2">
              {placementQuestions.map((_, index) => (
                <Button
                  key={index}
                  variant={currentQuestion === index ? "default" : answers[index] !== -1 ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setCurrentQuestion(index)}
                  className="w-8 h-8 p-0"
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
