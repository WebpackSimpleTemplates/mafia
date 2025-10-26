import { useState } from "react"
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";

export function LoginForm({ onAuth }: { onAuth?: () => void }) {
  const [up, setUp] = useState(false);
  
  if (!up) {
    return (
      <>
        <SignIn onAuth={onAuth} />
        <div className="text-center mt-3 text-sm">
          Нет аккаунта? <span className="ml-1 text-blue-500 hover:text-blue-500/70 transition cursor-pointer" onClick={() => setUp(true)}>Создайте его</span>
        </div>
      </>
    );
  }

  return (
    <>
      <SignUp onAuth={onAuth} />
      <div className="text-center mt-3 text-sm">
        Уже есть аккаунт? <span className="ml-1 text-blue-500 hover:text-blue-500/70 transition cursor-pointer" onClick={() => setUp(false)}>Войдите</span>
      </div>
    </>
  ); 
}