import Image from "next/image"

interface Props {
  images: { url: string }[]
}

export default function Slide({ images }: Props) {
  return (
    <div className="bgSlider h-[32rem] overflow-hidden rounded-lg relative before:content-[''] before:absolute before:z-20 before:-left-8 before:-right-8 before:-bottom-[6.72rem] w-auto before:h-40 before:bg-white before:rounded-tl-[100%] before:rounded-tr-[100%]">
      <div className="w-full relative" style={{ height: "32rem" }}>
        <Image
          src={images[0].url}
          alt="profile background"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  )
}
