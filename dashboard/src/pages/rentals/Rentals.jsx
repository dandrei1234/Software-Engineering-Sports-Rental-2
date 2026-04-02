import { useState, useEffect } from 'react';
import axios from 'axios';
import { CardContent } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

import { CardTitle, StyledCard, MyButton, RedButton, OrangeButton } from '../../popups/Styles';
import Popup from '../../popups/Popup'
const Rentals = ({data, setData}) => {
    const [open, setOpen] = useState(false);
    const [currentRental, setCurrentRental] = useState(null);

    useEffect(() => {
        viewRentals();
    }, []);

    async function viewRentals() {
    
        const data = {
            userID: localStorage.getItem('id')
        };
        
        const response = await axios.post(
            'http://localhost:1337/rentals/view', data
        );
        setData(response.data);
    }

    function convertToDate(jDate)
    {
        const date = new Date(jDate);
        const formatted = String(date.getDate()).padStart(2, '0') + '-' +
            String(
                date.getMonth() + 1).padStart(2, '0') + '-' +
                date.getFullYear();
        return formatted;
    }

    function dueDate(rental) {
        if (rental.due_date) {
            return (<>
            Due: {convertToDate(rental.due_date)}<br/>
            </>);
        }
    }
    
    function returnDate(rental) {
        if (rental.return_date) {
            return (<>
            Return: {convertToDate(rental.return_date)}<br/>
            </>);
        }
    }

    function requestDate(rental) {
        if (rental.request_date) {
            return (<>
            Request: {convertToDate(rental.request_date)}<br/>
            </>);
        }
    }

    function onBorrowStatusClicked(index) {
        setCurrentRental({
            rentalID: data[index].rentalID,
            borrow_status: data[index].borrow_status
        });
        setOpen(true);
    }

    function approval(rental, index) {
        let buttonLabel = rental.borrow_status;
        if (
            rental.borrow_status === 'Approved' ||
            rental.borrow_status === 'Returned') {
            return (
                <>
                <MyButton
                    onClick={() => onBorrowStatusClicked(index)}
                    sx={{
                        fontSize: '12px',
                        width: '80px'
                    }}>{buttonLabel}</MyButton>
                </>
            );
        } else if (
            rental.borrow_status === 'Overdue' || 
            rental.borrow_status === 'Rejected' ) {
            return (
                <>
                <RedButton
                    onClick={() => onBorrowStatusClicked(index)}
                    sx={{
                        fontSize: '12px',
                        width: '80px'
                    }}>{buttonLabel}</RedButton>
                </>
            );
        } else if (rental.borrow_status === 'Pending') {
            return (
                <>
                <OrangeButton
                    onClick={() => onBorrowStatusClicked(index)}
                    sx={{
                        fontSize: '12px',
                        width: '80px'
                    }}>{buttonLabel}</OrangeButton>
                </>
            );
        }
    }

    return (
        <><Popup
            modifyBorrowStatus
            data={currentRental}
            refresh={viewRentals}
            open={open}
            setOpen={setOpen} />

        <StyledCard sx={{minWidth: '600px'}}>
            <CardTitle title="Rentals" />
            <CardContent>
                <Table stickyHeader sx={{backgroundColor: "white"}}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">ID</TableCell>
                            <TableCell align="center">Equipment Name</TableCell>
                            <TableCell align="center">Borrower</TableCell>
                            <TableCell align="center">Available<br/>Quantity</TableCell>
                            <TableCell align="center">Dates</TableCell>
                            <TableCell align="center">Actions<br/><small>(Click to change)</small></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data.map((rental, index) => (
                            <TableRow key={index}>
                                <TableCell>{rental.rentalID}</TableCell>
                                <TableCell>{rental.equipment_name}</TableCell>
                                <TableCell>{rental.user}</TableCell>
                                <TableCell align="center">{rental.quantity}</TableCell>
                                <TableCell sx={{fontSize: '12px', minWidth: '150px'}}>
                                    {dueDate(rental)}
                                    {returnDate(rental)}
                                    {requestDate(rental)}
                                </TableCell>
                                <TableCell>
                                    {approval(rental, index)}
                                </TableCell>
                            </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </CardContent>
        </StyledCard>
        </>
    );
};

export default Rentals;