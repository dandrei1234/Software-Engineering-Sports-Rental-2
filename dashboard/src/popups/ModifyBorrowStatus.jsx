import React, { useState } from "react";
import axios from 'axios';
import {
  FormControl, InputLabel, Select,
  MenuItem, Button, CardContent
} from "@mui/material";

import { StyledCard, CardTitle, ActionBox } from './Styles';


export default function ModifyBorrowStatus({data, close, refresh, displaySuccessMessage, displayErrorMessage}) {
  const [status, setStatus] = useState(data.borrow_status);

    const modifyBorrowStatus = async () => {
        if (!status) {
            displayErrorMessage("Invalid Status", "Please specify a valid status.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:1337/rentals/set-borrow-status', {
                rentalID: data.rentalID,
                borrow_status: status
            });
            
            refresh();
            displaySuccessMessage("Borrow Status Modification Success", "The borrow status has been modified successfully.");
        } catch (error) {
            displayErrorMessage("Borrow Status Modification Failed", "Failed to modify the borrow request");
        }
    };

  return (
    
    <StyledCard>
        <CardTitle title="Modify Status" />
        <CardContent>
    <FormControl fullWidth>
    <InputLabel id="status-label">Status</InputLabel>
    <Select
        labelId="status-label"
        value={status}
        label="Status"
        onChange={(e) => setStatus(e.target.value)}
    >
      <MenuItem value="Pending">Pending</MenuItem>
      <MenuItem value="Returned">Returned</MenuItem>
      <MenuItem value="Approved">Approved</MenuItem>
      <MenuItem value="Rejected">Rejected</MenuItem>
    </Select>
    </FormControl>

            <ActionBox>
                <Button variant="contained" size="large" onClick={() => modifyBorrowStatus()}>
                    Modify Status
                </Button>
                <Button size="large" onClick={close}>
                    Cancel
                </Button>
            </ActionBox>
        </CardContent>
    </StyledCard>
  );
}