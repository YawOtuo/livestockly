import { Dialog, DialogContent } from "@mui/material";
import { useState } from "react";
import { SyncLoader } from "react-spinners"


export const LoadingModal = (props) => {



    return (
        <Dialog open={props.open}>
            <DialogContent  sx={{ backgroundColor: 'transparent' }}>
                <SyncLoader color="green" cssOverride={{ 'backgroundColor': 'transparent' }} />
            </DialogContent>

        </Dialog>
    )
}