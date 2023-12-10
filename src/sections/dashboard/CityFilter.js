
// material-ui
import {
    MenuItem,
    Select,
    Stack,
} from '@mui/material';
import { FormattedMessage } from 'react-intl';


import { useSelector } from 'react-redux';



// ==============================|| DASHBOARD - ANALYTICS ||============================== //

const CityFilters = ({ city, setCity }) => {

    const { ListVille } = useSelector((state) => state.location.villes);


    return (

        <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent={{ xs: 'center', sm: 'flex-end' }}
            sx={{ mt: 3, mr: 2 }}
        >

            {!city.name && <FormattedMessage id={'select-city'}  />}
            <Select size="small" value={city} onChange={(e) => setCity(e.target.value)} style={{marginLeft: 30}} >
                {ListVille?.map((item) => (
                    <MenuItem key={item.pk} value={item}>
                        {item.name}
                    </MenuItem>
                ))}
            </Select>
        </Stack>

    );
};

export default CityFilters;
