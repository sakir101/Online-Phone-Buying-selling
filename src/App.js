import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './Routes/Routes/Routes';

function App() {
  return (
    <div className='max-w-screen-xl mx-auto p-5'>
     <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
