import { UserProfile } from "@/features/user-profile";
import { userSelector } from "@/shared/store/selectors/auth.selectors";
import { useState } from "react"
import { useSelector } from "react-redux";

export function Profile() {
  const [open, setOpen] = useState(false);

  const user = useSelector(userSelector);

  return (
    <>
      <div className="flex flex-row items-center cursor-pointer" onClick={() => setOpen(true)}>
        <img src={user.avatar} className="w-8 h-8 object-center object-cover rounded-full" />
        <div className="text-xl ml-2 font-semibold">
          {user.username}
        </div>
      </div>
      <dialog className="modal" open={open}>
        <form action={() => setOpen(false)} className="modal-backdrop">
          <button>close</button>
        </form>
        <div className="modal-box">
          <UserProfile id={user.id} />
        </div>
      </dialog>
    </>
  );
}