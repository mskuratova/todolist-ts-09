import React, {useState} from "react";
import MuiAlert, {AlertProps} from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import {useAppSelector} from "../../app/store";
import {useDispatch} from "react-redux";
import {setAppErrorAC} from "../../app/app-reducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props}/>
});

export function ErrorSnackbar() {
    const error = useAppSelector<string | null>(state => state.app.error)
    const dispatch =useDispatch()

    const handleClose = (event?: React.SyntheticEvent, reason?: string)=> {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppErrorAC(null))
    };

    return (
        <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    )
}