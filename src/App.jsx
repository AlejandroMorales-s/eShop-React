import React from 'react';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Login from './components/views/Login';

function App() {
  return (
    <Router>
      <Routes>
        {/* Login - Sign Up */}
        <Route path="/login" element={<Login/>} />

      </Routes>
    </Router>
  );
}

export default App;
