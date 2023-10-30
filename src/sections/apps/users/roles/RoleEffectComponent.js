import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { initCreateRole } from "store/reducers/Roles/createSlice";
import { initEditRole } from "store/reducers/Roles/editSlice";
import { initCreateCheckpoint } from "store/reducers/checkpoints/createSlice";
import { openSnackbar } from "store/reducers/snackbar";
import { REQUEST_STATUS } from "utils/apiConfig";


const EffectComponent = ({ setStatus, setSubmitting, setErrors, resetForm }) => {

  const { createStatus, createError } = useSelector((state) => state.role.create)

  const { editStatus, editError } = useSelector((state) => state.role.edit)


  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (editStatus == REQUEST_STATUS.error) {
      setStatus({ success: false });
      dispatch(
        openSnackbar({
          open: true,
          message: <FormattedMessage id={editError} />,
          variant: 'alert',
          alert: {
            color: 'error',
          },
          close: false
        })
      );
      setErrors({ submit: <FormattedMessage id={editError} /> });
      dispatch(initEditRole())
      setSubmitting(false);
    }
    if (editStatus == REQUEST_STATUS.succeed) {
      setStatus({ success: false });
      resetForm()
      dispatch(
        openSnackbar({
          open: true,
          message: <FormattedMessage id="role-edited" />,
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
      setTimeout(() => {
        navigate("/apps/users/roles/")
      }, 500);
    }
  }, [editStatus]); // Empty dependency array means this effect runs once on mount


  useEffect(() => {
    if (createStatus == REQUEST_STATUS.error) {
      setStatus({ success: false });
      dispatch(
        openSnackbar({
          open: true,
          message: <FormattedMessage id={createError} />,
          variant: 'alert',
          alert: {
            color: 'error',
          },
          close: false
        })
      );
      setErrors({ submit: <FormattedMessage id={createError} /> });
      dispatch(initCreateCheckpoint())
      setSubmitting(false);
    }
    if (createStatus == REQUEST_STATUS.succeed) {
      setStatus({ success: false });
      dispatch(initCreateRole())
      resetForm()
      dispatch(
        openSnackbar({
          open: true,
          message: <FormattedMessage id="role-created" />,
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
      setTimeout(() => {
        navigate("/apps/users/roles/")
      }, 500);
    }
  }, [createStatus]); // Empty dependency array means this effect runs once on mount

  return null; // No need to render anything for this example
};

export default EffectComponent