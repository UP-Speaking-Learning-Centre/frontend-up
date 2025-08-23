import Image from "next/image"

const partners = [
  { name: "Company 1", logo: "/placeholder.svg?height=80&width=200" },
  { name: "Company 2", logo: "/placeholder.svg?height=80&width=200" },
  { name: "Company 3", logo: "/placeholder.svg?height=80&width=200" },
  { name: "Company 4", logo: "/placeholder.svg?height=80&width=200" },
  { name: "Company 5", logo: "/placeholder.svg?height=80&width=200" },
  { name: "Company 6", logo: "/placeholder.svg?height=80&width=200" },
]

export default function PartnersSection() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-[#CE6439]">Our Partners</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trusted by Industry Leaders
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We collaborate with top companies to ensure our curriculum meets industry standards and our graduates are
            job-ready.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-2 items-center gap-x-8 gap-y-12 sm:grid-cols-3 sm:gap-x-10 md:gap-16 lg:mx-0 lg:grid-cols-6">
          {partners.map((partner) => (
            <div key={partner.name} className="col-span-1 flex justify-center">
              <Image
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                width={158}
                height={48}
                className="h-12 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
