import { isToAccentSelector, isToSpeakerSelector } from "@/shared/store/selectors/tools.selectors"
import { useSelector } from "react-redux"

export function Hint() {
  const isToSpeaker = useSelector(isToSpeakerSelector);
  const isToAccent = useSelector(isToAccentSelector);

  if (isToSpeaker || isToAccent) {
    return "Выберите жителя";
  }

  return (
    <></>
  )
}