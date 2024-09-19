import { Dialog, DialogContent } from "@mui/material";
import { useState } from "react";
import { SyncLoader } from "react-spinners"


type Props = {

    open: boolean
}
export const LoadingModal = ({open} : Props) => {



    return (
        <Dialog open={open}>
            <DialogContent  sx={{ backgroundColor: 'transparent' }}>
                <SyncLoader color="green" cssOverride={{ 'backgroundColor': 'transparent' }} />
            </DialogContent>

        </Dialog>
    )
}