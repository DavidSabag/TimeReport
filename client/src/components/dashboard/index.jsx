import React, { useState, useContext } from "react";
import EmployeeDetails from "./EmployeeDetails";
import Button from '@mui/material/Button';
import ReportsTable from './reportsTable';
import { EmployeeDataContext } from "../../globalState";
import ClockReportModal from "../../modals/clockReportModal"
import Cookies from 'js-cookie';

const Dashboard = () => {

  const { state } = useContext(EmployeeDataContext);
  const { premissionGroups } = state.employeeData.data ?? null
  const [openModal, setOpenModal] = useState(false);
  const [clock, setClock] = useState('')

  const handleExit = () => {
    Cookies.remove('session-token');
    window.location.reload();
  }



  const handleClock = (e) => {
    const name = e.target.name
    setOpenModal(true)
    setClock(name)
  }

  return (
    <div className="lg:w-[70%] w-[95%] h-[770px] mx-[auto] lg:my-[10vh] my-[5vh] rounded-[15px] border-[1px] border-solid border-[black] flex justify-center flex-col overflow-hidden" >
      <Button size="small" className="!absolute !left-2 !top-2" onClick={handleExit}>Exit</Button>
      <div className="self-center h-[90%] w-[95%]">
        <EmployeeDetails state={state} />
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

        {
          premissionGroups.some(p => p === 'manager') && <ReportsTable state={state} />
        }
      </div >
      {openModal && <ClockReportModal setOpenModal={setOpenModal} state={state} clock={clock} />}
    </div>
  )
}



export default Dashboard
