import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import User from './routes/User';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<User />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
