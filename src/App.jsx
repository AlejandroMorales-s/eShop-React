import React, {useEffect , useContext} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
//* Global Context
import { globalContext } from './components/globalContext/GlobalContext';
//* GET method
import { get } from './api';
//* Login - SignUp
import Login from './views/Login';
import SignUp from './views/SignUp';
//* Feed
import Feed from './views/Feed';
//* Address
import Addresses from './views/Addresses';
import AddAddress from './views/AddAddress';
//* My Account
import MyAccount from './views/MyAccount';
import MyData from './views/MyData';
import MyCards from './views/MyCards';
import AddCard from './components/myCards/AddCard';
//* Product Details
import Product from './views/Product';
//* Buy Product
import Shipping from './components/buyProduct/Shipping';
import Payments from './components/buyProduct/Payments';

function App() {

  const navigate = useNavigate();
  const {setUser} = useContext(globalContext);

  useEffect(() => {
    get('/api/auth/validate')
    .then(({user}) => {
      setUser({type:'LOGIN', user: user});
      navigate("/feed");
    })
    .catch(err => {
      //console.log(err);
    })
  }, [setUser]);

  return (
      <Routes>
        {/* Login - Sign Up */}
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        {/* Feed */}
        <Route path="/feed" element={<Feed/>} />
        {/* Address */}
        <Route path="/account/my-addresses" element={<Addresses/>} />
        <Route path="/account/my-addresses/add-address" element={<AddAddress/>} />
        {/* My Account */}
        <Route path="/account" element={<MyAccount/>} />
        <Route path="/account/my-data" element={<MyData/>} />
        {/* My Cards */}
        <Route path="/account/my-cards" element={<MyCards/>} />
        <Route path="/account/add-card" element={<AddCard/>} />
        {/* Product Details */}
        <Route path="/product-details/:id" element={<Product/>} />
        {/* Buy Product */}
        <Route path="/:id/buy/">
          <Route path="shipping" element={<Shipping/>} />
          <Route path="payments" element={<Payments/>} />
        </Route>
      </Routes>
  );
}

export default App;
