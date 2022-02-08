import { BrowserRouter } from "react-router-dom";
import Approuter from "./AppRouter/AppRouter";
import Navbar from "./common/components/NavBar/NavBar";
import 'antd/dist/antd.css'
import 'react-credit-cards/es/styles-compiled.css'
import { useEffect } from "react";
import { getLocalStorage } from "./utiles";
import { authUser, setUserData } from "./redux/actions";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    if(getLocalStorage("auth")) {
      dispatch(authUser())
      dispatch(setUserData(getLocalStorage("auth")))
    }
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Approuter />
      </BrowserRouter>
    </div>
  )
}

export default App;

