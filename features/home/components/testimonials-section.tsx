import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    content:
      "The Coding Bootcamp completely changed my career path. I went from a non-technical background to landing a job as a frontend developer within two months of graduation.",
    author: "Sarah Johnson",
    role: "Frontend Developer",
    imageUrl: "/placeholder.svg?height=150&width=150",
  },
  {
    id: 2,
    content:
      "The instructors at UP Education truly care about student success. They went above and beyond to ensure I understood the material and could apply it practically.",
    author: "Michael Chen",
    role: "Business Analyst",
    imageUrl: "/placeholder.svg?height=150&width=150",
  },
  {
    id: 3,
    content:
      "Joining the Digital Marketing program was the best decision I made for my career. The hands-on projects gave me real-world experience that impressed my employers.",
    author: "Aisha Patel",
    role: "Marketing Specialist",
    imageUrl: "/placeholder.svg?height=150&width=150",
  },
]

export default function TestimonialsSection() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-[#CE6439]">Testimonials</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Hear From Our Students</p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Don't just take our word for it. See what our graduates have to say about their experience with UP
            Education.
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="rounded-2xl bg-gray-50 p-8 shadow-sm ring-1 ring-gray-200">
                <blockquote className="text-gray-700">"{testimonial.content}"</blockquote>
                <div className="mt-6 flex items-center gap-x-4">
                  <Image
                    className="h-12 w-12 rounded-full bg-gray-50"
                    src={testimonial.imageUrl || "/placeholder.svg"}
                    alt={testimonial.author}
                    width={48}
                    height={48}
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 flex justify-center">
          <Link href="/faq-testimonials">
            <Button className="bg-[#CE6439] hover:bg-[#CE6439]/90">Read More Testimonials</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
