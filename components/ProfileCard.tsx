import { AiFillGithub } from "react-icons/ai"
import { BsFillCloudArrowDownFill } from "react-icons/bs"
import { MdLocationOn } from "react-icons/md"
import { ProfileData } from "../types"
import MyLink from "./MyLink"
import Typing from "./Typing"
import Image from "next/image"
import { motion } from "framer-motion"

interface Props {
  profileData: ProfileData
}

export default function ProfileCard({ profileData }: Props) {
  return (
    <div className="profile h-full lg:w-[42rem] xl:w-[48rem] bg-white rounded-lg relative lg:block hidden">
      <div className="relative z-40 w-full h-full myShadow flex flex-col items-center justify-center pt-16">

        {/* ── animated blue header background ── */}
        <div className="absolute top-0 left-0 w-full h-[17rem] rounded-t-lg overflow-hidden">
          {/* base blue gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#2eb5d5] via-[#56c8e8] to-[#edfafe]" />

          {/* diagonal colour-block overlay — slow drift */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-[#1a8fb0]/60 via-transparent to-transparent"
            animate={{ opacity: [0.6, 1, 0.6], x: [0, 8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* large blurred circle top-right — floating */}
          <motion.div
            className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10 blur-2xl"
            animate={{ y: [0, 18, 0], x: [0, -10, 0], scale: [1, 1.12, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* small blurred circle bottom-left — floating opposite phase */}
          <motion.div
            className="absolute bottom-0 -left-6 w-32 h-32 rounded-full bg-[#1a8fb0]/30 blur-xl"
            animate={{ y: [0, -14, 0], x: [0, 10, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          {/* extra accent circle centre-right — slow pulse */}
          <motion.div
            className="absolute top-6 right-1/3 w-20 h-20 rounded-full bg-white/8 blur-xl"
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />

          {/* subtle dot-grid pattern — slow pan */}
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
            animate={{ backgroundPosition: ["0px 0px", "20px 20px", "0px 0px"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />

          {/* shimmer sweep — left to right */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 2.5 }}
          />

          {/* bottom wave clip */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none" style={{ height: "60px" }}>

            {/* wave 3 — back layer, slowest, lightest */}
            <motion.svg
              viewBox="0 0 1200 60"
              preserveAspectRatio="none"
              className="absolute bottom-0 w-[200%] h-full fill-white/20"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
            >
              <path d="M0,40 C200,10 400,60 600,35 C800,10 1000,55 1200,30 L1200,60 L0,60 Z" />
            </motion.svg>

            {/* wave 2 — mid layer, medium speed */}
            <motion.svg
              viewBox="0 0 1200 60"
              preserveAspectRatio="none"
              className="absolute bottom-0 w-[200%] h-full fill-white/40"
              animate={{ x: ["-50%", "0%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              <path d="M0,30 C150,55 350,5 600,30 C850,55 1050,5 1200,30 L1200,60 L0,60 Z" />
            </motion.svg>

            {/* wave 1 — front layer, fastest, fully white */}
            <motion.svg
              viewBox="0 0 1200 60"
              preserveAspectRatio="none"
              className="absolute bottom-0 w-[200%] h-full fill-white"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <path d="M0,45 C100,20 300,60 600,38 C900,16 1100,52 1200,40 L1200,60 L0,60 Z" />
            </motion.svg>
          </div>
        </div>

        <div className="relative z-20 w-96 h-96 mt-4 profilePic">
          {/* ── decorative background ── */}
          <div className="absolute inset-0 -z-10 flex items-center justify-center">
            {/* large blurred gradient blob */}
            <div className="absolute w-[26rem] h-[26rem] rounded-full bg-gradient-to-br from-[#56c8e8]/30 via-[#a5def5]/20 to-transparent blur-2xl" />
            {/* rotating dashed ring */}
            <div className="avatarRingCW absolute w-[23rem] h-[23rem] rounded-xl border-2 border-dashed border-[#56c8e8]/40" />
            {/* solid thin ring, counter-rotated */}
            <div className="avatarRingCCW absolute w-[20rem] h-[20rem] rounded-xl border border-[#56c8e8]/25" />
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
