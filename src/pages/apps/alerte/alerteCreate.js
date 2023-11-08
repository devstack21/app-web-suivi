import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField, Grid, Chip, FormControl, InputLabel, Select, MenuItem, Container, Autocomplete, useTheme } from '@mui/material';

import MainCard from 'components/MainCard';
import { useSelector, useDispatch } from 'react-redux';
import {  REQUEST_STATUS } from 'utils/apiConfig';
import { getListBetail } from 'store/reducers/betail/listBetailSlice';
import EmptyUserCard from 'components/cards/skeleton/EmptyUserCard';
import { getContactList } from 'store/reducers/alerte/listeContactSlice';
import { getListVille } from 'store/reducers/location/villeSlice';
import { FormattedMessage } from 'react-intl';
import { createAlert } from 'store/reducers/alerte/createAlerteSlice';
import EffectComponent from 'sections/apps/alert/EffectComponent';


const ListTypeCanal = ["SMS", "EMAIL"]

const validationSchema = yup.object({
  min_animal: yup.number().required('Min animal is required'),
  max_animal: yup.number().required('Max animal is required'),
  type_canal: yup.string().required('Type canal is required'),
  id_ville: yup.string().required('Ville is required'),
  id_animal: yup.string().required('Animal is required'),
  id_contact: yup.string().required('Contact is required')
});

const AlertForm = () => {
    const dispatch = useDispatch();
    const theme = useTheme()

    const statutListVille = useSelector((state) => state.location.villes.status);
    const {ListVille } = useSelector((state) => state.location.villes);

    const statutListContact = useSelector((state) => state.alert.contact.status);
    const { ListContact } = useSelector((state) => state.alert.contact);

    const { listStatus, betailTab } = useSelector((state) => state.betail.list);

    const [selectedContacts, setSelectedContacts] = useState([]);
    const [listeIdContacts, setlisteIdContacts] = useState([]);


    useEffect(() => {
        dispatch(getListBetail({ page: 1 }));
        dispatch(getContactList());
        dispatch(getListVille());
    }, []);


  const formik = useFormik({
    
    initialValues: {
      min_animal: '',
      max_animal: '',
      type_canal: '',
      id_ville: '',
      id_animal: '',
      id_contact: ''
    },
    validationSchema,
    onSubmit: (values) => {
        const dataToSend = {
            ...values,
            contacts: listeIdContacts
          };
        dispatch(createAlert(dataToSend)) 
    }
  });



    const handleAddContact = (id) => {
        const contact = ListContact.find(contact => contact.id === id);
        if (!selectedContacts.includes(contact)) {
            setSelectedContacts((prevContacts) => [...prevContacts, contact]);
            setlisteIdContacts((prevIds) => [...prevIds, id]);
        }
    };

    const handleRemoveContact = (contactToRemove) => {
        setSelectedContacts((prevContacts) => prevContacts.filter((contact) => contact !== contactToRemove));
        setlisteIdContacts((prevIds) => prevIds.filter((id) => id !== contactToRemove.id));
    };


    if (statutListContact == REQUEST_STATUS.loading ||  listStatus == REQUEST_STATUS.loading ||
        statutListVille == REQUEST_STATUS.loading) {
        return(
            <EmptyUserCard title={<FormattedMessage id='loading' />} />
        )
    }

  return (
    <Container maxWidth="sm">
    <MainCard title="Autocomplete">
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                <TextField name="min_animal" 
                    label="Min Animal" 
                    type="number" 
                    value={formik.values.min_animal} 
                    onChange={formik.handleChange} 
                    fullWidth
                    error={formik.touched.min_animal && Boolean(formik.errors.min_animal)}
                    helperText={formik.touched.min_animal && formik.errors.min_animal}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField 
                    name="max_animal" 
                    label="Max Animal" 
                    type="number" 
                    value={formik.values.max_animal} 
                    onChange={formik.handleChange} 
                    fullWidth 
                    error={formik.touched.max_animal && Boolean(formik.errors.max_animal)}
                    helperText={formik.touched.max_animal && formik.errors.max_animal}
                    />
                </Grid>
                <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel>Type de canal</InputLabel>
                    <Select name="type_canal" 
                    value={formik.values.type_canal} 
                    onChange={formik.handleChange}
                    error={formik.touched.type_canal && Boolean(formik.errors.type_canal)}
                    helperText={formik.touched.type_canal && formik.errors.type_canal}>
                    {ListTypeCanal.map((type, index) => (
                        <MenuItem key={index} value={type}>{type}</MenuItem>
                    ))}
                    </Select>
                </FormControl>
                </Grid>

                <Grid item xs={12} >
                    <Autocomplete
                        id="id_ville"
                        value={ListVille.find(ville => ville.pk === formik.values.id_ville) || null}
                        onChange={(event, newValue) => {
                            formik.setFieldValue('id_ville', newValue ? newValue.pk : '');
                        }}
                        onBlur={() => formik.setFieldTouched('id_ville')}
                        getOptionLabel={(option) => option ? option.name : ""}
                        options={ListVille}
                        isOptionEqualToValue={(option, value) => option.pk === value}
                        renderInput={(params) => (
                            <TextField 
                                {...params} 
                                placeholder="Select ville" 
                                sx={{ '& .MuiAutocomplete-input.Mui-disabled': { WebkitTextFillColor: theme.palette.text.primary } }} 
                                error={formik.touched.id_ville && Boolean(formik.errors.id_ville)}
                                helperText={formik.touched.id_ville && formik.errors.id_ville}
                            />
                        )}
                    />

                </Grid>

                <Grid item xs={12} >
                    <Autocomplete
                        id="id_animal"
                        value={betailTab.find(animal => animal.id === formik.values.id_animal) || null}
                        onChange={(event, newValue) => {
                            formik.setFieldValue('id_animal', newValue ? newValue.id : '');
                        }}
                        onBlur={() => formik.setFieldTouched('id_animal')}
                        getOptionLabel={(option) => option ? option.name : ""}
                        options={betailTab}
                        isOptionEqualToValue={(option, value) => option.id === value}
                        renderInput={(params) => (
                            <TextField 
                                {...params} 
                                placeholder="Select animal" 
                                sx={{ '& .MuiAutocomplete-input.Mui-disabled': { WebkitTextFillColor: theme.palette.text.primary } }} 
                                error={formik.touched.id_animal && Boolean(formik.errors.id_animal)}
                                helperText={formik.touched.id_animal && formik.errors.id_animal}
                            />
                        )}
                    />

                </Grid>

                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel>Contact</InputLabel>
                        <Select name="id_contact" 
                        value={formik.values.id_contact} 
                        onChange={(event) => { formik.handleChange(event); handleAddContact(event.target.value); }}
                        error={formik.touched.id_ville && Boolean(formik.errors.id_ville)}
                        helperText={formik.touched.id_ville && formik.errors.id_ville} >
                            {ListContact.map((contact, index) => (
                                <MenuItem key={index} value={contact.id}>{contact.email}-{contact.phone}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    {selectedContacts.map((contact, index) => (
                        <Chip key={index} label={`${contact.email}-${contact.phone}`} onDelete={() => handleRemoveContact(contact)} />
                    ))}
                </Grid>
                    
                <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">Submit</Button>
                </Grid>
                <EffectComponent   />

            </Grid>
        </form>

    </MainCard>
    </Container>
    
  );
};

export default AlertForm;
