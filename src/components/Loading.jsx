import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Loading() {
    const { loading } = useSelector((store) => store.product);

    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={loading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default Loading