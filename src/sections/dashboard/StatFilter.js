
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

    const { typeBetail } = useSelector((state) => state.betail.type);

    return (

        <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent={{ xs: 'center', sm: 'flex-end' }}
            sx={{ mt: 3, mr: 2 }}
        >

            <Select size="small" value={type} onChange={(e) => setType(e.target.value)}>
                {typeBetail?.map((item, index) => (
                    <MenuItem key={index} value={item}>
                        {item.libelle}
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

//              <IncomeChart slot={slot} quantity={id_type_betail} dataRegion={dataStatTypeBetailRegion} />

/*
 
            <Grid item>
            <Select size="small" value={region} onChange={(e) => setRegion(e.target.value)} >
                {regionTab.map((item, index) => (
                    <MenuItem key={index} value={item}>
                        {item.name}
                    </MenuItem>
                ))}
            </Select>*/