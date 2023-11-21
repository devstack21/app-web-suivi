import { PAGE_ROWS } from "config";
import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { openSnackbar } from "store/reducers/snackbar";
import { getListValidatePassword_req } from "store/reducers/validatePassword/listeValidatePasswordSlice";
import { initValidatePassword } from "store/reducers/validatePassword/validatePasswordSlice";
import { REQUEST_STATUS } from "utils/apiConfig";




const EffectComponentValideResetPwd = () => {

    const { resetStatus, restError } = useSelector((state) => state.validatePassword.reset);

    const dispatch = useDispatch()

  useEffect(() => {
    if (resetStatus == REQUEST_STATUS.succeed) {
      dispatch(
        openSnackbar({
          open: true,
          message: <FormattedMessage id='add-alert-succeed' />,
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
      dispatch(getListValidatePassword_req({ page: 1, nbre_ligne: PAGE_ROWS }))
      dispatch(initValidatePassword())
    }
    if (resetStatus == REQUEST_STATUS.error) {
      dispatch(
        openSnackbar({
          open: true,
          message: <FormattedMessage id={restError} />,
          variant: 'alert',
          alert: {
            color: 'error'
          },
          close: false
        })
      );
      dispatch(initValidatePassword())
    }
  }, [resetStatus])



  return null; // No need to render anything for this example
};

export default EffectComponentValideResetPwd