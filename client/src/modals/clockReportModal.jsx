import React, { useRef } from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { updateReport } from '../services/updateReport';
const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 250,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '15px',
    display: 'flex',
    flexDirection: 'column',
    pt: 2,
    px: 4,
    pb: 3,
};

export default function ClockReportModal({ setOpenModal, state, clock }) {
    const noteRef = useRef();

    const handleClose = () => {
        setOpenModal(false);
    };

    const handleSave = async () => {
        const { empManagerId } = state?.employeeData?.data ?? {};
        const note = noteRef.current.value
        const { success, err } = await updateReport({ empManagerId, clock, note })
        setOpenModal(false);
        alert(success ? 'success' : err?.name || err)
    };


    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={{ ...style }}>

                    <p className="flex justify-center text-[21px] font-[500]">SAVE MY TIME</p>

                    <textarea ref={noteRef} className="w-full h-[150px] border text-base resize-none p-2.5 rounded-lg border-solid border-[#ccc]" placeholder="Type your message..."></textarea>
                    <div className="flex justify-around mt-[20px]">
                        <Button
                            className="w-[100px]  !normal-case !shadow-none"
                            variant="contained"

                            onClick={handleSave}>
                            Save
                        </Button>
                        <Button
                            className="w-[100px]  !normal-case !shadow-none"
                            variant="contained"

                            onClick={handleClose}>
                            Cancel
                        </Button>
                    </div>

                </Box>
            </Modal>
        </div>
    );
}