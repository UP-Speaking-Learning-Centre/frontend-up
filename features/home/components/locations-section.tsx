import Image from "next/image"
import { MapPin } from "lucide-react"

const locations = [
  {
    city: "Jakarta",
    address: "Jl. Sudirman No. 123, Jakarta Selatan",
    image: "/placeholder.svg?height=300&width=400",
    phone: "+62 21 1234 5678",
    email: "jakarta@upeducation.com",
  },
  {
    city: "Bandung",
    address: "Jl. Asia Afrika No. 456, Bandung",
    image: "/placeholder.svg?height=300&width=400",
    phone: "+62 22 9876 5432",
    email: "bandung@upeducation.com",
  },
  {
    city: "Surabaya",
    address: "Jl. Pemuda No. 789, Surabaya",
    image: "/placeholder.svg?height=300&width=400",
    phone: "+62 31 8765 4321",
    email: "surabaya@upeducation.com",
  },
]

export default function LocationsSection() {
  return (
    <div className="bg-gray-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-[#CE6439]">Our Locations</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Find Us Nationwide</p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            With campuses across Indonesia, quality education is never far away. Visit one of our branches to learn more
            about our programs.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {locations.map((location) => (
            <div key={location.city} className="flex flex-col overflow-hidden rounded-lg shadow-lg">
              <div className="relative h-48">
                <Image
                  src={location.image || "/placeholder.svg"}
                  alt={`${location.city} campus`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between bg-white p-6">
                <div className="flex-1">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-[#CE6439]" />
                    <h3 className="ml-2 text-xl font-semibold text-gray-900">{location.city}</h3>
                  </div>
                  <p className="mt-3 text-base text-gray-500">{location.address}</p>
                  <div className="mt-4 space-y-1">
                    <p className="text-sm text-gray-500">Phone: {location.phone}</p>
                    <p className="text-sm text-gray-500">Email: {location.email}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
