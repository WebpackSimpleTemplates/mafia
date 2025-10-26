import { userIdSelector } from "@/shared/store";
import axios from "axios";
import { startTransition, useActionState, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";

type State = {
  oldPass: string,
  password: string,
  repeatPass: string,
  error: boolean,
  errorRequire?: boolean,
}

const initState: State = { oldPass: '', password: '', repeatPass: '', error: false }

export function ChangePassword() {
  const userId = useSelector(userIdSelector);
  const [success, setSuccess] = useState(false);

  const [state, action, pending] = useActionState<State, FormData | null>(async (state, payload) => {
    if (!payload) {
      return initState;
    }

    const data = {
      oldPass: payload.get('oldPass') as string,
      password: payload.get('password') as string,
      repeatPass: payload.get('repeatPass') as string,
    }

    if (!data.oldPass) {
      return { ...data, error: true };
    }

    if (!data.password) {
      return { ...data, errorRequire: true } as State;
    }

    if (data.password !== data.repeatPass) {
      return { ...data, error: false };
    }

    try {
      await axios.postForm('/api/users/' + userId, data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 1000);
      return initState;
    } catch (error) {
      console.log(error);
      return { ...data, error: true };
    }
  }, initState)

  return (
    <form action={action}>
      <div className="text-xl font-semibold mt-4 mb-2">
        Обновление пароля
      </div>
      <fieldset className="fieldset mb-2">
        <legend className="fieldset-legend pb-1 pt-0 mt-0">
          Старый пароль
        </legend>
        <input className={"input w-full" + (state.error ? ' input-error' : '')} name="oldPass" defaultValue={state.oldPass} />
        {state.error && (
          <p className="text-error label">
            Неверно
          </p>
        )}
      </fieldset>
      <fieldset className="fieldset mb-2">
        <legend className="fieldset-legend pb-1 pt-0 mt-0">
          Новый пароль
        </legend>
        <input className={"input w-full" + (state.errorRequire ? ' input-error' : '')} name="password" defaultValue={state.password} />
        {state.errorRequire && (
          <p className="text-error label">
            Обязательное поле
          </p>
        )}
      </fieldset>
      <fieldset className="fieldset mb-2">
        <legend className="fieldset-legend pb-1 pt-0 mt-0">
          Пароль повторно
        </legend>
        <input className={"input w-full" + (state.password !== state.repeatPass ? ' input-error' : '')} name="repeatPass" defaultValue={state.repeatPass} />
        {state.password !== state.repeatPass && (
          <p className="text-error label">
            Пароли не совпадают
          </p>
        )}
      </fieldset>
      {success && (
        <button type="button" disabled className="btn btn-success">
          <FaCheck />
          Обновлено
        </button>
      )}
      {!success && (
        <button className="btn" disabled={pending}>
          {pending ? <span className="loading loading-dots" /> : 'Обновить'}
        </button>
      )}
      <button className="btn ml-2" type="button" onClick={() => startTransition(() => action(null))}>
        Сбросить
      </button>
    </form>
  );
}