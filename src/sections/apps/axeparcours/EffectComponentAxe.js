import { PAGE_ROWS } from "config";
import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
// import { initCreateUser } from "store/reducers/accounts/createSlice";
// import { getListAccounts } from "store/reducers/accounts/listSlice";
// import { initEditAlert } from "store/reducers/alerte/editAlerteSlice";
// import { getListAlerts } from "store/reducers/alerte/listeAlerteSlice";
import { initCreateAxeparcours } from "store/reducers/axeparcours/createAxeparcoursSlice";
import { initEditAxeparcours } from "store/reducers/axeparcours/editAxeparcoursSlice";
import { getListAxeparcours } from "store/reducers/axeparcours/listeAxeparcoursSlice";
import { openSnackbar } from "store/reducers/snackbar";
import { REQUEST_STATUS } from "utils/apiConfig";
import { useNavigate } from 'react-router';




const EffectComponentAxe = () => {

  const { createStatus, createError } = useSelector((state) => state.axeparcours.create)
  const { editStatus, editError } = useSelector((state) => state.axeparcours.edit)

  const dispatch = useDispatch();
  const navigation = useNavigate();

  useEffect(() => {
    if (createStatus == REQUEST_STATUS.succeed) {
      dispatch(
        openSnackbar({
          open: true,
          message: <FormattedMessage id='add-axeparcours-succeed' />,
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
      dispatch(getListAxeparcours({ page: 1, nbre_ligne: PAGE_ROWS }))
      dispatch(initCreateAxeparcours())
      navigation('/apps/axeparcours/list/')
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
      dispatch(initCreateAxeparcours())
    }
  }, [createStatus])

  useEffect(() => {
    console.log("status edit", editStatus)
    if (editStatus == REQUEST_STATUS.succeed) {
      dispatch(
        openSnackbar({
          open: true,
          message: <FormattedMessage id='edit-axeparcours-succeed' />,
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
      dispatch(getListAxeparcours({ page: 1, nbre_ligne: PAGE_ROWS }));
      dispatch(initCreateAxeparcours());
      navigation('/apps/axeparcours/list/');
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
      dispatch(initEditAxeparcours())
    }
  }, [editStatus])


  return null;
};

export default EffectComponentAxe