import { useQuery } from "@/shared/hooks/useQuery";
import axios from "axios";

export function View({ id }: { id: number }) {
  const user = useQuery('user-' + id, () => axios.get('/api/users/' + id).then((res) => res.data));

  return (
    <>
      <img src={user.avatar} className="w-30 h-30 rounded-full object-center object-cover mx-auto" />
      <div className="text-xl font-semibold mt-6">
        {user.username}
      </div>
    </>
  )
}