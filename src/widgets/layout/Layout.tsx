import { userIdSelector } from "@/shared/store/selectors/auth.selectors";
import { Login } from "./Login";
import { Link, Outlet } from "react-router";
import { useSelector } from "react-redux";
import { Profile } from "./Profile";

export function Layout() {
  const userId = useSelector(userIdSelector);

  return (
    <main className="flex flex-col w-full h-full">
      <header className="flex flex-row justify-between items-center w-full py-3 px-7 bg-base-100">
        <a href="https://alphamatica.ru/">
          <img src="/logo.svg" className="h-7" />
        </a>
        {!userId && <Login />}
        {!!userId && <Profile />}
      </header>
      <div className="h-full w-full flex-1 overflow-auto">
        <Outlet />
      </div>
    </main>
  );
}   