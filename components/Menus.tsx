import MenuBtn from "./MenuBtn"
import { menus } from "../data"
import { currentMenuVar, showMenuVar } from "../store"
import { useReactiveVar } from "../hooks/useReactiveVar"

export default function Menus() {
  const menuId = useReactiveVar(currentMenuVar)

  return (
    <header className="xl:w-[7.2rem] lg:w-[7rem] py-6 h-full mr-4 hidden lg:flex flex-col gap-4">
      {/* hamburger */}
      <div
        onClick={() => showMenuVar.set(true)}
        className="h-[7.2rem] group rounded-lg bg-white shadow flex items-center justify-center cursor-pointer"
      >
        <div className="w-11">
          <div className="w-9/12 h-[0.24rem] bg-gray-400 transition-width duration-300 group-hover:w-full group-hover:bg-main-orange"></div>
          <div className="w-full h-1 my-2 bg-gray-400 group-hover:bg-main-orange"></div>
          <div className="w-9/12 h-[0.24rem] bg-gray-400 transition-width duration-300 group-hover:w-full group-hover:bg-main-orange"></div>
        </div>
      </div>

      {/* nav buttons */}
      <div className="overflow-hidden rounded-lg flex-1">
        {menus.map((m, i) => (
          <MenuBtn
            key={m.id}
            menu={m}
            noBorder={i + 1 === menus.length}
            active={menuId === m.id}
            onClick={() => currentMenuVar.set(m.id)}
          />
        ))}
      </div>
    </header>
  )
}
