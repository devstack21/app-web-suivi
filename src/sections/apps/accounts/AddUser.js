import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

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
  Typography
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

import { openSnackbar } from 'store/reducers/snackbar';

// assets
import { DeleteFilled } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';
import { REQUEST_STATUS } from 'utils/apiConfig';
import { useDispatch, useSelector } from 'react-redux';
import { createAccounts, initCreateUser } from 'store/reducers/Accounts/createSlice';
import { getListAccounts } from 'store/reducers/Accounts/listSlice';
import { PAGE_ROWS } from 'config';
import { editAccounts, initEditUser } from 'store/reducers/Accounts/editSlice';

const avatarImage = require.context('assets/images/users', true);

// constant

const getInitialValues = (customer) => {
  const newCustomer = {
    username: '',
    email: '',
    role: '',
    phone: '',
    active: true
  };

  if (customer) {
    newCustomer.username = customer.username;
    newCustomer.email = customer.email;
    
    newCustomer.phone = customer.phone;
    newCustomer.role = customer.role;
    console.log( _.merge({}, newCustomer, customer))
    return _.merge({}, newCustomer, customer);
  }

  return newCustomer;
};

// ==============================|| CUSTOMER ADD / EDIT / DELETE ||============================== //

const AddUser = ({ user, onCancel }) => {

  const dispatch = useDispatch()

  const [openAlert, setOpenAlert] = useState(false);


  const { roleTab } = useSelector((state) => state.role.list)
  const { createStatus, createError } = useSelector((state) => state.account.create)
  const { editStatus, editError } = useSelector((state) => state.account.edit)


  const handleAlertClose = () => {
    setOpenAlert(!openAlert);
    onCancel();
  };

  const isCreating = !user;

  useEffect(() => {
    if (createStatus == REQUEST_STATUS.succeed) {
      dispatch(
        openSnackbar({
          open: true,
          message: <FormattedMessage id='add-user-succeed' />,
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
      dispatch(initCreateUser())
      dispatch(getListAccounts({ page: 1, nb: PAGE_ROWS }))
    }
    if (createStatus == REQUEST_STATUS.error) {
      dispatch(
        openSnackbar({
          open: true,
          message: <FormattedMessage id={createError} />,
          variant: 'alert',
          alert: {
            color: 'error'
          },
          close: false
        })
      );
      dispatch(initCreateUser())
    }
  }, [createStatus])

  useEffect(() => {
    if (editStatus == REQUEST_STATUS.succeed) {
      dispatch(
        openSnackbar({
          open: true,
          message: <FormattedMessage id='edit-user-succeed' />,
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
      dispatch(initEditUser())
      dispatch(getListAccounts({ page: 1, nb: PAGE_ROWS }))
    }
    if (editStatus == REQUEST_STATUS.error) {
      dispatch(
        openSnackbar({
          open: true,
          message: <FormattedMessage id={editError} />,
          variant: 'alert',
          alert: {
            color: 'error'
          },
          close: false
        })
      );
      dispatch(initEditUser())
    }
  }, [editStatus])

  const UserSchema = Yup.object().shape({
    username: Yup.string().max(255).required(<FormattedMessage id='name-required' />),
    role: Yup.object().required(<FormattedMessage id='role-required' />),
    phone: Yup.number().required(<FormattedMessage id='phone-required' />),
    email: Yup.string().max(255).required(<FormattedMessage id='email-required' />).email(<FormattedMessage id='email-invalid' />),
  });

  const formik = useFormik({
    initialValues: getInitialValues(user),
    validationSchema: UserSchema,
    onSubmit: (values, { setSubmitting }) => {
      try {
        if (user) {
          dispatch(editAccounts(user))
        } else {
          const newUser = {
            username: values.username,
            email: values.email,
            phone: values.phone,
            role_pk: values.role.id
          };
          dispatch(createAccounts(newUser));
        }

        setSubmitting(false);
        onCancel();
      } catch (error) {
        console.error(error);
      }
    }
  });


  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;

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
                  <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
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
                      <Avatar alt="Avatar 1" src={avatarImage(`./avatar-${1}.png`)} sx={{ width: 72, height: 72, border: '1px dashed' }} />
                    </FormLabel>

                  </Stack>
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
                            onChange={(event) => setFieldValue('role', event.target.value)}
                            input={<OutlinedInput id="select-column-hiding" placeholder="Sort by" />}
                            renderValue={(selected) => {
                              if (!selected) {
                                return <Typography variant="subtitle1"><FormattedMessage id='select-role' /></Typography>;
                              }
                              return <Typography variant="subtitle2">{selected.libelle}</Typography>;
                            }}
                          >
                            {roleTab.map((role) => (
                              <MenuItem key={role} value={role}>
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
                      <IconButton onClick={() => setOpenAlert(true)} size="large" color="error">
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
      </FormikProvider>
      {!isCreating && <AlertAccountDelete title={user.usernmae} open={openAlert} handleClose={handleAlertClose} />}
    </>
  );
};

AddUser.propTypes = {
  customer: PropTypes.any,
  onCancel: PropTypes.func
};

export default AddUser;
