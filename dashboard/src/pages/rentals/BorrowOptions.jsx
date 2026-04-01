import { useState, useEffect, use } from 'react';
import axios from 'axios';
import {
  Button,
  Table, TableBody, TableCell,
  TableRow, TableHead, Stack
} from '@mui/material';

import Popup from '../../popups/Popup';

const BorrowOptions = () => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState(null);
    const [selectedData, setSelectedData] = useState(null);

    async function viewOptions() {
        axios
            .get("http://localhost:1337/rentals/get-borrow-options")
            .then((response) => {
                setData(response.data);
                
            })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        viewOptions();
    }, []);


    function borrow(index) {
        if (data[index].quantity <= 0) {
            alert("No more items available to borrow.");
            return;
        }

        setSelectedData(data[index]);
        setOpen(true);
    }
  return (
    <>
    <Popup
        borrow
        data={selectedData}
        refresh={viewOptions}
        open={open}
        setOpen={setOpen} />

    {data && data.length > 0?
    <Table>
        <TableHead>
            <TableRow>
            <TableCell align="center">Equipment Name</TableCell>
            <TableCell align="center">Available Quantity</TableCell>
            <TableCell align="center"></TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {data.map((row, index) => (
                <TableRow key={index}>
                    <TableCell align="center">{row.equipment_name}</TableCell>
                    <TableCell align="center">{row.quantity}</TableCell>
                    <TableCell
                        align="center">
                        <Button variant="contained" color="primary"
                            onClick={() => borrow(index)}
                            sx={{
                                backgroundColor: "#5496e0",
                                color: "white",
                                '&:hover': {
                                    backgroundColor: "#2777b2"
                                }
                            }}>Borrow</Button>
                    </TableCell>
                </TableRow>
                ))}
        </TableBody>
    </Table>
    : false}
    </>
  );
};

export default BorrowOptions;