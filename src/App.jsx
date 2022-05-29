import React from 'react';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
//* Login - SignUp
import Login from './components/views/Login';
import SignUp from './components/views/SignUp';

function App() {
  return (
    <Router>
      <Routes>
        {/* Login - Sign Up */}
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
    </Router>
  );
}

export default App;
