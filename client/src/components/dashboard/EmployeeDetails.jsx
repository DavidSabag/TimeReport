import React from "react";

const EmployeeDetails = ({ state }) => {

    const { firstName, lastName, role, manager } = state.employeeData.data ?? null

    return (
        <div className="grid lg:grid-cols-[300px_300px] grid-cols-[300px] gap-2.5 p-2.5 [&>label]:text-[20px] text-start p-2.5 text-[#5f5b5b]">
            <label className='lg:col-[1_/_3] col-[1_/_2] text-[20px] font-[500]'>EMPLOYEE DETAILS</label>
            <label className="!text-[18px] font-[500]">
                First Name: <label className="!text-[black] !font-[400]">{firstName}</label>
            </label>
            <label className="!text-[18px] font-[500]">
                Last Name: <label className="!text-[black] !font-[400]">{lastName}</label>
            </label>
            <label className="!text-[18px] font-[500]">
                Role: <label className="!text-[black] !font-[400]">{role}</label>
            </label>
            <label className="!text-[18px] font-[500]">
                Manager: <label className="!text-[black] !font-[400]">{manager}</label>
            </label>
        </div>
    )
}


export default EmployeeDetails
