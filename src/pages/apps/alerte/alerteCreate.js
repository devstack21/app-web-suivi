import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField, Grid, Chip, FormControl, InputLabel, Select, MenuItem, Container, Autocomplete, useTheme } from '@mui/material';

import axios from 'utils/axios';
import MainCard from 'components/MainCard';
import { useSelector, useDispatch } from 'react-redux';
import { listeContact_req } from 'store/reducers/alerte/listeContactReducer';
import { BASE_URL } from 'config';
import { API_URL } from 'utils/apiConfig';
import { getListBetail } from 'store/reducers/Betail/listSlice';
import { listeVille_req } from 'store/reducers/dashboard/listVilleReducer';

// const villes = [{'id':1, 'name': 'Ville 1'}, {'id':2, 'name': 'Ville 2'}];
// const contacts = [{'id':1, 'phone': '697152526', 'email': 'pgpg@gmail.com'}, {'id':2, 'phone': '698425265', 'email': 'dadadagoo@gmail.com'}];
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

    const { loading:loadV, ListVille, error:errV } = useSelector((state) => state.listeVille);
    const { loading:loadC, ListContact, error:errC } = useSelector((state) => state.listeContact);
    const { listStatus, betailTab, nbPages } = useSelector((state) => state.betail.list);

    const [selectedContacts, setSelectedContacts] = useState([]);
    const [listeIdContacts, setlisteIdContacts] = useState([]);


    useEffect(() => {
        dispatch(getListBetail({ page: 1 }));
        dispatch(listeContact_req());
        dispatch(listeVille_req());
  
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
          const URL = BASE_URL + API_URL.creerAlerte;
          
        axios.post(URL, dataToSend)
            .then(response => {
            console.log('success', response.data[0].success);
            console.log('object', response.data[0].results[0]);
            })
            .catch(error => {
            console.error(error);
        });
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

    console.log("ListVille", ListVille, loadV, errV);
    console.log("ListContact", ListContact, loadC, errC);
    console.log("betailTab", betailTab, listStatus, nbPages);
    console.log(formik.errors);

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
                        value={ListVille.find(ville => ville.id === formik.values.id_ville) || null}
                        onChange={(event, newValue) => {
                            formik.setFieldValue('id_ville', newValue ? newValue.id : '');
                        }}
                        onBlur={() => formik.setFieldTouched('id_ville')}
                        getOptionLabel={(option) => option ? option.name : ""}
                        options={ListVille}
                        isOptionEqualToValue={(option, value) => option.id === value}
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
            </Grid>
        </form>

    </MainCard>
    </Container>
    
  );
};

export default AlertForm;
