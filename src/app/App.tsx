import { Game } from '@/pages/game'
import './index.css'
import { Provider } from 'react-redux';
import { store } from '@/shared/store';

export function App() {
  return (
    <Provider store={store}>
      <Game />
    </Provider>
  );
}

