import { Game } from '@/pages/game'
import './index.css'
import { Provider } from 'react-redux';
import { setGame, setUser, store } from '@/shared/store';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { Main } from '@/pages/main/Main';
import { Layout } from '@/widgets/layout';
import { use } from 'react';
import { ToastContainer } from 'react-toastify';

import axios from 'axios';
import { getGameState } from '@/shared/api';

axios.interceptors.request.use((config) => {
  
  if (localStorage.getItem('token')) { 
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('token'); 
  }

  return config;
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Main />,
      },
    ]
  },
  {
    path: 'game/:gameId',
    loader: async ({ params: { gameId } }) => store.dispatch(setGame(await getGameState(+gameId))),
    element: <Game />,
  },
]);

const initPromise = (async () => {
  if (!localStorage.getItem('token')) {
    return;
  }

  try {
    const user = await axios.get('/api/users/me').then((res) => res.data);

    store.dispatch(setUser(user));
  } catch (error) {
    localStorage.removeItem('token');
  }
})();

export function App() {
  use(initPromise);

  return (
    <Provider store={store}>
      <ToastContainer />
      <RouterProvider router={router} />
    </Provider>
  );
}

