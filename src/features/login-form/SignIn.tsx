import { setUser, type AppDispatch } from "@/shared/store";
import axios from "axios";
import { useActionState } from "react";
import { useDispatch } from "react-redux";

type State = {
  username: string;
  password: string;
  error: boolean;
};

export function SignIn({ onAuth }: { onAuth?: () => void }) {
  const dispatch: AppDispatch = useDispatch();
  
  const [state, action, pending] = useActionState<State, FormData>(async (state, payload) => {
    const username = payload.get('username') as string;
    const password = payload.get('password') as string;

    try {
      const token = await axios.post('/api/login_check', { username, password }).then((res) => res.data.token);

      localStorage.setItem('token', token);

      dispatch(setUser(await axios.get('/api/users/me').then((res) => res.data)));

      if (onAuth) {
        onAuth();
      }

      return { username, password, error: false };
    } catch (error) {
      return { username, password, error: true };
    }
  }, { username: '', password: '', error: false })
  
  return (
    <form action={action} className="flex flex-col w-full gap-2">
      {state.error && (
        <div className="alert alert-error">
          Неправильные имя пользователя или пароль
        </div>
      )}
      <div className="text-xl font-semibold text-center mb-2">
        Авторизация
      </div>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">
          Имя пользователя
        </legend>
        <input
          className="input input-lg w-full"
          defaultValue={state.username}
          name="username"
        />
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">
          Пароль
        </legend>
        <input
          type="password"
          className="input input-lg w-full"
          defaultValue={state.password}
          name="password"
        />
      </fieldset>
      <button disabled={pending} type="submit" className="btn btn-lg mt-2">
        {pending ? <span className="loading loading-dots" /> : 'Войти'}
      </button>
    </form>
  );
}