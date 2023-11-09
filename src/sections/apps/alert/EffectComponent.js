import { PAGE_ROWS } from "config";
import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { initCreateUser } from "store/reducers/accounts/createSlice";
import { getListAccounts } from "store/reducers/accounts/listSlice";
import { initEditAlert } from "store/reducers/alerte/editAlerteSlice";
import { getListAlerts } from "store/reducers/alerte/listeAlerteSlice";
import { openSnackbar } from "store/reducers/snackbar";
import { REQUEST_STATUS } from "utils/apiConfig";




const EffectComponent = () => {

  const { createStatus, createError } = useSelector((state) => state.alert.create)
  const { editStatus, editError } = useSelector((state) => state.alert.edit)

  const dispatch = useDispatch()

  useEffect(() => {
    if (createStatus == REQUEST_STATUS.succeed) {
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
      dispatch(getListAccounts({ page: page, nb: PAGE_ROWS }))
      dispatch(initCreateUser())
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
          message: <FormattedMessage id='edit-alert-succeed' />,
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
      dispatch(getListAlerts({ page: 1, nb: PAGE_ROWS }))
      dispatch(initCreateUser())
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
      dispatch(initEditAlert())
    }
  }, [editStatus])


  return null; // No need to render anything for this example
};

export default EffectComponent