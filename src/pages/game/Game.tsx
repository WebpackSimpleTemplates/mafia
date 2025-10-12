import { Peers } from "@/widgets/peers";

export function Game() {
  return (
    <div className="flex flex-row w-full h-full">
      <div className="w-full h-full flex-1">
        playground
      </div>
      <Peers />
    </div>
  );
}