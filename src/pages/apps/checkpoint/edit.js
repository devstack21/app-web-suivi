import { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { getListDistricts } from 'store/reducers/Location/districtsSlice';
import { REQUEST_STATUS } from 'utils/apiConfig';
import EmptyUserCard from 'components/cards/skeleton/EmptyUserCard';
import EditCheckpoint from 'sections/apps/checkpoint/Edit';


const Edit = () => {
  const dispatch = useDispatch()


  const { listStatus, districtsTab } = useSelector((state) => state.location.disctricts)
  const { detailStatus, detailError } = useSelector((state) => state.checkpoint.detail)
  const { editStatus } = useSelector((state) => state.checkpoint.edit)

  useEffect(() => {
    dispatch(getListDistricts())
  }, []);


  if (detailStatus == REQUEST_STATUS.loading || editStatus == REQUEST_STATUS.loading) {
    return (
      <EmptyUserCard id={<FormattedMessage id='loading' />} />
    )
  }


  if (listStatus == REQUEST_STATUS.error || districtsTab.length == 0) {
    <EmptyUserCard id={<FormattedMessage id='error-loading-district' />} />
  }

  if (detailStatus == REQUEST_STATUS.error) return <EmptyUserCard id={detailError} />;



  return (
      <EditCheckpoint/>
      
  );
};

export default Edit;
