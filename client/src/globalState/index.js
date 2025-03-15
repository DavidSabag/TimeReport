import { createContext } from 'react';

const EmployeeDataContext = createContext();

const initialState = {
    isAuthenticated: false,
    employeeData: null,
};

const employeeDataReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, isAuthenticated: action.payload };
        case 'EMPLOYEEDATA':
            return { ...state, employeeData: action.payload };
        default:
            throw new Error(`Unknown action: ${action.type}`);
    }
};



export {
    EmployeeDataContext,
    initialState,
    employeeDataReducer
}


