import React, {useEffect , useContext} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
//* Global Context
import { globalContext } from './components/globalContext/GlobalContext';
//* GET method
import { get } from './api';
//* Login - SignUp
import Login from './views/Login';
import SignUp from './views/SignUp';

//* Address
import Addresses from './views/Addresses';
import AddAddress from './views/AddAddress';
//* My Account
import MyAccount from './views/MyAccount';
import MyData from './views/MyData';

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
      //console.log(err);
    })
  }, [setUser])
  
  return (
      <Routes>
        {/* Login - Sign Up */}
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />

        {/* Address */}
        <Route path="/my-addresses" element={<Addresses/>} />
        <Route path="/my-addresses/add-address" element={<AddAddress/>} />
        {/* My Account */}
        <Route path="/account" element={<MyAccount/>} />
        <Route path="/account/my-data" element={<MyData/>} />
      </Routes>
  );
}

export default App;
