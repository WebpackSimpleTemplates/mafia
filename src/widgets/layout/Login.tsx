import { LoginForm } from "@/features/login-form";
import { useState } from "react";
import { BiLogIn } from "react-icons/bi";

export function Login() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="btn btn-sm" onClick={() => setOpen(true)}>
        <BiLogIn />
        Войти
      </button>
      <dialog className="modal" open={open}>
        <form action={() => setOpen(false)} className="modal-backdrop">
          <button>close</button>
        </form>
        <div className="modal-box">
          <LoginForm />
        </div>
      </dialog>
    </>
  );
}