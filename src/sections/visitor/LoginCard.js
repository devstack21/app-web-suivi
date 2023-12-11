
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
import { SpinnLoader } from 'components/cards/SpinnLoader';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import AuthWrapper from 'sections/auth/AuthWrapper';
import { loginVisitor } from 'store/reducers/visitor/loginVisitorSlice';
import { REQUEST_STATUS } from 'utils/apiConfig';
import * as Yup from 'yup';


// ==============================|| DASHBOARD - ANALYTICS ||============================== //

const EffectComponent = ({ setStatus, setSubmitting, setErrors, setIsLogin }) => {
    const { status, error } = useSelector((state) => state.visitor.login)
  
  
    useEffect(() => {
       if (status == REQUEST_STATUS.error) {
          setStatus({ success: false });
          setErrors({ submit: <FormattedMessage id={error} /> });
          setSubmitting(false);
        }
        if (status == REQUEST_STATUS.succeed) setIsLogin(true)
    }, [status]); // Empty dependency array means this effect runs once on mount
  
    return null; // No need to render anything for this example
  };
  

const LoginCart = ({setIsLogin}) => {
    const intl = useIntl();
    const dispatch = useDispatch()

    const { status } = useSelector((state) => state.visitor.login)


    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    return (
        <AuthWrapper show={false} >
            <Grid item xs={12}>
                <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                    <Typography variant="h3" alignContent="center" ><FormattedMessage id={"login"} /></Typography>
                </Stack>
            </Grid>
            {
                status == REQUEST_STATUS.loading ? <SpinnLoader title="loading" />
                    :
                    <Grid item xs={12}>
                        <Formik
                            initialValues={{
                                password: '',
                                submit: null
                            }}
                            validationSchema={Yup.object().shape({ password: Yup.string().max(255).required(<FormattedMessage id="password-required" />) })}
                            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                                try {
                                    await dispatch(loginVisitor({ "code": values.password }));
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
                            {({ errors, handleBlur, handleChange, handleSubmit,setStatus,setSubmitting,setErrors,
                                isSubmitting, touched, values }) => (
                                <form noValidate onSubmit={handleSubmit}>
                                    <Grid container spacing={3}>

                                        <Grid item xs={12}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="password-login"><FormattedMessage id="password" /></InputLabel>
                                                <OutlinedInput
                                                    fullWidth
                                                    error={Boolean(touched.password && errors.password)}
                                                    id="password-login"
                                                    type={showPassword ? 'text' : 'password'}
                                                    value={values.password}
                                                    name="password"
                                                    onBlur={handleBlur}
                                                    placeholder={intl.formatMessage({ id: 'enter-password' })}
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
                                                />
                                                {touched.password && errors.password && (
                                                    <FormHelperText error id="standard-weight-helper-text-password-login">
                                                        {errors.password}
                                                    </FormHelperText>
                                                )}
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
                                    <EffectComponent setIsLogin={setIsLogin} setSubmitting={setSubmitting} setErrors={setErrors} setStatus={setStatus} />
                                </form>
                            )}
                        </Formik>
                    </Grid>
            }

        </AuthWrapper>
    );
};

export default LoginCart;
