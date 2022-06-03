import React, {useEffect , useContext} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
//* Global Context
import { globalContext } from './components/globalContext/GlobalContext';
//* GET method
import { get } from './api';
//* Login - SignUp
import Login from './components/views/Login';
import SignUp from './components/views/SignUp';


function App() {

  const navigate = useNavigate();
  const {setUser} = useContext(globalContext);
  
  useEffect(() => {
    get('/api/auth/validate')
    .then(res => {
      setUser({
        logged:true,
        user:res.user
      })
      navigate("/feed",{
        replace:true
      });
    })
    .catch(err => {
      console.log(err);
    })
  }, [setUser])

  
  return (
      <Routes>
        {/* Login - Sign Up */}
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />

      </Routes>
  );
}

export default App;
