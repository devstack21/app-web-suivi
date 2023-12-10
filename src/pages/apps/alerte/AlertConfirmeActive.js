// material-ui
import { Button, Dialog, DialogContent, Stack, Typography } from '@mui/material';

// project import
import Avatar from 'components/@extended/Avatar';
import { PopupTransition } from 'components/@extended/Transitions';

// assets
import { CheckCircleFilled } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { initValidatePassword, validatePassword_req } from 'store/reducers/validatePassword/validatePasswordSlice';
import { REQUEST_STATUS } from 'utils/apiConfig';
import { SpinnLoader } from 'components/cards/SpinnLoader';
import { getListValidatePassword_req } from 'store/reducers/validatePassword/listeValidatePasswordSlice';
import { PAGE_ROWS } from 'config';

// ==============================|| CUSTOMER - DELETE ||============================== //

export default function AlertConfirmeActive({ open, handleClose, user }) {

  const dispatch = useDispatch();

  const { resetStatus, result } = useSelector((state) => state.validatePassword.reset);

  const resetPwd = () => { dispatch(validatePassword_req({ 'phone': user.phone })); }

  const closePopPup = () => {
    dispatch(initValidatePassword())
    dispatch(getListValidatePassword_req({ page: 1, nbre_ligne: PAGE_ROWS }))
    handleClose(true)
  }



  return (
    <Dialog
      open={open}
      onClose={() => handleClose(false)}
      keepMounted
      TransitionComponent={PopupTransition}
      maxWidth="xs"
      aria-labelledby="column-delete-title"
      aria-describedby="column-delete-description"
    >
      <DialogContent sx={{ mt: 2, my: 1 }}>
        <Stack alignItems="center" spacing={3.5}>


          <Avatar color={result.password ? 'success' : 'warning'} sx={{ width: 72, height: 72, fontSize: '1.75rem' }}>
            <CheckCircleFilled />
          </Avatar>
          <Stack spacing={2}>
            <Typography align="center">
              {
                result.password ?
                  <Typography variant="subtitle1" component="span">
                    {<FormattedMessage id='new-password-user' />} {user.name} : {result.password}
                  </Typography>
                  :
                  <Typography variant="subtitle1" component="span">
                    {' '}&quot;{<FormattedMessage id='resetPwd-confirm-active' />}&quot;{' '}
                  </Typography>
              }
            </Typography>
          </Stack>

          {resetStatus == REQUEST_STATUS.loading && <SpinnLoader title="loading" />}


          <Stack direction="row" spacing={2} sx={{ width: 1 }}>
            <Button fullWidth onClick={() => handleClose(false)} color="secondary" variant="outlined">
              <FormattedMessage id='cancel' />
            </Button>
            <Button fullWidth
              color={result.password ? 'success' : 'warning'}
              variant="contained"
              onClick={resetStatus == REQUEST_STATUS.succeed ? closePopPup : resetPwd} autoFocus>
              <FormattedMessage id='detailrapport-valider' />
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}