import { PAGE_ROWS } from "config";
import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
// import { initCreateUser } from "store/reducers/accounts/createSlice";
// import { getListAccounts } from "store/reducers/accounts/listSlice";
import { initCreateAlert } from "store/reducers/alerte/createAlerteSlice";
import { initEditAlert } from "store/reducers/alerte/editAlerteSlice";
import { getListAlerts } from "store/reducers/alerte/listeAlerteSlice";
import { openSnackbar } from "store/reducers/snackbar";
import { REQUEST_STATUS } from "utils/apiConfig";
import { useNavigate } from 'react-router';
import { initdeleteAlert } from "store/reducers/alerte/deleteAlerteSlice";




const EffectComponent = () => {

  const { createStatus, createError } = useSelector((state) => state.alert.create)
  const { editStatus, editError } = useSelector((state) => state.alert.edit)
  const { deleteStatus, deleteError } = useSelector((state) => state.alert.delete);

  const dispatch = useDispatch();
  const navigation = useNavigate();

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
      dispatch(getListAlerts({ page: 1, nbre_ligne: PAGE_ROWS }));
      dispatch(initCreateAlert());
      navigation('/apps/alerts/list/');
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
      dispatch(initCreateAlert())
    }
  }, [createStatus])

  useEffect(() => {
    if (editStatus == REQUEST_STATUS.succeed) {
      dispatch(
        openSnackbar({
          open: true,
          message: <FormattedMessage id='update-alert-succeed' />,
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
      dispatch(getListAlerts({ page: 1, nbre_ligne: PAGE_ROWS }));
      dispatch(initEditAlert());
      navigation('/apps/alerts/list/');
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

  console.log("mon error", deleteError)

  useEffect(() => {
    if (deleteStatus == REQUEST_STATUS.succeed) {
      dispatch(
        openSnackbar({
          open: true,
          message: <FormattedMessage id='delete-alert-succeed' />,
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
      dispatch(getListAlerts({ page: 1, nbre_ligne: PAGE_ROWS }));
      dispatch(initdeleteAlert());
      // navigation('/apps/alerts/list/');
    }
    if (deleteStatus == REQUEST_STATUS.error) {
      dispatch(
        openSnackbar({
          open: true,
          message: <FormattedMessage id={deleteError} />,
          variant: 'alert',
          alert: {
            color: 'error'
          },
          close: false
        })
      );
      dispatch(initdeleteAlert())
    }
  }, [deleteStatus])


  return null; // No need to render anything for this example
};

export default EffectComponent