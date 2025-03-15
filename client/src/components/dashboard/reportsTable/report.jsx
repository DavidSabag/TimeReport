import React from "react";
import Button from '@mui/material/Button';


const Report = ({ name, date, startTime, endTime, handleManagerResponse }) => {


    return (
        <div className="w-[100%] lg:!h-[55px] mt-[5px] pb-[25px] lg:ml-[15px] grid lg:grid-cols-[repeat(6,1fr)] grid-cols-[repeat(2,1fr)] gap-2.5 p-2.5 justify-center">
            <div className="flex flex-col">
                <label className="font-[500]">Name</label>
                <label>{name}</label>
            </div>
            <div className="flex flex-col">
                <label className="font-[500]">Date</label>
                <label>{date}</label>
            </div>
            <div className="flex flex-col">
                <label className="font-[500]">Start Time</label>
                <label>{startTime}</label>
            </div>
            <div className="flex flex-col">
                <label className="font-[500]">End Time</label>
                <label>{endTime}</label>
            </div>
            <Button
                className="w-[100px] h-[30px] !normal-case !bg-[#3bb33b] !shadow-none top-[7px]"
                variant="contained"
                name='approve'
                onClick={handleManagerResponse}
            >
                Approve
            </Button>
            <Button
                className="w-[100px] h-[30px] !normal-case !bg-[lightcoral] !shadow-none top-[7px]"
                variant="contained"
                name='reject'
                onClick={handleManagerResponse}
            >
                Reject
            </Button>

        </div>
    )
}
export default Report
