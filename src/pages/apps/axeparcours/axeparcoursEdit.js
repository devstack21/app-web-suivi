import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField, Grid, Chip, FormControl, InputLabel, Select, MenuItem, Container } from '@mui/material';
//Autocomplete, useTheme
import MainCard from 'components/MainCard';
import { useSelector, useDispatch } from 'react-redux';
import {  REQUEST_STATUS } from 'utils/apiConfig';
import EmptyUserCard from 'components/cards/skeleton/EmptyUserCard';
import { FormattedMessage } from 'react-intl';
import Pagination from '@mui/material/Pagination';
import { getListAxeparcours } from 'store/reducers/axeparcours/listeAxeparcoursSlice';
// import { createAxeparcours } from 'store/reducers/axeparcours/createAxeparcoursSlice';
import { getListCheckpoints } from 'store/reducers/checkpoints/listSlice';
import EffectComponentAxe from 'sections/apps/axeparcours/EffectComponentAxe';
import { useLocation } from "react-router";
import { editAxeparcours } from 'store/reducers/axeparcours/editAxeparcoursSlice';


// const ListTypeCanal = ["SMS", "EMAIL"]

const validationSchema = yup.object({
    libelle: yup.string().required(<FormattedMessage id='axeparcours-formLibelle-required' />),
    description: yup.string().required(<FormattedMessage id='axeparcours-formDescription-required' />).matches(/^[a-zA-Z0-9\s]*[a-zA-Z][a-zA-Z0-9\s]*$/,<FormattedMessage id='checkpoint-name-characters' /> ),
    id_checkpoint: yup.string().required(<FormattedMessage id='axeparcours-formid_checkpoint-required' />)
});

const AxeparcoursEdit = () => {
    const dispatch = useDispatch();

    const { state } = useLocation();

    const { listStatus, checkpointsTab, nbPages, listError } = useSelector((state) => state.checkpoint.list);
    const { editStatus, editError } = useSelector((state) => state.axeparcours.edit)
    const [selectedCheckpoints, setSelectedCheckpoints] = useState([]);
    const [listeIdCheckpoints, setlisteIdCheckpoints] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(getListCheckpoints({ page: page }));
        formik.setFieldValue('id', state.id);
        formik.setFieldValue('libelle', state.libelle);
        formik.setFieldValue('description', state.description);
        formik.setFieldValue('id_checkpoint', state.checkpoints[0]);

        // let idList = checkpointsTab ? checkpointsTab.map(item => item.id) : [];
        setlisteIdCheckpoints(state.checkpoints)
        let filteredCheckpoints = checkpointsTab.filter(checkpoint => state.checkpoints.includes(checkpoint.id));
        setSelectedCheckpoints(filteredCheckpoints ? filteredCheckpoints : [])

    }, []);

    
    const formik = useFormik({
        initialValues: {
            id: "",
            libelle: '',
            description: '',
            id_checkpoint: ''
        },
        validationSchema,
        onSubmit: (values) => {
            const dataToSend = {
                ...values,
                checkpoints: listeIdCheckpoints
            };
            // console.log("dhdhdhd ", dataToSend);
            dispatch(editAxeparcours(dataToSend)) 
        }
    });


    const handleAddCheckpoint = (id) => {
        const checkpoint = checkpointsTab.find(checkpoint => checkpoint.id === id);
        if (!selectedCheckpoints.some(selectedCheckpoint => selectedCheckpoint.id === id)) {
            setSelectedCheckpoints((prevCheckpoints) => [...prevCheckpoints, checkpoint]);
            setlisteIdCheckpoints((prevIds) => [...prevIds, id]);
        }
    };

    const handleRemoveCheckpoint = (checkpointToRemove) => {
        setSelectedCheckpoints((prevCheckpoints) => prevCheckpoints.filter((checkpoint) => checkpoint !== checkpointToRemove));
        setlisteIdCheckpoints((prevIds) => prevIds.filter((id) => id !== checkpointToRemove.id));
    };


    const handleChangePage = (event, value) => {
        setPage(value);
        dispatch(getListAxeparcours({page: value, nbre_ligne:2}));
        formik.setFieldValue('id_checkpoint', "");
    };

    if (listStatus == REQUEST_STATUS.loading || editStatus== REQUEST_STATUS.loading) { // ||  listStatus == REQUEST_STATUS.loading
        return(
            <EmptyUserCard title={<FormattedMessage id='loading'/>} />
        )
    }

    if (listError == REQUEST_STATUS.error) {
        return (
          <EmptyUserCard title={<FormattedMessage id={listError} />} />
        )
      }
      
    if (editError == REQUEST_STATUS.error) {
    return (
        <EmptyUserCard title={<FormattedMessage id={editError} />} />
        )
    }


  return (
    <Container maxWidth="sm">
    <MainCard title="Autocomplete">
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                <TextField name="libelle" 
                    label={<FormattedMessage id='axeparcours-formLibelle' />} 
                    type="text" 
                    value={formik.values.libelle} 
                    onChange={formik.handleChange} 
                    fullWidth
                    error={formik.touched.libelle && Boolean(formik.errors.libelle)}
                    helperText={formik.touched.libelle && formik.errors.libelle}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField 
                    name="description" 
                    label={<FormattedMessage id='axeparcours-formDescription' />} 
                    type="text" 
                    value={formik.values.description} 
                    onChange={formik.handleChange} 
                    fullWidth 
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                    />
                </Grid>
                

                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel><FormattedMessage id='axeparcours-formCheckpoint' /></InputLabel>
                        <Select name="id_checkpoint" 
                        value={formik.values.id_checkpoint} 
                        onChange={(event) => { formik.handleChange(event); handleAddCheckpoint(event.target.value); }}
                        error={formik.touched.id_checkpoint && Boolean(formik.errors.id_checkpoint)}
                        helperText={formik.touched.id_checkpoint && formik.errors.id_checkpoint} >
                            {checkpointsTab.map((ckpt, index) => (
                                <MenuItem key={index} value={ckpt.id}>{ckpt.libelle}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Pagination count={nbPages} page={page} onChange={handleChangePage} />
                </Grid>
                <Grid item xs={12}>
                    {selectedCheckpoints.map((ckpt, index) => (
                        <Chip key={index} label={ckpt.libelle} onDelete={() => handleRemoveCheckpoint(ckpt)} />
                    ))}
                </Grid>
                
                    
                <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary"><FormattedMessage id='detailrapport-valider' /></Button>
                </Grid>
                <EffectComponentAxe  />

            </Grid>
        </form>

    </MainCard>
    </Container>
    
  );
};

export default AxeparcoursEdit;
