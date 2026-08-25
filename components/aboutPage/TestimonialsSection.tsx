import { useState, useEffect } from "react"
import { testimonials } from "../../data"
import Image from "next/image"

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const t = testimonials[current]

  return (
    <div className="px-12 py-10">
      <div className="flex flex-col items-center pb-16 min-h-[28rem]">
        <p className="text-2xl italic text-gray-500 text-center font-medium tracking-wide relative mb-8 quote">
          <span className="inline-block mx-14">{t.quote}</span>
        </p>

        <div className="w-[90px] h-[90px] relative rounded-full overflow-hidden border-2 border-gray-100">
          <Image
            src={t.userImage.url}
            alt={t.userName}
            fill
            className="object-cover"
          />
        </div>

        <h2 className="capitalize text-2xl font-semibold text-gray-800 mt-3 mb-1.5">
          {t.userName}
        </h2>
        <p className="text-xl text-gray-400 capitalize">{t.userProfession}</p>

        {/* dots */}
        <div className="flex gap-3 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-[0.9rem] h-[0.9rem] rounded-full border border-main-orange transition-all ${
                idx === current ? "bg-main-orange" : "bg-transparent"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
