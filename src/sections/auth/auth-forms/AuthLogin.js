import PropTypes from 'prop-types';
import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// material-ui
import {
  Button,
  FormHelperText,
  Grid,
  Link,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { FormattedMessage } from 'react-intl';

// project import
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { dispatch } from 'store';
import { REQUEST_STATUS } from 'utils/apiConfig';
import { RESET_PASSWORD } from 'store/reducers/authActions';


// ============================|| JWT - LOGIN ||============================ //

const EffectComponent = ({ setStatus, setSubmitting, setErrors, pwd }) => {
  const { loginStatus, error, isLoggedIn } = useAuth();

  const navigate = useNavigate()

  useEffect(() => {
     if (loginStatus == REQUEST_STATUS.error) {
        setStatus({ success: false });
        setErrors({ submit: <FormattedMessage id={error} /> });
        setSubmitting(false);
      }
      if (loginStatus == REQUEST_STATUS.succeed && !isLoggedIn) {
        navigate("/auth/reset-password", { state : { pwd : pwd}})
      }
  }, [loginStatus, isLoggedIn]); // Empty dependency array means this effect runs once on mount

  return null; // No need to render anything for this example
};


const AuthLogin = () => {

  const { login } = useAuth();
  const scriptedRef = useScriptRef();

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const { isLoggedIn } = useAuth();


  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Formik
        initialValues={{
          email: 'test@minepia.com',
          password: '123456',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email(<FormattedMessage id="email-invalid" />).max(255).required(<FormattedMessage id="email-required" />),
          password: Yup.string().max(255).required(<FormattedMessage id="password-required" />)
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await login(values.email, values.password);
            if (scriptedRef.current && isLoggedIn) {
              setStatus({ success: true });
              setSubmitting(false);
            }
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
        {({ errors, handleBlur, handleChange, handleSubmit, 
        isSubmitting, touched, values,setErrors, setStatus, setSubmitting }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-login"><FormattedMessage id="email" /></InputLabel>
                  <OutlinedInput
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder= {<FormattedMessage id="enter-email" />}
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login"><FormattedMessage id="password" /></InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder={<FormattedMessage id="enter-password" />}
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack direction="row"  spacing={2}>
                  <Link variant="h6"  
                  component={RouterLink} 
                  onClick={() => dispatch({type: RESET_PASSWORD, payload:{resetStatus: REQUEST_STATUS.idle}})}
                  to={isLoggedIn ? '/auth/forgot-password' : '/forgot-password'} color="blue">
                    <FormattedMessage id="forgot-password" />
                  </Link>
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    <FormattedMessage id="login" />
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
            <EffectComponent  pwd={values.password} setSubmitting={setSubmitting} setErrors={setErrors} setStatus={setStatus} />
          </form>
        )}
      </Formik>
    </>
  );
};

AuthLogin.propTypes = {
  isDemo: PropTypes.bool
};

export default AuthLogin;
