import Image from "next/image"
import { MouseEvent } from "react"
import { IoMdClose } from "react-icons/io"
import { menus, socialMedia } from "../data"
import SideMenuBtn from "./SideMenuBtn"
import { ProfileData } from "../types"
import { currentMenuVar, showMenuVar } from "../store"
import { useReactiveVar } from "../hooks/useReactiveVar"

interface Props {
  profile: ProfileData
}

export default function SideMenuLb({ profile }: Props) {
  const sideMenu = useReactiveVar(showMenuVar)
  const menuId = useReactiveVar(currentMenuVar)

  function closeLb(e: MouseEvent): void {
    if ((e.target as Element).classList.contains("lb")) {
      showMenuVar.set(false)
    }
  }

  return (
    <section
      onClick={closeLb}
      className={`lb fixed top-0 left-0 w-screen h-screen bg-black/40 z-50 transition-all duration-300 ${
        sideMenu ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <main className="max-h-screen h-screen noScroll overflow-y-scroll w-[32rem] max-w-full bg-white flex flex-col relative shadow-xl">
        {/* close button */}
        <button
          onClick={() => showMenuVar.set(false)}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-gray-100 hover:bg-main-orange text-gray-500 hover:text-white text-2xl flex justify-center items-center transition-all duration-200 shadow-sm"
        >
          <IoMdClose />
        </button>

        {/* profile area */}
        <div className="pt-16 pb-10 flex flex-col items-center customLine relative before:bottom-0 borderLeft">
          <div className="w-[110px] h-[110px] relative rounded-full overflow-hidden border-4 border-white shadow-md mb-5">
            <Image
              src={profile.ownersPhoto.url}
              alt="profile"
              fill
              className="object-cover"
            />
          </div>
          <h3 className="text-[1.8rem] text-gray-800 font-semibold text-center mb-1">
            {profile.name}
          </h3>
          <p className="text-main-orange text-xl mb-5">Senior AI &amp; Full Stack Engineer</p>

          {/* social icons */}
          <div className="flex gap-5 items-center justify-center">
            {socialMedia.map(({ id, Icon, label, mediaUrl }) => (
              <a
                key={id}
                href={mediaUrl}
                title={label}
                rel="noreferrer"
                target="_blank"
                className="text-gray-400 hover:text-main-orange transition-colors duration-200"
              >
                <Icon className="text-3xl" />
              </a>
            ))}
          </div>
        </div>

        {/* nav */}
        <div className="flex-grow">
          {menus.map((m, i) => (
            <SideMenuBtn
              key={m.id}
              menu={m}
              active={menuId === m.id}
              onClick={() => {
                showMenuVar.set(false)
                currentMenuVar.set(m.id)
              }}
              last={i === menus.length - 1}
            />
          ))}
        </div>

        {/* download cv */}
        <div className="p-10">
          <a
            href={profile.cv}
            download
            target="_blank"
            rel="noreferrer"
            className="w-full h-16 rounded-lg bg-main-orange text-white text-xl font-bold uppercase flex items-center justify-center hover:opacity-85 transition-opacity duration-200"
          >
            Download CV
          </a>
        </div>
      </main>
    </section>
  )
}
