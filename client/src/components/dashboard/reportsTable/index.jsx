import React from "react";
import Report from "./report";

const ReportsTable = () => {

    return (
        <div className="h-[100%] mt-[50px]">
            <header className="font-[500] text-[21px] text-[#5f5b5b] mb-[3px] ml-[1px] flex flex-wrap">
                <label className="lg:mr-[5px]">Submitted Reports</label>
                <label>(For managers view only)</label>
            </header>
            <div className="rounded-[15px] border-[1px] border-solid border-[black] flex  flex-col h-[50%] overflow-y-auto overflow-x-hidden">

                <Report />
                <Report />
                <Report />
                <Report />
                <Report />
                <Report />
                <Report />

            </div>
        </div>
    )
}
export default ReportsTable
