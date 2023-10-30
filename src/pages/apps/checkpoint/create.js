import { useState, useEffect } from 'react';
import {
  InputLabel, Grid, Stack, TextField, Autocomplete, FormHelperText, useTheme, Typography, Divider, CardActions, Button,
} from '@mui/material';
import MainCard from 'components/MainCard';
import UserCheckpoint from 'sections/apps/checkpoint/Users';
import BetailCheckpoint from 'sections/apps/checkpoint/Betail';
import { Form, FormikProvider, useFormik } from 'formik';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { getListDistricts } from 'store/reducers/checkpoints/districtsSlice';
import { createCheckpoints, initCreateCheckpoint } from 'store/reducers/checkpoints/createSlice';
import { REQUEST_STATUS } from 'utils/apiConfig';
import EmptyUserCard from 'components/cards/skeleton/EmptyUserCard';
import CreateEffectComponent from 'sections/apps/checkpoint/CreateEffectComponent';
import { transformAnimals, transformUser } from 'sections/apps/checkpoint/CreateFunctions';
import * as yup from 'yup';
import { useNavigate } from 'react-router';


const Create = () => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const navigation = useNavigate()

  const [userTab, setUserTab] = useState([]);
  const [animalTab, setAnimalTab] = useState([]);

  const { listStatus, districtsTab } = useSelector((state) => state.checkpoint.disctricts)
  const { createStatus } = useSelector((state) => state.checkpoint.create)


  useEffect(() => {
    setUserTab([])
    setAnimalTab([]); // Clear or initialize the selectedTab array
    dispatch(getListDistricts())
    dispatch(initCreateCheckpoint())
  }, []);

  const validationSchema = yup.object({
    name: yup.string().required(<FormattedMessage id='checkpoint-name-required' />).matches(/^[a-zA-Z0-9\s]*[a-zA-Z][a-zA-Z0-9\s]*$/,<FormattedMessage id='checkpoint-name-characters' /> ),
    district: yup.object().required(<FormattedMessage id='district-required' />),
    latitude: yup.number().positive(<FormattedMessage id='latitude-positive' />).required(<FormattedMessage id='latitude-required' />),
    longitude: yup.number().positive(<FormattedMessage id='longitude-positive' />).required(<FormattedMessage id='longitude-required' />),
    responsable: yup.string().when('userTab', {
      is: (userTab) => userTab && userTab.length > 0 && userTab.some(user => user.isR === true),
      then: yup.string().required(<FormattedMessage id='responsable-required' />),
    }),
  });

  const formik = useFormik({
    initialValues: {
      name: '', // Add other form fields here
      district: null,
      latitude: '',
      longitude: '',
      responsable: '',
      animalTabs: [],
      userTab: []
    },
    onSubmit: (values,/* { resetForm }*/) => {

      if (userTab.length === 0) {
        formik.setErrors({ submit: <FormattedMessage id='agents-tab-required' /> });
        return;
      }

      if (userTab.length < 2) {
        formik.setErrors({ submit: <FormattedMessage id='agents-tab-min-required' /> })
        return;
      }

      if (animalTab.length === 0) {
        formik.setErrors({ submit: <FormattedMessage id='animals-tab-required' /> });
        return;
      }

      const isResponsableInUserTab = userTab.some(user => user.username === values.responsable);

      if (!isResponsableInUserTab) {
        // If responsible is not in userTab, handle accordingly (show an error, set form error, etc.)
        formik.setErrors({ responsable: <FormattedMessage id='responsable-not-found' /> });
        return;
      }

      const isAnimalTabValid = animalTab.every(animal => parseFloat(animal.max_animal) > 0);
      if (!isAnimalTabValid) {
        formik.setErrors({ submit: <FormattedMessage id='animals-limit' /> });
        return;
      }

      // Handle form submission logic here
      const transformedUsers = userTab.map(transformUser);
      const transformedAnimals = animalTab.map(transformAnimals);

      dispatch(createCheckpoints({
        animals: transformedAnimals,
        libelle: values.name,
        latitude: values.latitude,
        longitude: values.longitude,
        users: transformedUsers,
        id_district: formik.values.district ? formik.values.district.pk : null
      }));
      // Reset the form after submission
      //resetForm();
    },
    validationSchema: validationSchema

  });

  const handleCancel = () => {
    // Reset the form when the "Cancel" button is clicked
    formik.resetForm();
    setUserTab([])
    setAnimalTab([]); // Clear or initialize the selectedTab array
    navigation(`/apps/checkpoints/list/`);
  };

  const resetSubmitError = () => { formik.setErrors({ submit: undefined }); };

  // Watch for changes in userTab, animalTab, or other relevant fields
  useEffect(() => { resetSubmitError(); }, [userTab, animalTab, /* other relevant fields */]);

  if (createStatus == REQUEST_STATUS.loading || listStatus == REQUEST_STATUS.loading) {
    return (
      <EmptyUserCard id={<FormattedMessage id='loading' />} />
    )
  }

  if (listStatus == REQUEST_STATUS.error || districtsTab.length == 0) {
    <EmptyUserCard id={<FormattedMessage id='error-loading-district' />} />
  }

  const { handleSubmit, getFieldProps, setStatus, setSubmitting, errors, touched, setErrors, resetForm } = formik;

  return (
    <MainCard content={false} sx={{ overflow: 'visible' }}>
      <CardActions
        sx={{
          position: 'sticky',
          top: '60px',
          bgcolor: theme.palette.background.default,
          zIndex: 1,
          borderBottom: `1px solid ${theme.palette.divider}`
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: 1 }}>
          <Typography variant="h5" sx={{ m: 0, pl: 1.5 }}>
            <FormattedMessage id='new-checkpoint' />
          </Typography>
          <Stack direction="row" spacing={1} sx={{ px: 1.5, py: 0.75 }}>
            <Button color="error" size="small" onClick={handleCancel} >
              <FormattedMessage id='cancel' />
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={formik.handleSubmit}
            >
              <FormattedMessage id='submit' />
            </Button>
          </Stack>
        </Stack>
      </CardActions>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>

          <Typography variant="h5" component="div" sx={{ p: 3 }}>
            <FormattedMessage id='general-info' />
          </Typography>
          <Grid container spacing={3} sx={{ p: 5 }} >
            {/* First Line */}

            <Grid item xs={12} md={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Grid item xs={5}>
                      <InputLabel htmlFor="name"><FormattedMessage id='name' /></InputLabel>
                    </Grid>
                    <Grid item xs={15}>
                      <TextField
                        fullWidth
                        id="name"
                        placeholder="Enter Checkpoint Name"
                        {...getFieldProps('name')}
                        error={Boolean(touched.name && errors.name)}
                        helperText={touched.name && errors.name}
                      />
                    </Grid>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Grid item xs={4}>
                      <InputLabel htmlFor="district"><FormattedMessage id='district' /></InputLabel>
                    </Grid>
                    <Grid item xs={12} >
                      <Autocomplete
                        id="district"
                        value={formik.values.district}
                        onChange={(event, newValue) => {
                          formik.setFieldValue('district', newValue); // Set the entire district object as the value
                        }}
                        getOptionLabel={(option) => option.name} // Display the district name
                        options={districtsTab}
                        isOptionEqualToValue={(option, value) => option.pk === value.pk} // Use the 'pk' property for comparison
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Select District"
                            sx={{ '& .MuiAutocomplete-input.Mui-disabled': { WebkitTextFillColor: theme.palette.text.primary } }}
                          />
                        )}
                      />

                      {formik.touched.district && formik.errors.district && (
                        <FormHelperText error id="helper-text-district">
                          {formik.errors.district}
                        </FormHelperText>
                      )}
                    </Grid>
                  </Stack>
                </Grid>

              </Grid>
            </Grid>

            {/* Second Line */}

            <Grid item xs={12} md={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Grid item xs={5}>
                      <InputLabel htmlFor="latitude"><FormattedMessage id='latitude' /></InputLabel>
                    </Grid>
                    <Grid item xs={15}>
                      <TextField
                        fullWidth
                        id="latitude"
                        type="number"
                        placeholder="Enter Latitude"
                        {...getFieldProps('latitude')}
                        error={Boolean(touched.latitude && errors.latitude)}
                        helperText={touched.latitude && errors.latitude}
                      />
                    </Grid>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Grid item xs={5}>
                      <InputLabel htmlFor="longitude"><FormattedMessage id='longitute' /></InputLabel>
                    </Grid>
                    <Grid item xs={15}>
                      <TextField
                        fullWidth
                        id="longitude"
                        type="number"
                        placeholder="Enter Longitude"
                        {...getFieldProps('longitude')}
                        error={Boolean(touched.longitude && errors.longitude)}
                        helperText={touched.longitude && errors.longitude}
                      />
                    </Grid>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Divider />

          <Typography variant="h5" component="div" sx={{ p: 3 }}>
            <FormattedMessage id='configuration' />
          </Typography>


          <Grid container spacing={3} sx={{ p: 5 }} >

            {errors.submit && (
              <Grid item xs={12}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Grid>
            )}

            {
              userTab.length > 0 &&

              <Grid item xs={12} md={6}>

                <Stack direction="row" spacing={2} alignItems="center">
                  <Grid item xs={4}>
                    <InputLabel htmlFor="responsable"><FormattedMessage id='responsable' /></InputLabel>
                  </Grid>

                  <Grid item xs={12} >
                    <Autocomplete
                      id="responsable"
                      value={formik.values.responsable}
                      onChange={(event, newValue) => {
                        formik.setFieldValue('responsable', newValue);
                        const updatedUserTab = userTab.map(user => ({
                          ...user,
                          isR: user.username === newValue,
                        }));
                        setUserTab(updatedUserTab);

                      }}
                      options={userTab.map((item) => item.username)}
                      getOptionLabel={(option) => option}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Select Responsable"
                          sx={{ '& .MuiAutocomplete-input.Mui-disabled': { WebkitTextFillColor: theme.palette.text.primary } }}
                        />
                      )}
                    />
                    {formik.touched.responsable && formik.errors.responsable && (
                      <FormHelperText error id="helper-text-responsable">
                        {formik.errors.responsable}
                      </FormHelperText>
                    )}
                  </Grid>
                </Stack>
              </Grid>

            }
            {/* Third Line with Tables */}
            <Grid item xs={12} md={12}>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>

                  <UserCheckpoint selectedTab={userTab} setSelectedTab={setUserTab} />
                </Grid>
                <Grid item xs={12} md={6}>

                  <BetailCheckpoint selectedTab={animalTab} setSelectedTab={setAnimalTab} setFormikAnimalTabs={formik.setFieldValue} formik={formik} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <CreateEffectComponent resetForm={resetForm} setErrors={setErrors} setStatus={setStatus} setSubmitting={setSubmitting} />
        </Form>
      </FormikProvider>
    </MainCard >
  );
};

export default Create;
