import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Table, TableBody, TableCell,
  TableRow, TableHead, Stack
} from '@mui/material';

import { ActionBox } from './Styles';


const RentalSearchTable = ({data}) => {
//   const [searchedRows, setSearchedRows] = useState([]);

  return (
    <>
    {data.length > 0?
    <Table>
        <TableHead>
            <TableRow>
            <TableCell>Equipment Name</TableCell>
            <TableCell align="center">Category</TableCell>
            <TableCell align="center">Condition</TableCell>
            <TableCell align="center">Borrow Status</TableCell>
            <TableCell align="center">Dates</TableCell>
            <TableCell align="center">Action</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {data.map((row, index) => (
                <TableRow key={index}>
                    <TableCell>{row.equipment_name}</TableCell>
                    <TableCell align="center">{row.category_name}</TableCell>
                    <TableCell align="center">{row.condition_status}</TableCell>
                    <TableCell align="center">{row.borrow_status}</TableCell>
                    <TableCell sx={{fontSize: '12px', minWidth: '150px'}}>
                        {row.due_date? ("Due: ", row.due_date, <br/>) : ""}
                        {row.return_date? "Return: " + row.return_date : ""}
                        {row.request_date? "Request: " + row.request_date : ""}
                    </TableCell>
                    <TableCell
                        align="center">
                        <Stack direction='row' spacing='5px'>
                            <Button variant="contained" color="primary"
                                sx={{
                                    backgroundColor: "#5496e0",
                                    color: "white",
                                    '&:hover': {
                                        backgroundColor: "#2777b2"
                                    }
                                }}>Approve</Button>
                                
                            <Button variant="contained" color="primary"
                                sx={{
                                    backgroundColor: "#e07785",
                                    color: "white",
                                    '&:hover': {
                                        backgroundColor: "#b34553"
                                    }
                                }}>Reject</Button>
                        </Stack>
                    </TableCell>
                </TableRow>
                ))}
        </TableBody>
    </Table>
    : false}
    </>
  );
};

export default RentalSearchTable;