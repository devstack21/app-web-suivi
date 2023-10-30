import { useEffect, useState } from 'react';
import {
  Autocomplete, InputLabel, Grid, Stack, TextField, FormHelperText, useTheme, Typography, Divider, CardActions, Button, Switch,
} from '@mui/material';
import MainCard from 'components/MainCard';
import { Form, FormikProvider, useFormik } from 'formik';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { REQUEST_STATUS } from 'utils/apiConfig';
import EmptyUserCard from 'components/cards/skeleton/EmptyUserCard';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router';
import { getListModule } from 'store/reducers/Roles/moduleList';
import { createRole, initCreateRole } from 'store/reducers/Roles/createSlice';
import TaskList from 'sections/apps/users/roles/TaskList';
import EffectComponent from 'sections/apps/users/roles/RoleEffectComponent';
import { editRole, initEditRole } from 'store/reducers/Roles/editSlice';
import { getDetailRole, initDetailRole } from 'store/reducers/Roles/detailSlice';


const Create = () => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const navigation = useNavigate()
  const { id } = useParams(); // Access the id parameter from the URL



  const [selectedModule, setSelectedModule] = useState([])
  const { listStatus, moduleTab } = useSelector((state) => state.role.module)
  const { createStatus } = useSelector((state) => state.role.create)
  const { editStatus } = useSelector((state) => state.role.edit)
  const { detailStatus, role, detailError } = useSelector((state) => state.role.detail)



  useEffect(() => {
    dispatch(getListModule())
    dispatch(initCreateRole())
    dispatch(initEditRole())
    dispatch(initDetailRole())
  }, []);

  useEffect(() => { if (id) {dispatch( getDetailRole({ pk: id })) } }, [id])


  useEffect(() => {
    if (detailStatus === REQUEST_STATUS.succeed) {
      // Assuming role.modules is an array of modules
      const modules = role?.modules || [];

      // Convert modules and their tasks to the format of selectedModule
      const selectedModuleData = modules.reduce((acc, module) => {
        const tasks = module.taches || [];
        const tasksData = tasks.map((task) => ({
          id: task.id,
          module_id: module.id,
          // Add other properties if needed
        }));

        return [...acc, ...tasksData];
      }, []);

      // Set the selectedModule state
      formik.setValues({
        name: role.libelle,
        code: role.code_role,
        active: role.active,
        modules: selectedModuleData,
      });
      setSelectedModule(selectedModuleData);
    }
  }, [detailStatus, role]);



  const validationSchema = yup.object({
    name: yup.string().required(<FormattedMessage id='role-name-required' />).matches(/^[a-zA-Z0-9\s]*[a-zA-Z][a-zA-Z0-9\s]*$/, <FormattedMessage id='invalid-characters' />),
    code: yup.string().required(<FormattedMessage id='role-code-required' />),
    active: yup.boolean(),
  });

  const onSubmit = (values, { setSubmitting, setErrors, setStatus }) => {

    try {
      if (selectedModule.length === 0) {
        // If selectedModule is empty, set an error and prevent form submission
        setErrors({ modules: <FormattedMessage id='modules-required' /> });
        setSubmitting(false);
        return;
      }

      const groupedModulesMap = selectedModule.reduce((acc, task) => {
        const moduleId = task.module_id;
        // Check if the module_id already exists in the Map
        if (acc.has(moduleId)) {
          // If it exists, add the task id to the existing array
          acc.get(moduleId).taches.push(task.id);
        } else {
          // If it doesn't exist, create a new entry in the Map
          acc.set(moduleId, { id: moduleId, taches: [task.id] });
        }

        return acc;
      }, new Map());

      // Convert the Map values to an array
      const groupedModules = Array.from(groupedModulesMap.values());

      // Continue with form submission
      if (id) {
        dispatch(editRole({
          libelle: values.name,
          code_role: values.code,
          modules: groupedModules,
          pk: id,
          active: values.active
        }));

      } else {
        dispatch(createRole({
          libelle: values.name,
          code_role: values.code,
          modules: groupedModules,
        }));

      }

      // Optionally, reset the form after submission
      // resetForm();
    } catch (err) {
      console.error(err);
      setStatus({ success: false });
      setErrors({ submit: err.message });
      setSubmitting(false);
    }

  };


  const handleToggle = (field, formik) => () => {
    formik.setFieldValue(field, !formik.values[field]);
  };

  const formik = useFormik({
    initialValues: {
      name: role?.libelle,
      code: role?.code_role,
      modules: null,
      active: role?.active
    },
    onSubmit: onSubmit,
    validationSchema: validationSchema
  });

  const handleCancel = () => {
    // Reset the form when the "Cancel" button is clicked
    formik.resetForm();
    navigation(`/apps/users/roles/`);
  };

  if (createStatus == REQUEST_STATUS.loading
    || listStatus == REQUEST_STATUS.loading ||
    detailStatus == REQUEST_STATUS.loading ||
    editStatus == REQUEST_STATUS.loading) {
    return (
      <EmptyUserCard id={<FormattedMessage id='loading' />} />
    )
  }



  if (listStatus == REQUEST_STATUS.error || detailStatus == REQUEST_STATUS.error) {
    return (
      <EmptyUserCard id={<FormattedMessage id={detailError ? "detailError" : 'error-loading-district'} />} />
    )
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
            <FormattedMessage id={id ? 'edit-role' : 'new-role'} />
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
            {
              id &&
              <Grid item xs={12}>
                <Stack spacing={1.25}>
                  <InputLabel htmlFor="active"><FormattedMessage id='status' /></InputLabel>
                  <Grid container justifyContent="space-between" alignItems={"center"} >

                    <Typography variant="subtitle2"><FormattedMessage id='active-role' /></Typography>
                    <Switch
                      edge="end"
                      onChange={handleToggle('active', formik)}
                      checked={formik.values?.active || false}
                      inputProps={{
                        'aria-labelledby': 'switch-list-label-sctp'
                      }}
                    />
                  </Grid>

                </Stack>
              </Grid>
            }

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
                        placeholder="Enter Role Name"
                        {...getFieldProps('name')}
                        error={Boolean(touched.name && errors.name)}
                        helperText={touched.name && errors.name}
                      />
                    </Grid>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Grid item xs={5}>
                      <InputLabel htmlFor="code"><FormattedMessage id='code' /></InputLabel>
                    </Grid>
                    <Grid item xs={15}>
                      <TextField
                        fullWidth
                        id="code"
                        placeholder="Enter role code"
                        {...getFieldProps('code')}
                        error={Boolean(touched.code && errors.code)}
                        helperText={touched.code && errors.code}
                      />
                    </Grid>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Divider />

          <Grid container spacing={3} sx={{ p: 5 }} >

            {errors.submit && (
              <Grid item xs={12}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Grid>
            )}

            <Grid container item xs={12} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
              <Grid item xs={12} md={6}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Grid item xs={4}>
                    <InputLabel htmlFor="modules"><FormattedMessage id='modules' /></InputLabel>
                  </Grid>

                  <Grid item xs={12} >
                    <Autocomplete
                      id="module"
                      value={formik.values.modules}
                      options={moduleTab}
                      getOptionLabel={(option) => option.libelle}
                      getOptionSelected={(option, value) => option.id === value.id} // Use camelCase
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Select Module"
                          sx={{ '& .MuiAutocomplete-input.Mui-disabled': { WebkitTextFillColor: theme.palette.text.primary } }}
                        />
                      )}
                      onChange={(e, selectedModule) => {
                        formik.setFieldValue('modules', selectedModule || []); // Ensure it's an array
                      }}
                    />
                  </Grid>
                </Stack>
              </Grid>
              <Grid item xs={12} md={5}>
                {errors.modules && (
                  <Grid item xs={12}>
                    <FormHelperText error>{errors.modules}</FormHelperText>
                  </Grid>
                )}
                <TaskList selectedModule={selectedModule} availableModule={formik.values.modules} setSelectedModule={setSelectedModule} />
              </Grid>
            </Grid>


          </Grid>
          <EffectComponent resetForm={resetForm} setErrors={setErrors} setStatus={setStatus} setSubmitting={setSubmitting} />
        </Form>
      </FormikProvider>
    </MainCard >
  );
};

export default Create;
