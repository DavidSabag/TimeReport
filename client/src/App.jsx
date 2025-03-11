import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./login";
import { useState } from "react";

function App() {  
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />            
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated}/>} />            
            <Route
              path="/dashboard"
              element={isAuthenticated ? <>this is protected</> : <Navigate to="/login" />}
            />
            
        </Routes>
      </BrowserRouter>
    </>
  )
}


export default App
