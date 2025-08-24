import { Button } from "@/components/ui/button"
import { ButtonOutline } from "@/components/ui/button-outline"
import { BadgeCheck, BookOpen, Users, Clock, CreditCard } from "lucide-react"
import Image from "next/image"

const programs = [
  {
    id: "coding-bootcamp",
    name: "Coding Bootcamp",
    description:
      "Intensive 12-week program to transform beginners into job-ready developers. Learn front-end and back-end technologies.",
    longDescription:
      "Our Coding Bootcamp is designed to take you from little to no coding experience to a job-ready developer in just 12 weeks. The curriculum covers HTML, CSS, JavaScript, React, Node.js, and database technologies. You'll build real-world projects and graduate with a portfolio that demonstrates your skills to potential employers.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    duration: "12 weeks",
    format: "Full-time, on-campus",
    price: "Rp 25,000,000",
    features: [
      "Hands-on project-based learning",
      "Industry-experienced instructors",
      "Career services and job placement assistance",
      "Networking opportunities with tech companies",
      "Post-graduation support and resources",
    ],
  },
  {
    id: "business-management",
    name: "Business Management",
    description:
      "Comprehensive course on business strategies, leadership, and management principles for aspiring entrepreneurs.",
    longDescription:
      "The Business Management program equips you with the knowledge and skills needed to excel in today's competitive business environment. You'll learn about strategic planning, financial management, marketing, human resources, and leadership. Through case studies and practical assignments, you'll develop the critical thinking and problem-solving abilities essential for business success.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    duration: "16 weeks",
    format: "Part-time, evenings and weekends",
    price: "Rp 18,000,000",
    features: [
      "Business plan development",
      "Financial analysis and reporting",
      "Marketing strategy creation",
      "Leadership and team management",
      "Entrepreneurship fundamentals",
    ],
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing",
    description:
      "Master the art of online marketing, SEO, social media strategies, and content creation for the digital age.",
    longDescription:
      "Our Digital Marketing program covers all aspects of modern marketing in the digital landscape. From search engine optimization (SEO) and pay-per-click (PPC) advertising to social media marketing and content strategy, you'll learn how to create and implement effective digital marketing campaigns. The program includes hands-on practice with industry-standard tools and platforms.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    duration: "10 weeks",
    format: "Hybrid (online and on-campus)",
    price: "Rp 15,000,000",
    features: [
      "SEO and SEM techniques",
      "Social media marketing",
      "Content creation and strategy",
      "Analytics and performance tracking",
      "Email marketing campaigns",
    ],
  },
]

const steps = [
  {
    id: 1,
    name: "Research Programs",
    description: "Explore our program offerings and find the one that aligns with your career goals and interests.",
    icon: BookOpen,
  },
  {
    id: 2,
    name: "Application Process",
    description: "Complete our simple online application form and submit any required documents.",
    icon: Users,
  },
  {
    id: 3,
    name: "Admission Interview",
    description: "Meet with our admissions team to discuss your goals and ensure the program is a good fit for you.",
    icon: Clock,
  },
  {
    id: 4,
    name: "Enrollment and Payment",
    description: "Upon acceptance, complete the enrollment process and choose from our flexible payment options.",
    icon: CreditCard,
  },
]

export default function ProgramsPage() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-[#254116] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Our Programs</h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Discover educational programs designed to equip you with the skills and knowledge needed for success in
              today's competitive job market.
            </p>
          </div>
        </div>
      </div>

      {/* Programs List */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-[#CE6439]">Explore Programs</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Find the Right Path for Your Future
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our carefully designed programs combine theoretical knowledge with practical skills to prepare you for
              success in your chosen field.
            </p>
          </div>

          <div className="mt-16 space-y-20">
            {programs.map((program, idx) => (
              <div
                key={program.id}
                id={program.id}
                className={`flex flex-col overflow-hidden rounded-lg ${idx % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} shadow-lg`}
              >
                <div className="relative w-full lg:w-1/2">
                  <Image
                    src={program.imageUrl || "/placeholder.svg"}
                    alt={program.name}
                    width={800}
                    height={600}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between bg-white p-6 sm:p-10">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{program.name}</h3>
                    <p className="mt-4 text-lg text-gray-500">{program.longDescription}</p>

                    <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                      <div className="flex items-center gap-x-3">
                        <Clock className="h-5 w-5 text-[#CE6439]" />
                        <span className="text-sm font-medium text-gray-900">Duration: {program.duration}</span>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <Users className="h-5 w-5 text-[#CE6439]" />
                        <span className="text-sm font-medium text-gray-900">Format: {program.format}</span>
                      </div>
                      <div className="flex items-center gap-x-3 sm:col-span-2">
                        <CreditCard className="h-5 w-5 text-[#CE6439]" />
                        <span className="text-sm font-medium text-gray-900">Investment: {program.price}</span>
                      </div>
                    </div>

                    <ul className="mt-8 space-y-2">
                      {program.features.map((feature, featureIdx) => (
                        <li key={featureIdx} className="flex items-start">
                          <BadgeCheck className="h-5 w-5 flex-shrink-0 text-[#CE6439]" />
                          <span className="ml-2 text-sm text-gray-500">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-10">
                    <Button className="w-full bg-[#CE6439] hover:bg-[#CE6439]/90">Apply Now</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Application Process */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-[#CE6439]">How to Apply</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Simple Application Process
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Joining UP Education is straightforward. Follow these steps to begin your educational journey with us.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-5xl">
            <ol className="relative border-l border-gray-200 dark:border-gray-700">
              {steps.map((step) => (
                <li key={step.id} className="mb-10 ml-6">
                  <span className="absolute flex items-center justify-center w-10 h-10 bg-[#CE6439] rounded-full -left-5 ring-4 ring-white">
                    <step.icon className="w-5 h-5 text-white" />
                  </span>
                  <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">{step.name}</h3>
                  <p className="mb-4 text-base font-normal text-gray-500">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-16 flex items-center justify-center">
            <div className="rounded-lg bg-white p-8 shadow-lg ring-1 ring-gray-200 lg:p-12">
              <h3 className="text-xl font-bold text-gray-900">Ready to Start Your Journey?</h3>
              <p className="mt-4 text-gray-600">
                Our admissions team is here to help you find the right program and guide you through the application
                process.
              </p>
              <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <Button className="bg-[#CE6439] hover:bg-[#CE6439]/90">Apply Now</Button>
                <ButtonOutline>Schedule a Consultation</ButtonOutline>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
