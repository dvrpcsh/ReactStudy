import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import {store} from './third_study/app/store';
//import './index.css'
import './second_homework/index.css'
import App from './App.jsx'
// import App2 from './App2.jsx'
// import App3 from './App3.jsx'
import App4 from './App4.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    {/* <App /> */}
    {/* <App2 /> */}
    {/* <App3 /> */}

    <Provider store={store}>
      <App4 />
    </Provider>

  </StrictMode>,
)
