import type { ComponentProps } from "react";

export function Button({ children, pending, ...props }: ComponentProps<'button'> & { pending?: boolean }) {
  return (
    <button
      disabled={pending}
      {...props}
    >
      {pending ? <span className="loading loading-dots" /> : children}
    </button>
  )
}