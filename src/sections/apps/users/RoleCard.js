import PropTypes from 'prop-types';
import { useState } from 'react';
// material-ui
import {
  Box,
  Button,
  Dialog,
  Divider,
  Fade,
  Grid,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography
} from '@mui/material';

// third-party
import { PDFDownloadLink } from '@react-pdf/renderer';
import { format } from 'date-fns';


// project import
import RolePreview from './RolePreview';
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import { PopupTransition } from 'components/@extended/Transitions';
import RoleListSmallCard from './exportpdf/RoleListSmallCard';

// assets
import { MoreOutlined } from '@ant-design/icons';
import AddRole from './AddRole';
import AlertRoleDelete from './AlertRoleDelete';

// ==============================|| ROLE - CARD ||============================== //

const RoleCard = ({ role }) => {

  console.log("RoleCard",role)
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [openAlert, setOpenAlert] = useState(false);

  const handleAlertClose = () => {
    setOpenAlert(!openAlert);
    handleMenuClose();
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [add, setAdd] = useState(false);
  const handleAdd = () => {
    setAdd(!add);
  };


  return (
    <>
      <MainCard sx={{ height: 1, '& .MuiCardContent-root': { height: 1, display: 'flex', flexDirection: 'column' } }}>
        <Grid id="print" container spacing={2.25}>
          <Grid item xs={12}>
            <List sx={{ width: 1, p: 0 }}>
              <ListItem
                disablePadding
                secondaryAction={
                  <IconButton edge="end" aria-label="comments" color="secondary" onClick={handleMenuClick}>
                    <MoreOutlined style={{ fontSize: '1.15rem' }} />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={<Typography variant="subtitle1">{role?.libelle}</Typography>}
                  secondary={
                    <Typography variant="caption" color="secondary">
                      {role?.code_role}
                    </Typography>
                  }
                />
              </ListItem>
            </List>
            <Menu
              id="fade-menu"
              MenuListProps={{
                'aria-labelledby': 'fade-button'
              }}
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleMenuClose}
              TransitionComponent={Fade}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
            >
              <MenuItem sx={{ a: { textDecoration: 'none', color: 'inherit' } }}>
                <>
                  {' '}
                  <PDFDownloadLink document={<RoleListSmallCard role={role} />} fileName={`Role-${role?.fatherName}.pdf`}>
                    Export PDF
                  </PDFDownloadLink>
                </>
              </MenuItem>
              <MenuItem onClick={handleAdd}>Edit</MenuItem>
              <MenuItem onClick={handleAlertClose}>Delete</MenuItem>
            </Menu>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Box>
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
                    <Typography variant="caption" color="secondary">
                      {obj.modules[0].libelle}
                    </Typography>
                  </ListItem>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Stack
          direction="row"
          className="hideforPDf"
          alignItems="center"
          spacing={1}
          justifyContent="space-between"
          sx={{ mt: 'auto', mb: 0, pt: 2.25 }}
        >
          <Typography variant="caption" color="secondary">
            Updated in  {format(new Date(role?.updated_at), 'MM/dd/yyyy')}
          </Typography>
          <Button variant="outlined" size="small" onClick={handleClickOpen}>
            Preview
          </Button>
        </Stack>
      </MainCard>

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
      <RolePreview role={role} open={open} onClose={handleClose} />
      <AlertRoleDelete title={role?.libelle} open={openAlert} handleClose={handleAlertClose} />
    </>
  );
};

RoleCard.propTypes = {
  role: PropTypes.object
};

export default RoleCard;
