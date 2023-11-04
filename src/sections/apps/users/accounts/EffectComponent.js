import { PAGE_ROWS } from "config";
import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { initCreateUser } from "store/reducers/Accounts/createSlice";
import { initEditUser } from "store/reducers/Accounts/editSlice";
import { getListAccounts } from "store/reducers/Accounts/listSlice";
import { openSnackbar } from "store/reducers/snackbar";
import { REQUEST_STATUS } from "utils/apiConfig";

const getInitialValues = (user, roleTab) => {

  const newUser = {
    username: '',
    email: '',
    role: null,
    phone: '',
    active: true
  };

  if (user) {
    newUser.username = user.username || '';
    newUser.email = user.email || '';
    newUser.phone = user.phone || '';
    newUser.active = user.is_block ;

    if (user.role) {
      // Find the role object based on libelle
      const matchingRole = roleTab.find((role) => role.libelle === user.role);
    
      // Set the role based on the found role
      newUser.role = matchingRole || null; // Set to null if not found

    }
  }
  return newUser;
};


const EffectComponent = ({ setValues, user , page}) => {

  const { createStatus, createError } = useSelector((state) => state.account.create)
  const { editStatus, editError } = useSelector((state) => state.account.edit)
  const { roleTab } = useSelector((state) => state.role.list)


  const dispatch = useDispatch()

  useEffect(() => {
    if (createStatus == REQUEST_STATUS.succeed) {
      dispatch(
        openSnackbar({
          open: true,
          message: <FormattedMessage id='add-user-succeed' />,
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
          message: <FormattedMessage id='edit-user-succeed' />,
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
      dispatch(getListAccounts({ page: page, nb: PAGE_ROWS }))
      dispatch(initEditUser())
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
      dispatch(initEditUser())
    }
  }, [editStatus])



  useEffect(() => {
    if (user) {
      const initialValues = getInitialValues(user, roleTab);
      setValues(initialValues);
    }
  }, [user, setValues]);

  
  return null; // No need to render anything for this example
};

export default EffectComponent