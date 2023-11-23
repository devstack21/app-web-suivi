
// material-ui
import { useTheme } from '@mui/material/styles';
import {
    MenuItem,
    Select,
    Stack,
} from '@mui/material';

// project import
import IconButton from 'components/@extended/IconButton';


// assets
import { DownloadOutlined } from '@ant-design/icons';


import { useSelector } from 'react-redux';



// ==============================|| DASHBOARD - ANALYTICS ||============================== //

const StatFilters = ({ type, setType }) => {


    const theme = useTheme()

    const { betailTab } = useSelector((state) => state.betail.list);

    return (

        <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent={{ xs: 'center', sm: 'flex-end' }}
            sx={{ mt: 3, mr: 2 }}
        >

            <Select size="small" value={type} onChange={(e) => setType(e.target.value)}>
                {betailTab?.map((item, index) => (
                    <MenuItem key={index} value={item}>
                        {item.name} / {item.name_english}
                    </MenuItem>
                ))}
            </Select>
            <IconButton
                size="small"
                sx={{
                    border: `1px solid ${theme.palette.grey[400]}`,
                    '&:hover': { backgroundColor: 'transparent' }
                }}
            >
                <DownloadOutlined style={{ color: theme.palette.grey[900] }} />
            </IconButton>
        </Stack>

    );
};

export default StatFilters;
