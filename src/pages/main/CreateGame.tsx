import axios from "axios";
import { useTransition } from "react"
import { useNavigate } from "react-router";

export function CreateGame() {
  const [pending, startTransition] = useTransition();
  const navigate = useNavigate();

  return (
    <form
      className="flex flex-row gap-2 w-full"
      action={(fd) => startTransition(async () => {
        const title = fd.get('title');

        const { id } = await axios.post('/api/games/create', { title }).then((res) => res.data);

        await navigate('/game/' + id);
      })}
    >
      <input
        className="input flex-1"
        placeholder="Придумайте название города..."
        name="title"
      />
      <button disabled={pending} className="btn btn-primary">
        {pending ? <span className="loading loading-dots" /> : 'Создать'}
      </button>
    </form>
  );
}