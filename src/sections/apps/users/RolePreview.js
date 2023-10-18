import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import {
  useMediaQuery,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  Tooltip
} from '@mui/material';

// third-party
import { PDFDownloadLink } from '@react-pdf/renderer';

// project import
import AddRole from './AddRole';
import AlertRoleDelete from './AlertRoleDelete';
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import SimpleBar from 'components/third-party/SimpleBar';
import { PopupTransition } from 'components/@extended/Transitions';
import RoleListCard from './exportpdf/RoleListCard';

// assets
import { DeleteOutlined, DownloadOutlined, EditOutlined } from '@ant-design/icons';


// ==============================|| ROLE - CARD PREVIEW ||============================== //

export default function RolePreview({ role, open, onClose }) {
  const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const [openAlert, setOpenAlert] = useState(false);

  const [add, setAdd] = useState(false);
  const handleAdd = () => {
    setAdd(!add);
  };

  const handleClose = () => {
    setOpenAlert(!openAlert);
    onClose();
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={PopupTransition}
        keepMounted
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{ '& .MuiDialog-paper': { width: 1024, maxWidth: 1, m: { xs: 1.75, sm: 2.5, md: 4 } } }}
      >
        <Box id="PopupPrint" sx={{ px: { xs: 2, sm: 3, md: 5 }, py: 1 }}>
          <DialogTitle sx={{ px: 0 }}>
            <List sx={{ width: 1, p: 0 }}>
              <ListItem
                disablePadding
                secondaryAction={
                  <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
                    <Tooltip title="Export">
                      <PDFDownloadLink document={<RoleListCard role={role} />} fileName={`Role-${role?.libelle}.pdf`}>
                        <IconButton color="secondary">
                          <DownloadOutlined />
                        </IconButton>
                      </PDFDownloadLink>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton color="secondary" onClick={handleAdd}>
                        <EditOutlined />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" onClick={handleClose}>
                      <IconButton color="error">
                        <DeleteOutlined />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                }
              >
                <ListItemText
                  primary={<Typography variant="h5">{role?.libelle}</Typography>}
                  secondary={<Typography color="secondary">{role?.code_role}</Typography>}
                />
              </ListItem>
            </List>
          </DialogTitle>
          <DialogContent dividers sx={{ px: 0 }}>
            <SimpleBar sx={{ height: 'calc(100vh - 290px)' }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={8} xl={9}>
                  <Grid container spacing={2.25}>
                    <Grid item xs={12}>
                      <MainCard title="About me">
                        <Typography>
                          Hello, Myself {role?.libelle}, I’m {role?.code_role} 
                        </Typography>
                      </MainCard>
                    </Grid>
                    <Grid item xs={12}>
                      <MainCard title="Education">
                        <List sx={{ py: 0 }}>
                          <ListItem divider>
                            <Grid container spacing={matchDownMD ? 0.5 : 3}>
                              <Grid item xs={12} md={6}>
                                <Stack spacing={0.5}>
                                  <Typography color="secondary">Master Degree (Year)</Typography>
                                  <Typography>2014-2017</Typography>
                                </Stack>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Stack spacing={0.5}>
                                  <Typography color="secondary">Institute</Typography>
                                  <Typography>-</Typography>
                                </Stack>
                              </Grid>
                            </Grid>
                          </ListItem>
                          <ListItem divider>
                            <Grid container spacing={matchDownMD ? 0.5 : 3}>
                              <Grid item xs={12} md={6}>
                                <Stack spacing={0.5}>
                                  <Typography color="secondary">Bachelor (Year)</Typography>
                                  <Typography>2011-2013</Typography>
                                </Stack>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Stack spacing={0.5}>
                                  <Typography color="secondary">Institute</Typography>
                                  <Typography>Imperial College London</Typography>
                                </Stack>
                              </Grid>
                            </Grid>
                          </ListItem>
                          <ListItem>
                            <Grid container spacing={matchDownMD ? 0.5 : 3}>
                              <Grid item xs={12} md={6}>
                                <Stack spacing={0.5}>
                                  <Typography color="secondary">School (Year)</Typography>
                                  <Typography>2009-2011</Typography>
                                </Stack>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Stack spacing={0.5}>
                                  <Typography color="secondary">Institute</Typography>
                                  <Typography>School of London, England</Typography>
                                </Stack>
                              </Grid>
                            </Grid>
                          </ListItem>
                        </List>
                      </MainCard>
                    </Grid>
                    <Grid item xs={12}>
                      <MainCard title="Emplyment">
                        <List sx={{ py: 0 }}>
                          <ListItem divider>
                            <Grid container spacing={matchDownMD ? 0.5 : 3}>
                              <Grid item xs={12} md={6}>
                                <Stack spacing={0.5}>
                                  <Typography color="secondary">Senior UI/UX designer (Year)</Typography>
                                  <Typography>2019-Current</Typography>
                                </Stack>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Stack spacing={0.5}>
                                  <Typography color="secondary">Job Responsibility</Typography>
                                  <Typography>
                                    Perform task related to project manager with the 100+ team under my observation. Team management is key
                                    role in this company.
                                  </Typography>
                                </Stack>
                              </Grid>
                            </Grid>
                          </ListItem>
                          <ListItem>
                            <Grid container spacing={matchDownMD ? 0.5 : 3}>
                              <Grid item xs={12} md={6}>
                                <Stack spacing={0.5}>
                                  <Typography color="secondary">Trainee cum Project Manager (Year)</Typography>
                                  <Typography>2017-2019</Typography>
                                </Stack>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Stack spacing={0.5}>
                                  <Typography color="secondary">Job Responsibility</Typography>
                                  <Typography>Team management is key role in this company.</Typography>
                                </Stack>
                              </Grid>
                            </Grid>
                          </ListItem>
                        </List>
                      </MainCard>
                    </Grid>
                    <Grid item xs={12}>
                      <MainCard title="Skills">
                        <Box
                          sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            listStyle: 'none',
                            p: 0.5,
                            m: 0
                          }}
                          component="ul"
                        >
                          {role?.habilitations.map((obj, index) => (
                            <ListItem disablePadding key={index} sx={{ width: 'auto', pr: 0.75, pb: 0.75 }}>
                              <Chip color="secondary" variant="outlined" size="small" label={obj.modules[0].libelle} />
                            </ListItem>
                          ))}
                        </Box>
                      </MainCard>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={4} xl={3}>
                  <MainCard>
                    <Stack spacing={2}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Father Name</Typography>
                        <Typography>
                          Mr. 
                        </Typography>
                      </Stack>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Email</Typography>
                        <Typography></Typography>
                      </Stack>
                      
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Location</Typography>
                        <Typography>  </Typography>
                      </Stack>

                    </Stack>
                  </MainCard>
                </Grid>
              </Grid>
            </SimpleBar>
          </DialogContent>

          <DialogActions>
            <Button color="error" onClick={onClose}>
              Close
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* edit role dialog */}
      <Dialog
        maxWidth="sm"
        fullWidth
        TransitionComponent={PopupTransition}
        onClose={handleAdd}
        open={add}
        sx={{ '& .MuiDialog-paper': { p: 0 } }}
      >
        <AddRole role={role} onCancel={handleAdd} />
      </Dialog>

      <AlertRoleDelete title={role?.libelle} open={openAlert} handleClose={handleClose} />
    </>
  );
}

RolePreview.propTypes = {
  role: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func
};
