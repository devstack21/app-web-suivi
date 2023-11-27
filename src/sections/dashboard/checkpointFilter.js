

import {
    MenuItem,
    Select,
    Stack,
    Grid
} from '@mui/material';
import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import Pagination from '@mui/material/Pagination';
import { REQUEST_STATUS } from 'utils/apiConfig';
import { getListCheckpoints } from 'store/reducers/checkpoints/listSlice';



// ==============================|| DASHBOARD - ANALYTICS ||============================== //

const CheckpointFilters = ({ chkp, setChkp }) => {


    const dispatch = useDispatch()
    const [page, setPage] = useState(1);

    const { listStatus, checkpointsTab, nbPages } = useSelector((state) => state.checkpoint.list)

    useEffect(() => { dispatch(getListCheckpoints({ page: page })) }, [page])

    const handleChangePage = (event, newPage) => { setPage(newPage); };

   
    useEffect(() => {
        if (listStatus == REQUEST_STATUS.succeed) setChkp(checkpointsTab[0])
    },[listStatus])
    

    return (

        <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent={{ xs: 'center', sm: 'flex-end' }}
            sx={{ mt: 3, mr: 2 }}
        >

            <Select size="small" value={chkp} onChange={(e) => setChkp(e.target.value)}>
                {checkpointsTab?.map((item, index) => (
                    <MenuItem key={index} value={item}>
                        {item.libelle}
                    </MenuItem>
                ))}
            </Select>
            <Grid item xs={12}>
                <Pagination count={nbPages} page={page} onChange={handleChangePage} />
            </Grid>

        </Stack>

    );
};

export default CheckpointFilters;
