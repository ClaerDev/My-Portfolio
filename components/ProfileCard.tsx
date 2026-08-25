import { AiFillGithub } from "react-icons/ai"
import { BsFillCloudArrowDownFill } from "react-icons/bs"
import { MdLocationOn } from "react-icons/md"
import { ProfileData } from "../types"
import MyLink from "./MyLink"
import Typing from "./Typing"
import Image from "next/image"

interface Props {
  profileData: ProfileData
}

export default function ProfileCard({ profileData }: Props) {
  return (
    <div className="profile h-full lg:w-[42rem] xl:w-[48rem] bg-white rounded-lg relative lg:block hidden">
      <div className="relative z-40 w-full h-full myShadow flex flex-col items-center justify-center pt-16">

        {/* ── blue schema header background ── */}
        <div className="absolute top-0 left-0 w-full h-[17rem] rounded-t-lg overflow-hidden">
          {/* base blue gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#2eb5d5] via-[#56c8e8] to-[#edfafe]" />
          {/* diagonal colour-block overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#1a8fb0]/60 via-transparent to-transparent" />
          {/* large blurred circle top-right */}
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
          {/* small blurred circle bottom-left */}
          <div className="absolute bottom-0 -left-6 w-32 h-32 rounded-full bg-[#1a8fb0]/30 blur-xl" />
          {/* subtle dot-grid pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          {/* bottom wave clip */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
            <svg viewBox="0 0 500 40" preserveAspectRatio="none" className="w-full h-12 fill-white">
              <path d="M0,30 C150,60 350,0 500,30 L500,40 L0,40 Z" />
            </svg>
          </div>
        </div>

        <div className="relative z-20 w-72 h-72 mt-4 profilePic">
          {/* ── decorative background ── */}
          <div className="absolute inset-0 -z-10 flex items-center justify-center">
            {/* large blurred gradient blob */}
            <div className="absolute w-[22rem] h-[22rem] rounded-full bg-gradient-to-br from-[#56c8e8]/30 via-[#a5def5]/20 to-transparent blur-2xl" />
            {/* rotating dashed ring */}
            <div className="avatarRingCW absolute w-[19rem] h-[19rem] rounded-xl border-2 border-dashed border-[#56c8e8]/40" />
            {/* solid thin ring, counter-rotated */}
            <div className="avatarRingCCW absolute w-[16rem] h-[16rem] rounded-xl border border-[#56c8e8]/25" />
            {/* corner accent dots */}
            <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-[#56c8e8]/60" />
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#56c8e8]/40" />
            <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-[#56c8e8]/40" />
            <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-[#56c8e8]/60" />
          </div>

          <Image
            src={profileData.ownersPhoto.url}
            alt="userPic"
            fill
            className="z-20 relative rounded-xl border-4 border-white border-solid object-cover"
          />
        </div>

        <h1 className="text-center text-gray-800 text-[3.4rem] font-medium mt-8 mb-0.5">
          {profileData.name}
        </h1>

        <Typing />

        {/* location */}
        <div className="flex items-center gap-2 mt-4 text-gray-500 text-[1.4rem]">
          <MdLocationOn className="text-main-orange text-2xl flex-shrink-0" />
          <span>Osaka, Japan</span>
        </div>

        <div className="absolute bottom-0 left-0 flex w-full h-28 borderLeft customLine">
          <MyLink
            name="download cv"
            Icon={BsFillCloudArrowDownFill}
            url={profileData.cv}
            download
            border
          />
          <MyLink
            name="my github"
            Icon={AiFillGithub}
            url="https://github.com/claerdev"
          />
        </div>
      </div>
    </div>
  )
}
