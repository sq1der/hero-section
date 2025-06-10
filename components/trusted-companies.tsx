import Image from "next/image"

export default function TrustedCompanies() {
  // Массив с данными о компаниях
  const companies = [
    {
      name: "Changan",
      logo: "/logos/changan-logo.png",
      alt: "Логотип Changan",
    },
    {
      name: "KAZNKS GROUP",
      logo: "/logos/kaznks-group-logo.png",
      alt: "Логотип KAZNKS GROUP",
    },
    {
      name: "NEW MOTORS.KZ",
      logo: "/logos/new-motors-logo.png",
      alt: "Логотип NEW MOTORS.KZ",
    },
  ]

  return (
    <section className="container mx-auto py-12 border-t border-gray-800">
      <h3 className="text-xl font-semibold mb-2">Нам доверяют ведущие компании</h3>
      <p className="text-gray-500 mb-8">Более 100 компаний выбрали нас для создания своих сайтов</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {companies.map((company, index) => (
          <div
            key={index}
            className="flex items-center justify-center h-20 md:h-24 bg-white rounded-lg p-4 transition-all duration-300 hover:shadow-lg border border-gray-100"
          >
            <div className="relative group">
              <Image
                src={company.logo || "/placeholder.svg"}
                alt={company.alt}
                width={200}
                height={80}
                className={`max-h-full w-auto object-contain filter grayscale transition-all duration-300 group-hover:grayscale-0 ${company.className || ""}`}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
