import { useState } from 'react';
import { CardContent } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

import { CardTitle, MinorText, StyledCard, MyButton } from '../../popups/Styles';

import styles from "./styles";

const AuditLog = () => {
    return (
        <StyledCard sx={styles.card}>
            <CardContent sx={styles.content}>
                <Table stickyHeader sx={{backgroundColor: "white"}}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={styles.table}>Equipment Name</TableCell>
                            <TableCell sx={styles.table}>Due Date</TableCell>
                            <TableCell sx={styles.table}>Status</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {/* {logs.map((log, index) => (
                            <TableRow key={index}>
                                <TableCell><MinorText>{log.logID}</MinorText></TableCell>
                                <TableCell>
                                    {log.date}<br/>
                                    <MinorText small>{log.time}</MinorText>
                                </TableCell>
                                <TableCell>{log.userID}</TableCell>
                            </TableRow>
                            ))} */}
                            <TableRow>
                                <TableCell sx={styles.table}>Basketball</TableCell>
                                <TableCell sx={styles.table}>04/02/2026</TableCell>
                                <TableCell sx={styles.table}>Accepted</TableCell>
                            </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </StyledCard>
    );
};

export default AuditLog;