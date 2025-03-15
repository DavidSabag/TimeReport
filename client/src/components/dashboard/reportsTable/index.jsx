import React, { useContext } from "react";
import { EmployeeDataContext } from "../../../globalState";
import { managerResponse } from "../../../services/managerResponse"
import Report from "./report";

const ReportsTable = () => {
    const { state } = useContext(EmployeeDataContext);
    const reports = state.employeeData.data?.[0]?.reports ?? null

    const handleManagerResponse = async (e) => {
        const response = e.target.name
        const { success } = await managerResponse({ response })
        console.log(success)


    }
    return (
        <div className="h-[100%] mt-[50px]">
            <header className="font-[500] text-[21px] text-[#5f5b5b] mb-[3px] ml-[1px] flex flex-wrap">
                <label className="lg:mr-[5px]">Submitted Reports</label>
                <label>(For managers view only)</label>
            </header>
            <div className="rounded-[15px] border-[1px] border-solid border-[black] flex  flex-col h-[50%] overflow-y-auto overflow-x-hidden">
                {
                    reports?.length > 0 ?
                        reports.map(report => <Report
                            key={report.date}
                            {...report}
                            handleManagerResponse={handleManagerResponse}
                        />) :
                        <p className="text-[#5f5b5b] font-[500] text-[21px] m-auto">No Reports Yet</p>

                }
            </div>
        </div>
    )
}
export default ReportsTable
