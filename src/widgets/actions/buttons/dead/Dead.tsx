import { isNightSelector } from "@/shared/store";
import { FaSkullCrossbones } from "react-icons/fa";
import { useSelector } from "react-redux";

export function Dead() {
  const isNight = useSelector(isNightSelector);
  return (
    <div className="tooltip" data-tip="Объявить жителя убитым">
      <button disabled={isNight} className="btn btn-lg btn-square">
        <FaSkullCrossbones />
      </button>
    </div>
  )
}