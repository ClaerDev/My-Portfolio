import {
  BsAwardFill,
  BsCodeSlash,
  BsGlobe,
  BsJournalAlbum,
} from "react-icons/bs"
import Fact from "./Fact"

export default function Facts() {
  return (
    <ul className="grid grid-cols-2 mb-12 logos sm:grid-cols-4">
      <Fact Icon={BsCodeSlash} desc="100,000+ Lines Written" border />
      <Fact Icon={BsAwardFill} desc="8+ Years Experience" border />
      <Fact Icon={BsGlobe} desc="5+ Countries Worked" border />
      <Fact Icon={BsJournalAlbum} desc="20+ Projects Shipped" />
    </ul>
  )
}
