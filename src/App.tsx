import { useState } from 'react'
import RouteList from '@/router'
import { Provider } from "react-redux";
import './App.css'
import store from './store';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Provider store={store}>
        <RouteList />
      </Provider>
    </div>
  )
}

export default App
