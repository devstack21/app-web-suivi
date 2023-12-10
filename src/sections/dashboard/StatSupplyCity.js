
// material-ui
import {
    Grid,
    List,
    ListItemButton,
    ListItemText,
    Stack,
    Typography
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// assets


import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { REQUEST_STATUS } from 'utils/apiConfig';
import { SpinnLoader } from 'components/cards/SpinnLoader';
import CityFilters from './CityFilter';
import { useEffect, useState } from 'react';


const StatItem = ({ item }) => (
    <ListItemButton divider>
        <ListItemText
            primary={<Typography variant="subtitle1">  {item.animal_name}</Typography>}
            secondary={

                <Typography color="textSecondary" sx={{ display: 'inline' }}>
                    <FormattedMessage id='previous-period' />
                </Typography>

            }
        />
        <Stack alignItems="flex-end">
            <Typography variant="h5" color="primary">
                {item.quantity} {item.animal_unit}
            </Typography>
            <Typography variant="body2" color="textSecondary">
                {item.prev_quantity} {item.animal_unit}
            </Typography>
        </Stack>
    </ListItemButton>
)


const StatSupplyCity = () => {


    const { status, result } = useSelector((state) => state.dashboard.indicator);

    const [data, setData] = useState([])
    const [city, setCity] = useState({})


    useEffect(() => {
        const filteredData = result?.cities?.filter(obj => obj.ville === city.pk);
        setData(filteredData);
    }, [city, data])

    return (

        <Grid item xs={12} md={12} style={{ marginTop: 20 }}>
            <Grid container alignItems="center" justifyContent="space-between"  >

                <Grid item>
                    <Typography variant="h5"><FormattedMessage id={city.name ? `supply` : 'statistics-supply-city'} /> {city.name}</Typography>
                </Grid>
                <Grid item >
                    <CityFilters city={city} setCity={setCity} />
                </Grid>

            </Grid>
            {status === REQUEST_STATUS.loading && <SpinnLoader title="loading-chart" />}
            <MainCard sx={{ mt: 2 }} content={false}>

                {
                    status === REQUEST_STATUS.succeed && data &&
                    <>
                        {
                            data.length > 0 ?
                                <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
                                    {data.map((item, index) => (
                                        <StatItem key={index} item={item} />
                                    ))}

                                </List>

                                :
                                <>
                                    <Typography style={{ textAlign: 'center', padding: 10 }} variant="h6">
                                        <FormattedMessage id={'no-supply'} />
                                    </Typography>
                                </>

                        }
                    </>

                }
            </MainCard>


        </Grid>
    );
};

export default StatSupplyCity;

