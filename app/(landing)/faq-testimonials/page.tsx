import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image"
import { Star } from "lucide-react"

const faqs = [
  {
    question: "What are the admission requirements for UP Education programs?",
    answer:
      "Admission requirements vary by program. Generally, we look for candidates who demonstrate enthusiasm for learning and commitment to their chosen field. Some technical programs may have specific prerequisites, which are detailed on the program page. We encourage you to apply even if you're unsure about your qualifications – our admissions team is happy to guide you through the process.",
  },
  {
    question: "Do you offer scholarships or financial assistance?",
    answer:
      "Yes, we offer various scholarships based on merit, need, and diversity. We also provide flexible payment plans and can help you explore external funding options. Our goal is to make quality education accessible to all qualified candidates. Contact our admissions team for more information about financial assistance options.",
  },
  {
    question: "What is the typical class size?",
    answer:
      "We maintain small class sizes to ensure personalized attention. Most of our classes have 15-25 students, allowing for meaningful interaction with instructors and peers. This approach fosters a collaborative learning environment where every student has the opportunity to participate and receive feedback.",
  },
  {
    question: "Are your programs available online?",
    answer:
      "Many of our programs offer flexible learning options, including fully online, hybrid, and in-person formats. Check the specific program page for delivery options. Our online programs maintain the same high standards as our on-campus offerings, with interactive elements designed to keep you engaged and connected with instructors and fellow students.",
  },
  {
    question: "What kind of job placement assistance do you provide?",
    answer:
      "We offer comprehensive career services, including resume reviews, interview preparation, networking opportunities, and job placement assistance. Our industry partnerships provide students with access to internships and job opportunities. We're proud of our high job placement rates and continue to support our alumni throughout their careers.",
  },
  {
    question: "Can I visit a campus before applying?",
    answer:
      "We encourage prospective students to visit our campuses. You can schedule a tour, sit in on a class, or attend one of our open house events. This gives you the opportunity to experience our learning environment firsthand and speak with current students and instructors.",
  },
  {
    question: "What is your refund policy?",
    answer:
      "We offer a pro-rated refund policy within the first two weeks of a program. After this period, refunds are considered on a case-by-case basis. Full details of our refund policy are provided in the enrollment agreement. We understand that circumstances change, and we try to be as accommodating as possible.",
  },
  {
    question: "Do you provide certifications upon completion?",
    answer:
      "Yes, all our programs provide a certificate of completion. Many programs also prepare students for industry-recognized certifications, with some including the certification exam fee in the tuition. Our credentials are respected by employers and can significantly enhance your professional profile.",
  },
]

const testimonials = [
  {
    id: 1,
    content:
      "The Coding Bootcamp completely changed my career path. I went from a non-technical background to landing a job as a frontend developer within two months of graduation. The instructors were knowledgeable and supportive, and the curriculum was challenging but rewarding.",
    author: "Sarah Johnson",
    role: "Frontend Developer at TechCorp",
    imageUrl: "/placeholder.svg?height=150&width=150",
    rating: 5,
  },
  {
    id: 2,
    content:
      "The instructors at UP Education truly care about student success. They went above and beyond to ensure I understood the material and could apply it practically. The business management program gave me the confidence to start my own company, and I'm now applying the principles I learned on a daily basis.",
    author: "Michael Chen",
    role: "Entrepreneur & Business Owner",
    imageUrl: "/placeholder.svg?height=150&width=150",
    rating: 5,
  },
  {
    id: 3,
    content:
      "Joining the Digital Marketing program was the best decision I made for my career. The hands-on projects gave me real-world experience that impressed my employers. I appreciated how the curriculum stayed current with the latest trends and tools in the industry.",
    author: "Aisha Patel",
    role: "Marketing Specialist at Global Brand",
    imageUrl: "/placeholder.svg?height=150&width=150",
    rating: 5,
  },
  {
    id: 4,
    content:
      "As a working professional, I was concerned about balancing my job with studies. UP Education's flexible schedule and supportive environment made it possible. The investment in my education has already paid off with a promotion at work.",
    author: "Carlos Rodriguez",
    role: "Project Manager",
    imageUrl: "/placeholder.svg?height=150&width=150",
    rating: 4,
  },
  {
    id: 5,
    content:
      "I was initially skeptical about intensive programs, but UP Education exceeded my expectations. The curriculum was rigorous but well-structured, and the career services team was instrumental in helping me secure interviews with top companies.",
    author: "Linda Kim",
    role: "Data Analyst",
    imageUrl: "/placeholder.svg?height=150&width=150",
    rating: 5,
  },
  {
    id: 6,
    content:
      "The network I built during my time at UP Education has been invaluable. I'm still in touch with many of my classmates, and we continue to support each other professionally. The community aspect of the program was an unexpected benefit.",
    author: "Ahmed Hassan",
    role: "UX Designer",
    imageUrl: "/placeholder.svg?height=150&width=150",
    rating: 5,
  },
]

export default function FAQTestimonialsPage() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-[#254116] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">FAQ & Testimonials</h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Find answers to common questions and hear from our students about their experiences at UP Education.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-[#CE6439]">FAQ</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Frequently Asked Questions
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Can't find the answer you're looking for? Reach out to our customer support team.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-[#CE6439]">Testimonials</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Hear From Our Students</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Don't just take our word for it. See what our graduates have to say about their experience with UP
              Education.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 md:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex flex-col justify-between rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200"
              >
                <div>
                  <div className="flex items-center gap-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="mt-6 text-base leading-7 text-gray-700">
                    <p>"{testimonial.content}"</p>
                  </div>
                </div>
                <div className="mt-8 flex items-center gap-x-4">
                  <Image
                    className="h-12 w-12 rounded-full bg-gray-50"
                    src={testimonial.imageUrl || "/placeholder.svg"}
                    alt={testimonial.author}
                    width={48}
                    height={48}
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-[#CE6439] px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to transform your future?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/90">
              Join thousands of satisfied students who have advanced their careers with UP Education. Apply today and
              take the first step toward your goals.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/programs"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-[#CE6439] shadow-sm hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Explore Programs
              </a>
              <a href="#" className="text-sm font-semibold leading-6 text-white">
                Contact Us <span aria-hidden="true">→</span>
              </a>
            </div>
            <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
              aria-hidden="true"
            >
              <circle cx={512} cy={512} r={512} fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)" fillOpacity="0.7" />
              <defs>
                <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                  <stop stopColor="#F7F850" />
                  <stop offset={1} stopColor="#CE6439" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </>
  )
}
