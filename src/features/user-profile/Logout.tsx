import { logout, type AppDispatch } from "@/shared/store";
import { useState } from "react";
import { useDispatch } from "react-redux"

export function Logout() {
  const dispatch: AppDispatch = useDispatch();

  const [exit, setExit] = useState(false);

  return (
    <>
      <div className="text-xl font-semibold mt-4 mb-2">
        Аккаунт
      </div>
      {!exit && (
        <button className="btn" onClick={() => setExit(true)}>
          Выйти
        </button>
      )}
      {exit && (
        <>
          Вы уверены, что хотите выйти из аккаунта?
          <div className="flex flex-row items-center gap-2 mt-2">
            <button className="btn" onClick={() => setExit(false)}>
              Нет
            </button>
            <button
              className="btn"
              onClick={() => {
                localStorage.removeItem('token');
                dispatch(logout());
              }}
            >
              Да
            </button>
          </div>
        </>
      )}
    </>
  )
}