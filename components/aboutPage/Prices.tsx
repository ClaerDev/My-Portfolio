import Price from "./Price"
import { DiCodeigniter } from "react-icons/di"
import { GiCondorEmblem } from "react-icons/gi"
import { prices } from "../../data"

export default function Prices() {
  return (
    <ul className="prices grid sm:grid-cols-2 grid-cols-1">
      <li className="relative vCustomLine sm:before:block before:hidden before:right-0">
        <center>
          <Price Icon={DiCodeigniter} price={prices[0]} />
        </center>
      </li>
      <li>
        <Price Icon={GiCondorEmblem} price={prices[1]} />
      </li>
    </ul>
  )
}
