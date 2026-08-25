import type { NextPage } from "next"
import Head from "next/head"
import Background from "../components/Background"
import LoaderPage from "../components/LoaderPage"
import Menus from "../components/Menus"
import ProfileCard from "../components/ProfileCard"
import { menus } from "../data"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Toaster } from "react-hot-toast"
import { currentMenuVar, currentWorkIdVar, currentBlogIdVar, showMenuVar } from "../store"
import { useReactiveVar } from "../hooks/useReactiveVar"
import { BiMenu } from "react-icons/bi"
import SideMenuLb from "../components/SideMenuLb"
import WorkLb from "../components/worksPage/WorkLb"
import BlogLb from "../components/blogPage/BlogLb"

const profileData = {
  name: "Takumi Shimizu",
  bio: "Senior AI & Full Stack Engineer with 8+ years of experience.",
  ownersPhoto: {
    url: "/images/avatar.png",
  },
  bgImages: [
    {
      url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
    },
  ],
  cv: "/Takumi_Shimizu.pdf",
}

const exitClipPaths = [
  "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)",
  "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
]

const Home: NextPage = () => {
  const menuId = useReactiveVar(currentMenuVar)
  const workId = useReactiveVar(currentWorkIdVar)
  const blogId = useReactiveVar(currentBlogIdVar)
  const [loaderPage, setLoaderPage] = useState<boolean>(true)

  useEffect(() => {
    const timeoutId = setTimeout(() => setLoaderPage(false), 3500)
    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <main className="relative flex items-center justify-center min-h-screen home">
      <Head>
        <title>Takumi Shimizu — Portfolio</title>
        <meta
          name="description"
          content="Senior AI & Full Stack Engineer — Takumi Shimizu"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {loaderPage && <LoaderPage />}

      <Background />

      <AnimatePresence>
        {workId && <WorkLb />}
      </AnimatePresence>

      <AnimatePresence>
        {blogId && <BlogLb />}
      </AnimatePresence>

      <SideMenuLb profile={profileData} />

      <button
        onClick={() => showMenuVar.set(true)}
        className="fixed z-40 flex items-center justify-center text-white rounded-full top-6 right-6 w-14 h-14 bg-main-orange lg:hidden"
      >
        <BiMenu className="w-10 h-10" />
      </button>

      <section className="z-10 w-full h-full lg:w-[115rem] xl:w-[126.8rem] lg:h-[62.5rem] lg:flex p-10 sm:p-24 lg:p-0">
        <Menus />
        <ProfileCard profileData={profileData} />

        <div className="xl:w-[70.5rem] lg:w-[66rem] w-full h-full lg:py-6">
          <div className="relative bg-white h-full before:content-[''] before:absolute before:top-0 before:left-0 before:right-[0.7rem] before:h-6 before:bg-white before:z-30 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-[0.7rem] after:h-6 after:bg-white after:z-30">
            <AnimatePresence mode="wait">
              {menus.map(
                (m) =>
                  menuId === m.id && (
                    <motion.div
                      key={m.id}
                      className="w-full h-full max-h-full bg-white"
                      initial="initialState"
                      animate="animateState"
                      exit="exitState"
                      transition={{ duration: 0.75 }}
                      variants={{
                        initialState: {
                          opacity: 0,
                          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
                        },
                        animateState: {
                          opacity: 1,
                          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
                        },
                        exitState: {
                          clipPath:
                            exitClipPaths[
                              Math.floor(Math.random() * exitClipPaths.length)
                            ],
                        },
                      }}
                    >
                      <m.Component />
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <Toaster />
    </main>
  )
}

export default Home
