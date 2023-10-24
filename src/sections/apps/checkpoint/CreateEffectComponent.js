import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { initCreateCheckpoint } from "store/reducers/checkpoints/createSlice";
import { openSnackbar } from "store/reducers/snackbar";
import { REQUEST_STATUS } from "utils/apiConfig";


const CreateEffectComponent = ({ setStatus, setSubmitting, setErrors, resetForm }) => {
    
    const { createStatus, createError } = useSelector((state) => state.checkpoint.create)
  
    const navigate = useNavigate()
    const dispatch = useDispatch()
  
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
          setErrors({ submit: <FormattedMessage  id={createError}/> });
          dispatch(initCreateCheckpoint())
          setSubmitting(false);
        }
        if (createStatus == REQUEST_STATUS.succeed ) {
          setStatus({ success: false });
          resetForm()
          dispatch(
            openSnackbar({
              open: true,
              message: <FormattedMessage id="checkpoint-created" />,
              variant: 'alert',
              alert: {
                color: 'success'
              },
              close: false
            })
          );
          setTimeout(() => {
            navigate("/apps/checkpoints/list")
          }, 500);
        }
    }, [createStatus]); // Empty dependency array means this effect runs once on mount
  
    return null; // No need to render anything for this example
  };
  
  export default CreateEffectComponent