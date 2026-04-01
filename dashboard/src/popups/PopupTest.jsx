import React, { useState, useEffect } from 'react';
import { Button, Stack } from '@mui/material';
import Popup from './Popup';

function PopupTest() {
    const [open, setOpen] = useState(false);

    const [rentals, setRentals] = useState([]);

    const [data, setData] = useState({
        rentalId: -1,
        borrow_status: 'Pending'
    });

    function rental(
        itemID, equipment_name,
        userID, quantity) {
            setRentals({
                itemID: itemID,
                equipment_name: equipment_name,
                userID: userID,
                quantity: quantity
            });
    }



    return (
        <>
            {/* <Popup
                addEquipment
                open={open}
                setOpen={setOpen} /> */}
                
            {/* <Popup
                rentalSearch
                open={open}
                setOpen={setOpen} /> */}
            
{/* 
            <Popup
                borrow
                open={open}
                setOpen={setOpen}
                data={{}} /> */}

            <Popup
                modifyBorrowStatus
                data={data}
                open={open}
                setOpen={setOpen} />

            <Stack direction="row" spacing={2}>
                <Button onClick={() =>
                    rental(1, 'Volleyball (Mikasa)', 1, 10)
                }>

                </Button>
            </Stack>


            <Button variant="contained" onClick={() => setOpen(true)}>
                Open Popup
            </Button>
        </>
    );
}

export default PopupTest;