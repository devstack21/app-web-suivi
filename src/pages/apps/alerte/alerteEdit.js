import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField, Pagination, Grid, FormControl, Chip, InputLabel, Select, MenuItem, Container, Autocomplete, useTheme } from '@mui/material';
import MainCard from 'components/MainCard';
// import axios from 'utils/axios';
// import { BASE_URL } from 'config'; 
import { REQUEST_STATUS } from 'utils/apiConfig'; //API_URL, 
import { CloseOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux';
import { getListBetail } from 'store/reducers/betail/listBetailSlice';
import { getContactList } from 'store/reducers/alerte/listeContactSlice';
import { getListVille } from 'store/reducers/location/villeSlice';
import { FormattedMessage } from 'react-intl';
import { SpinnLoader } from 'components/cards/SpinnLoader';
import { PAGE_ROWS } from 'config';
import { editAlert } from 'store/reducers/alerte/editAlerteSlice';

const ListTypeCanal = ["SMS", "EMAIL"]

const validationSchema = yup.object({
    min_animal: yup.number().required('Min animal is required'),
    max_animal: yup.number().required('Max animal is required'),
    type_canal: yup.string().required('Type canal is required'),
    id_ville: yup.string().required('Ville is required'),
    id_animal: yup.string().required('Animal is required'),
    id_contact: yup.string().required('Contact is required')
});

const EditAlert = ({ alert, onCancel }) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const [selectedContacts, setSelectedContacts] = useState([]);
    const [listeIdContacts, setlisteIdContacts] = useState([]);
    const [page, setPage] = useState(1);

    const statutListVille = useSelector((state) => state.location.villes.status);
    const { ListVille } = useSelector((state) => state.location.villes);

    const statutListContact = useSelector((state) => state.alert.contact.status);
    const { ListContact } = useSelector((state) => state.alert.contact);
    const totalPagesContact = useSelector((state) => state.alert.contact.nbPages);

    const { betailTab } = useSelector((state) => state.betail.list);

    useEffect(() => {
        if (betailTab.length < 0) dispatch(getListBetail({ page: 1}));
        if (ListContact.length < 0) dispatch(getContactList({page: page, nbre_ligne:PAGE_ROWS}));
        // dispatch(getContactList({page: page, nbre_ligne:PAGE_ROWS}));
        if (ListVille.length < 0) dispatch(getListVille());

        formik.setFieldValue('pk', alert.pk);
        formik.setFieldValue('min_animal', alert.min_animal);
        formik.setFieldValue('max_animal', alert.max_animal);
        formik.setFieldValue('type_canal', alert.type_canal);
        formik.setFieldValue('id_ville', alert.id_ville);
        formik.setFieldValue('id_animal', alert.id_animal);
        formik.setFieldValue('id_contact', 1);
        console.log("w  alerte", alert)
        let idList = alert.contacts ? alert.contacts.map(item => item.id) : [];
        setlisteIdContacts(idList)
        setSelectedContacts(alert.contacts ? alert.contacts : [])
    }, [alert]);

    const formik = useFormik({
        initialValues: {
            pk: '',
            min_animal: '',
            max_animal: '',
            type_canal: '',
            id_ville: '',
            id_animal: '',
            id_contact: '',
            ...alert
        },
        validationSchema,
        onSubmit: (values) => {
            const dataToSend = {
                ...values,
                contacts: listeIdContacts
            };
            // const URL = BASE_URL + API_URL.Alert;
            console.log("les dats qui partent ", dataToSend);
            if(values.min_animal > values.max_animal) {
                formik.setErrors({ min_animal: <FormattedMessage id='alerte-form-maxmin'/>, max_animal: <FormattedMessage id='alerte-form-maxmin'/> }); 
                return;
            }
            
            dispatch(editAlert(dataToSend));
            onCancel('');
        }
    });

    // const handleAddContact = (id) => {
    //     const contact = ListContact.find(contact => contact.id === id);
    //     if (!selectedContacts.includes(contact)) {
    //         setSelectedContacts((prevContacts) => [...prevContacts, contact]);
    //         setlisteIdContacts((prevIds) => [...prevIds, id]);
    //     }
    // };

    const handleAddContact = (id) => {
        const contact = ListContact.find(contact => contact.id === id);
        if (!selectedContacts.some(selectedContact => selectedContact.id === id)) {
            setSelectedContacts((prevContacts) => [...prevContacts, contact]);
            setlisteIdContacts((prevIds) => [...prevIds, id]);
        }
    };

    const handleRemoveContact = (contactToRemove) => {
        setSelectedContacts((prevContacts) => prevContacts.filter((contact) => contact !== contactToRemove));
        setlisteIdContacts((prevIds) => prevIds.filter((id) => id !== contactToRemove.id));
    };

    const handleChangePage = (event, value) => {
        setPage(value);
        dispatch(getContactList({page: value, nbre_ligne:2}));
        formik.setFieldValue('id_contact', "");
    };



    if (statutListContact == REQUEST_STATUS.loading || statutListVille == REQUEST_STATUS.loading) {
        return (
            <MainCard
                title={<FormattedMessage id='edit-alert' />}
                content={false}
                >
                <SpinnLoader title={<FormattedMessage id='loading' />} />

            </MainCard>
        )
    }

    return (
        <Container maxWidth="sm">
            <MainCard
                title={<FormattedMessage id='edit-alert' />}
                content={false}
                secondary={
                    <Button color="primary" onClick={() => onCancel('')}>
                        <CloseOutlined />
                    </Button>
                }>
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

                        {/* <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Contact</InputLabel>
                                <Select name="id_contact"
                                    value={formik.values.id_contact}
                                    onChange={(event) => { formik.handleChange(event); handleAddContact(event.target.value); }}
                                    error={formik.touched.id_contact && Boolean(formik.errors.id_contact)}
                                    helperText={formik.touched.id_contact && formik.errors.id_contact} >
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
                        </Grid> */}






                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Contact</InputLabel>
                                <Select name="id_contact" 
                                value={formik.values.id_contact} 
                                onChange={(event) => { formik.handleChange(event); handleAddContact(event.target.value); }}
                                error={formik.touched.id_contact && Boolean(formik.errors.id_contact)}
                                helperText={formik.touched.id_contact && formik.errors.id_contact} >
                                    {ListContact.map((contact, index) => (
                                        <MenuItem key={index} value={contact.id}>{contact.email}-{contact.phone}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Pagination count={totalPagesContact} page={page} onChange={handleChangePage} />
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

export default EditAlert;
