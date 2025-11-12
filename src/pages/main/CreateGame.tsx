import axios from "axios";
import { useTransition } from "react"
import { useNavigate } from "react-router";

export function CreateGame() {
  const [pending, startTransition] = useTransition();
  const navigate = useNavigate();

  return (
    <form
      className="flex flex-col w-full"
      action={(fd) => startTransition(async () => {
        const { data: { id } } = await axios.post('/api/main/create-game', {
          title: fd.get('title'),
          maxGamers: +fd.get('maxGamers'),
          start: fd.get('start'),
        });

        await navigate('/game/' + id);
      })}
    >
      <fieldset className="fieldset">
        <legend className="fieldset-legend">
          Название города
        </legend>
        <input
          className="input w-full"
          name="title"
          required
        />
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">
          Максимум игроков
        </legend>
        <input
          className="input w-full"
          name="maxGamers"
          type="number"
          min={0}
          max={30}
          required
        />
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">
          Дата/время начала (опционально)
        </legend>
        <input
          className="input w-full"
          name="start"
          type="datetime-local"
          min={new Date().toISOString() + 'D'}
        />
      </fieldset>
      <div className="flex flex-row justify-between items-center mt-2">
        <div className="text-xs text-gray-500">
          Создав игру Вы сразу станете её ведущим
        </div>
        <button disabled={pending} className="btn btn-primary">
          {pending ? <span className="loading loading-dots" /> : 'Создать'}
        </button>
      </div>
    </form>
  );
}