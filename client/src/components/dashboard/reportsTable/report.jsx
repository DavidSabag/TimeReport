import React, { useState, useContext } from "react";
import Button from '@mui/material/Button';
import { managerResponse } from "../../../services/managerResponse"

const Report = ({ employeeId, name, date, startTime, endTime, status }) => {

    const [showResponseBtns, setShowResponseBtns] = useState(true)

    const handleManagerResponse = async (e) => {
        const response = e?.target?.name ?? null
        const employeeId = e?.target?.id ?? null
        const { success, data } = await managerResponse({ response, employeeId })
        setShowResponseBtns(!success)
        console.table(data)

    }


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
            {showResponseBtns && !status && <>
                <Button
                    className="w-[100px] h-[30px] !normal-case !bg-[#3bb33b] !shadow-none top-[7px]"
                    variant="contained"
                    name='approve'
                    id={employeeId}
                    onClick={handleManagerResponse}
                >
                    Approve
                </Button>
                <Button
                    className="w-[100px] h-[30px] !normal-case !bg-[lightcoral] !shadow-none top-[7px]"
                    variant="contained"
                    name='reject'
                    id={employeeId}
                    onClick={handleManagerResponse}
                >
                    Reject
                </Button>
            </>
            }

        </div>
    )
}
export default Report
