
import { useState, useEffect, use } from 'react';
import {
    TextField, Button,
    Dialog, DialogTitle,
    DialogContent, DialogActions,

    InputAdornment, IconButton, Table, TableHead,
    TableBody, TableCell, TableRow 
} from '@mui/material';

import AddEquipment from './AddEquipment';
import RentalSearchPopup from './RentalSearchPopup';
import RentalSearchTable from './RentalSearchTable';
import Borrow from './Borrow';
import ModifyBorrowStatus from './ModifyBorrowStatus';

export function Popup2({ open, setOpen }) {
    const handleClose = () => {
        setOpen(false);
    };

    return (
    <Dialog open={open} onClose={handleClose}>

        {/* <AddEquipment close={handleClose}/> */}
    </Dialog>
    );
}

export default function Popup({
    open, setOpen, data,

    addEquipment,

    rentalSearch,
    
    borrow, refresh,

    modifyBorrowStatus
    }) {
    const [secondaryOpen, setSecondaryOpen] = useState(false);
    const [secondaryMessage, setSecondaryMessage] = useState('');
    const [secondaryTitle, setSecondaryTitle] = useState('');
    const [dialogError, setDialogError] = useState(false);
    
    const [rentals, setRentals] = useState([]);

    const handleClose = () => {
        setOpen(false);
    };

    function displayMessage(title, message, isError = true) {
        setSecondaryMessage(message);
        setSecondaryTitle(title);
        if (isError) { setDialogError(true); }
        else { setDialogError(false); }

        setSecondaryOpen(true);
    }

    function displaySuccessMessage(title, message) {
        displayMessage(title, message, false);
    }

    function displayErrorMessage(title, message) {
        displayMessage(title, message, true);
    }

    function setContent() {
        if (addEquipment) {
            return (
                <AddEquipment
                    close={handleClose}
                    displaySuccessMessage={displaySuccessMessage}
                    displayErrorMessage={displayErrorMessage}/>
            );
        }
        if (rentalSearch) {
            return (
                <RentalSearchPopup
                    close={handleClose}
                    setData={setRentals} />
            );
        }
        if (borrow) {
            return (
                <Borrow
                    data={data}
                    refresh={refresh}
                    close={handleClose}
                    displaySuccessMessage={displaySuccessMessage}
                    displayErrorMessage={displayErrorMessage}/>
            );
        }
        if (modifyBorrowStatus) {
            return (
                <ModifyBorrowStatus
                    data={data}
                    refresh={refresh}
                    close={handleClose}
                    displaySuccessMessage={displaySuccessMessage}
                    displayErrorMessage={displayErrorMessage} />
            );
        }

    }

    return (
    <>
    <Dialog open={open} onClose={() => setOpen(false)}>
        {setContent()}
        {/* <AddEquipment
            close={handleClose}
            displaySuccessMessage={displaySuccessMessage}
            displayErrorMessage={displayErrorMessage}
            displayMessage={displayMessage}/>
        <RentalSearchPopup
            close={handleClose}
            data={rentals}
            setData={setRentals} /> */}

    </Dialog>
      <Dialog
          open={secondaryOpen}
          onClose={() => setSecondaryOpen(false)}
          >
          <DialogTitle align="center">{secondaryTitle}</DialogTitle>
          <DialogContent align="center">
            <p>{secondaryMessage}</p>
              <Button
                onClick={() => {
                    setSecondaryOpen(false);
                    if (!dialogError) {
                      handleClose();
                    }
                  }
                }>
                {dialogError ? "Back" : "Okay"}
              </Button>
          </DialogContent>
      </Dialog>


          <RentalSearchTable data={rentals} />
      </>
    );
}