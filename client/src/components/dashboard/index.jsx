import React from "react";
import EmployeeDetails from "./EmployeeDetails";
import Button from '@mui/material/Button';
import ReportsTable from './reportsTable'

const Dashboard = () => {

  const handleClock = (e) => {
    const name = e.target.name
    console.log(name)

  }

  return (
    <div className="lg:w-[70%] w-[95%] h-[770px] mx-[auto] lg:my-[10vh] my-[5vh] rounded-[15px] border-[1px] border-solid border-[black] flex justify-center flex-col overflow-hidden" >
      <div className="self-center h-[90%] w-[95%]">
        <EmployeeDetails />
        <div className="flex !mt-[30px] lg:justify-evenly justify-around">
          <Button
            className="w-[150px]  !normal-case !bg-[#bcbebf] !shadow-none"
            variant="contained"
            name='clockIn'
            onClick={handleClock}
          >
            Clock In
          </Button>
          <Button
            className="w-[150px] !normal-case !bg-[#bcbebf] !shadow-none"
            variant="contained"
            name='clockOut'
            onClick={handleClock}
          >
            Clock Out
          </Button>
        </div>
        <ReportsTable />
      </div >
    </div>
  )
}



export default Dashboard
