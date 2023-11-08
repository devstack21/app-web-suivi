import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
  Switch
} from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third-party
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

// project imports
import AlertAccountDelete from './AlertAccountDelete';
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';

// assets
import { DeleteFilled } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { createAccounts } from 'store/reducers/accounts/createSlice';
import { editAccounts } from 'store/reducers/accounts/editSlice';
import EffectComponent from './EffectComponent';
import Dot from 'components/@extended/Dot';

const avatarImage = require.context('assets/images/users', true);


// ==============================|| CUSTOMER ADD / EDIT / DELETE ||============================== //

const AddUser = ({ user, onCancel, page }) => {

  const dispatch = useDispatch()

  const [openAlert, setOpenAlert] = useState(false);


  const { roleTab } = useSelector((state) => state.role.list)


  const handleAlertClose = () => {
    setOpenAlert(!openAlert);
    onCancel();
  };


  const isCreating = !user;

  const UserSchema = Yup.object().shape({
    username: Yup.string().max(255).required(<FormattedMessage id='name-required' />),
    role: Yup.object().required(<FormattedMessage id='role-required' />),
    phone: Yup.number().required(<FormattedMessage id='phone-required' />),
    active: Yup.boolean(),
    email: Yup.string().max(255).required(<FormattedMessage id='email-required' />).email(<FormattedMessage id='email-invalid' />),
  });


  const formik = useFormik({
    validationSchema: UserSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      try {

        if (user) {

          const newUser = {
            username: values.username,
            email: values.email,
            phone: values.phone,
            role_pk: values.role.id,
            pk: user.id,
            is_block: values.active
          };
          dispatch(editAccounts(newUser))
        } else {
          const newUser = {
            username: values.username,
            email: values.email,
            phone: values.phone,
            role_pk: values.role.id,
            is_block: values.active
          };
          dispatch(createAccounts(newUser));
        }
        resetForm()
        setSubmitting(false);
        onCancel();
      } catch (error) {
        console.error(error);
      }
    }
  });



  const handleToggle = (field, formik) => () => {
    formik.setFieldValue(field, !formik.values[field]);
  };


  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue, setValues } = formik;

  return (
    <>
      <FormikProvider value={formik}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Form autoComplete="off" onSubmit={handleSubmit}>
            <DialogTitle>{user ? <FormattedMessage id='edit-user' /> : <FormattedMessage id='new-user' />}</DialogTitle>
            <Divider />
            <DialogContent sx={{ p: 2.5 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                  <Stack direction={'row'} justifyContent="center" sx={{ mt: 3 }}>
                    <FormLabel
                      htmlFor="change-avtar"
                      sx={{
                        position: 'relative',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        '&:hover .MuiBox-root': { opacity: 1 },
                        cursor: 'pointer'
                      }}
                    >
                      <Avatar alt="Avatar 1" src={avatarImage(`./avatar-${2}.png`)} sx={{ width: 72, height: 72, border: '1px dashed' }} />

                    </FormLabel>

                  </Stack>
                  <Grid container alignItems="center" justifyContent="center">
                    <Grid item sx={{ display: 'flex', marginRight: 1 }}>
                      <Dot color="success" size={10} />
                    </Grid>
                    <Typography variant="subtitle1">{user?.role}</Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="username"><FormattedMessage id='name' /></InputLabel>
                        <TextField
                          fullWidth
                          id="username"
                          {...getFieldProps('username')}
                          error={Boolean(touched.username && errors.username)}
                          helperText={touched.username && errors.username}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="email"><FormattedMessage id='email' /></InputLabel>
                        <TextField
                          fullWidth
                          id="email"
                          placeholder="Enter Customer Email"
                          {...getFieldProps('email')}
                          error={Boolean(touched.email && errors.email)}
                          helperText={touched.email && errors.email}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="phone"><FormattedMessage id='phone' /></InputLabel>
                        <TextField
                          fullWidth
                          id="phone"
                          type='number'
                          placeholder="Enter Customer Number"
                          {...getFieldProps('phone')}

                          error={Boolean(touched.phone && errors.phone)}
                          helperText={touched.phone && errors.phone}
                        />
                      </Stack>
                    </Grid>


                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="role"><FormattedMessage id='role' /></InputLabel>
                        <FormControl fullWidth>
                          <Select
                            id="column-hiding"
                            displayEmpty
                            {...getFieldProps('role')}
                            onChange={(event) => {
                              console.log('Selected role:', event.target.value);
                              setFieldValue('role', event.target.value);
                            }} input={<OutlinedInput id="select-column-hiding" placeholder="Sort by" />}
                            renderValue={(selected) => {
                              if (!selected) {
                                return <Typography variant="subtitle1"><FormattedMessage id='select-role' /></Typography>;
                              }
                              return <Typography variant="subtitle2">{selected.libelle}</Typography>;
                            }}
                          >
                            {roleTab.map((role) => (
                              <MenuItem key={role.id} value={role}>
                                <ListItemText primary={role.libelle} />
                              </MenuItem>
                            ))}
                          </Select>

                        </FormControl>
                        {touched.role && errors.role && (
                          <FormHelperText error id="standard-weight-helper-text-email-login" sx={{ pl: 1.75 }}>
                            {errors.role}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    {
                      user &&
                      <Grid item xs={12}>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="active"><FormattedMessage id='status' /></InputLabel>
                          <Grid container justifyContent="space-between" alignItems={"center"} >

                            <Typography variant="subtitle2"><FormattedMessage id='active-account' /></Typography>
                            <Switch
                              edge="end"
                              onChange={handleToggle('active', formik)}
                              checked={!formik.values?.active}
                              inputProps={{
                                'aria-labelledby': 'switch-list-label-sctp'
                              }}
                            />
                          </Grid>

                        </Stack>
                      </Grid>
                    }

                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>
            <Divider />
            <DialogActions sx={{ p: 2.5 }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  {!isCreating && (
                    <Tooltip title="Delete Customer" placement="top">
                      <IconButton onClick={() => setOpenAlert(true)} size="large" color="error" disabled={true} >
                        <DeleteFilled />
                      </IconButton>
                    </Tooltip>
                  )}
                </Grid>
                <Grid item>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Button color="error" onClick={onCancel}>
                      <FormattedMessage id='cancel' />
                    </Button>
                    <Button type="submit" variant="contained" disabled={isSubmitting}>
                      {user ? <FormattedMessage id='edit' /> : <FormattedMessage id='create' />}
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </DialogActions>
          </Form>
        </LocalizationProvider>
        <EffectComponent setValues={setValues} user={user} page={page} isCreating={isCreating} />
      </FormikProvider>
      {!isCreating && <AlertAccountDelete title={user.username} open={openAlert} handleClose={handleAlertClose} />}
    </>
  );
};

AddUser.propTypes = {
  customer: PropTypes.any,
  onCancel: PropTypes.func
};

export default AddUser;
