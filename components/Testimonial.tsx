import Image from "next/image"
import { TestimonialData } from "../types"

interface Props {
  testimonial: TestimonialData
}

export default function Testimonial({ testimonial }: Props) {
  return (
    <div className="px-12 py-10 flex flex-col items-center">
      <p className="text-2xl italic text-gray-500 text-center font-medium tracking-wide relative mb-8 quote">
        <span className="inline-block mx-14">{testimonial.quote}</span>
      </p>

      <div className="w-[90px] h-[90px] relative rounded-full overflow-hidden border-2 border-gray-100">
        <Image
          src={testimonial.userImage.url}
          alt={testimonial.userName}
          fill
          className="object-cover"
        />
      </div>

      <h2 className="capitalize text-2xl font-semibold text-gray-800 mt-3 mb-1.5">
        {testimonial.userName}
      </h2>
      <p className="text-xl text-gray-400 capitalize">{testimonial.userProfession}</p>
    </div>
  )
}
