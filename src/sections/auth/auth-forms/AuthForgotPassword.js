import { useNavigate } from 'react-router-dom';

// material-ui
import { Button, FormHelperText, Grid, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { FormattedMessage } from 'react-intl';


// project import
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'components/@extended/AnimateButton';

import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { useEffect } from 'react';
import { REQUEST_STATUS } from 'utils/apiConfig';


// ============================|| FORGOT PASSWORD ||============================ //

const EffectComponent = ({ setStatus, setSubmitting, setErrors }) => {
  const { resetError, resetStatus, initResetPassword } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    if (resetStatus == REQUEST_STATUS.succeed) {
      setStatus({ success: true });
      setSubmitting(false);
      dispatch(
        openSnackbar({
          open: true,
          message: <FormattedMessage id="check-mail-reset-link" />,
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
      initResetPassword()
      setTimeout(() => {
        navigate(resetStatus == REQUEST_STATUS.succeed ? '/auth/check-mail' : '/check-mail', { replace: true });
      }, 500);

    } else if (resetStatus == REQUEST_STATUS.error) {
      setStatus({ success: false });
      setErrors({ submit: <FormattedMessage id={resetError} /> });
      setSubmitting(false);
    }

  }, [resetStatus]); // Empty dependency array means this effect runs once on mount

  return null; // No need to render anything for this example
};

const AuthForgotPassword = () => {
  const scriptedRef = useScriptRef();

  const { resetPassword } = useAuth();

  return (
    <>
      <Formik
        initialValues={{
          phone: '',
          submit: null,
          resetSucced: "idle"
        }}
        validationSchema={Yup.object().shape({
          phone: Yup.string().matches(/^[0-9]{9}$/, <FormattedMessage id='invalid-phone' />)
          .max(9).required(<FormattedMessage id="phone-required" />),
             })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await resetPassword(values.phone)
          } catch (err) {
            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setErrors, setStatus, setSubmitting }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
              <Stack spacing={1}>
                  <InputLabel htmlFor="phone-login"><FormattedMessage id="phone" /></InputLabel>
                  <OutlinedInput
                    id="phone-login"
                    type="numeric"
                    value={values.phone}
                    name="phone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder= {<FormattedMessage id="enter-phone" />}
                    fullWidth
                    error={Boolean(touched.phone && errors.phone)}
                  />
                  {touched.phone && errors.phone && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.phone}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12} sx={{ mb: -2 }}>
                <Typography variant="caption"><FormattedMessage id="check-spam" /></Typography>
              </Grid>
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    <FormattedMessage id="password-reset" />
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
            <EffectComponent setSubmitting={setSubmitting} setErrors={setErrors} setStatus={setStatus} />
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthForgotPassword;
