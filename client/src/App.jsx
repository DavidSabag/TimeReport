import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import { employeeDataReducer, initialState, EmployeeDataContext } from "./globalState"
import { useReducer } from 'react';

function App() {
  const [state, dispatch] = useReducer(employeeDataReducer, initialState);


  return (
    <EmployeeDataContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={state.isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </EmployeeDataContext.Provider>
  )
}


export default App
