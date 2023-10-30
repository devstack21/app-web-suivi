import PropTypes from 'prop-types';

// material-ui
import {
    IconButton,
    Stack, Tooltip,
} from '@mui/material';
import { dispatch } from 'store';
import { FormattedMessage } from 'react-intl';
import { getDetailCheckpoint } from 'store/reducers/checkpoints/detailSlice';
import {  EditTwoTone } from '@ant-design/icons';
import { initEditRole } from 'store/reducers/Roles/editSlice';
import { initCreateRole } from 'store/reducers/Roles/createSlice';



export const ActionCell = (row, navigation, theme) => {

    return (
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
            
            <Tooltip title={<FormattedMessage id='edit' />}>
                <IconButton
                    color="primary"
                    onClick={(e) => {
                        e.stopPropagation();

                        dispatch(initEditRole());
                        dispatch(initCreateRole());
                        dispatch(getDetailCheckpoint({ id: row.values.id }));
                        navigation(`/apps/users/role/edit/${row.values.id}`);
                    }}
                >
                    <EditTwoTone twoToneColor={theme.palette.primary.main} />
                </IconButton>
            </Tooltip>
            
        </Stack>
    );
};

ActionCell.propTypes = {
    row: PropTypes.array,
    navigation: PropTypes.func,
    theme: PropTypes.object
};
