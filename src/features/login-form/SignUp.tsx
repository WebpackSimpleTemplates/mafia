import { setUser, type AppDispatch } from "@/shared/store";
import axios from "axios";
import { useActionState } from "react";
import { useDispatch } from "react-redux";
import { AvatarInput } from "./AvatarInput";

type State = {
  username: string;
  password: string;
  passwordRepeat: string;
  avatar: string;
  errors: string[]
};

export function SignUp({ onAuth }: { onAuth?: () => void }) {
  const dispatch: AppDispatch = useDispatch();
  
  const [state, action, pending] = useActionState<State, FormData>(async (state, payload) => {
    const data = {
      username: payload.get('username') as string,
      password: payload.get('password') as string,
      avatar: payload.get('avatar') as string,
      passwordRepeat: payload.get('passwordRepeat') as string,
    }

    const errors = [];

    if (!data.username) {
      errors.push('username-require');
    }

    if (!data.password) {
      errors.push('password-require');
    }

    if (data.password !== data.passwordRepeat) {
      errors.push('passwords-not-compare');
    }

    if (!data.avatar) {
      errors.push('avatar-require');
    }

    if (!errors.length) {
      try {
        await axios.postForm('/api/register', {
          ...data,
          avatar: await fetch(data.avatar).then((res) => res.blob()).then((blob) => new File([blob], 'avatar', { type: blob.type }))
        });

        const token = await axios.post('/api/login_check', data).then((res) => res.data.token);

        localStorage.setItem('token', token);

        dispatch(setUser(await axios.get('/api/users/me').then((res) => res.data)));

        if (onAuth) {
          onAuth();
        } 
      } catch (error) {
        errors.push('username-exist');
      }
    }

    return { ...data, errors };
  }, { username: '', password: '', errors: [], passwordRepeat: '', avatar: null })
  
  return (
    <form action={action} className="flex flex-col w-full gap-2">
      <div className="text-xl font-semibold text-center mb-2">
        Регистрация
      </div>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">
          Автар
        </legend>
        <AvatarInput value={state.avatar} />
        {state.errors.includes('avatar-require') && (
          <p className="label text-error">Обязательное поле</p>
        )}
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">
          Имя пользователя
        </legend>
        <input
          className="input input-lg w-full"
          defaultValue={state.username}
          name="username"
        />
        {state.errors.includes('username-exist') && (
          <p className="label text-error">Такое имя уже существует</p>
        )}
        {state.errors.includes('username-require') && (
          <p className="label text-error">Обязательное поле</p>
        )}
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
        {state.errors.includes('password-require') && (
          <p className="label text-error">Обязательное поле</p>
        )}
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">
          Пароль повторно
        </legend>
        <input
          type="password"
          className="input input-lg w-full"
          defaultValue={state.passwordRepeat}
          name="passwordRepeat"
        />
        {state.errors.includes('passwords-not-compare') && (
          <p className="label text-error">Пароли не совпадают</p>
        )}
      </fieldset>
      <button disabled={pending} type="submit" className="btn btn-lg mt-2">
        {pending ? <span className="loading loading-dots" /> : 'Войти'}
      </button>
    </form>
  );
}