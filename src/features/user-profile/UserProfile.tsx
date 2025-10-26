import { userIdSelector } from "@/shared/store";
import { useSelector } from "react-redux";
import { View } from "./View";
import { Edit } from "./Edit";


export function UserProfile({ id }: { id: number }) {
  const userId = useSelector(userIdSelector);
  
  if (userId !== id) {
    return <View id={userId} />;
  }

  return <Edit />;
}