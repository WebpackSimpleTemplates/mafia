import { setUser, userSelector, type AppDispatch } from "@/shared/store";
import axios from "axios";
import { useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChangePassword } from "./ChangePassword";
import { Logout } from "./Logout";

export function Edit() {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(userSelector);

  const [pending, startTransition] = useTransition();

  return (
    <>
      <div className="text-xl font-semibold mb-2">
        Общая информация
      </div>
      <fieldset className="fieldset mb-4">
        <legend className="fieldset-legend pb-1 pt-0 mt-0">
          Имя пользователя
        </legend>
        <div className="text-xl font-semibold">
          {user.username}
        </div>
      </fieldset>
      <label className="cursor-pointer">
        {!pending && <img src={user.avatar} className="w-30 h-30 rounded-full object-center object-cover" />}
        {pending && (
          <div className="w-30 h-30 rounded-full bg-base-300">
            <span className="loading-spinner loading-xl" />
          </div>
        )}
        <input
          className="hidden"
          type="file"
          accept="image/*"
          disabled={pending}
          onChange={(e) => startTransition(async () => {
            const file = e.currentTarget.files[0];

            const { avatar } = await axios.postForm('/api/users/' + user.id, { avatar: file }).then((res) => res.data);

            dispatch(setUser({ ...user, avatar }));
          })}
        />
      </label>
      <ChangePassword />
      <Logout />
    </>
  )
}