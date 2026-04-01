import React, { useState } from 'react';
import axios from 'axios';
import { CardContent, CardHeader, TextField, Autocomplete, Button } from '@mui/material';

import { StyledCard, CardTitle, FormContainer, ActionBox } from './Styles';

const Borrow = ({close, data, refresh, displaySuccessMessage, displayErrorMessage}) => {
    const [quantity, setQuantity] = useState(0);

    const handleChange = (e) => {
        if (e.target.value > data.quantity) {
            setQuantity(data.quantity);
        } else {
            setQuantity(e.target.value);
        }
    };

    const borrow = async () => {
        if (quantity <= 0) {
            displayErrorMessage("Invalid Quantity", "Please specify a valid quantity to borrow.");
            return;
        }

        alert("Trying");
        try {
            const response = await axios.post('http://localhost:1337/rentals/borrow', {
                userID: 1,
                itemID: data.itemID,
                quantity: quantity
            });
            
            refresh();
            displaySuccessMessage("Borrow Request Sent", "Your borrow request has been sent successfully.");
        } catch (error) {
            displayErrorMessage("Borrow Request Failed", error.response.data.message || "Failed to send borrow request");
        }
    };

    return (
        <>
        <StyledCard>
            <CardTitle title={data? data.equipment_name : "Equipment"} />
            <CardContent>
                <FormContainer spacing={3}>

                    <TextField
                        label="Quantity"
                        name="quantity"
                        type="number"
                        fullWidth
                        inputProps={{ min: 0, max: (data ? data.quantity : 0) }}
                        value={quantity}
                        onChange={handleChange}
                    />

                    <ActionBox>
                        <Button variant="contained" size="large" onClick={() => borrow()}>
                            Borrow Item
                        </Button>
                        <Button size="large" onClick={close}>
                            Cancel
                        </Button>
                    </ActionBox>
                </FormContainer>
            </CardContent>
        </StyledCard>
        </>
        
    );
};

export default Borrow;