import { useState } from "react";
import { Dialog } from "@mui/material";

export const ModalScreen = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return <Dialog open={open} onClose={handleClose}></Dialog>;
};
