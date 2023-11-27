
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


const StatItem = ({ item, type, isLocal, percentage }) => (
    <ListItemButton divider>
        <ListItemText
            primary={<Typography variant="subtitle1">  {item.region_approvisionement}</Typography>}
            secondary={
                <>
                    {
                        isLocal &&
                        <>
                        <Typography color="textSecondary" sx={{ display: 'inline' }}>
                             ({percentage}%  <FormattedMessage id='current-effectif' />)
                        </Typography>
                        </>
                    }
                </>
            }
        />
        <Stack alignItems="flex-end">
            <Typography variant="h5" color="primary">
                {item.effectif_embarque} {type?.unit}
            </Typography>
            <Typography variant="body2" color="textSecondary">
                {item.tendance_regionale >= 0 ? '+' : '-'}{item.tendance_regionale}%
            </Typography>
        </Stack>
    </ListItemButton>
)


const StatImportBetail = ({ type, isLocal }) => {

    const { status, result } = useSelector((state) => state.dashboard.supply);

    const appro = result?.approvisionement ? result.approvisionement.total_effectif_embarque : 0
    const importation = result?.import ? result.import.total_effectif_embarque : 0

    const percentage = Math.round((importation / (appro + importation)) * 100)

    let data = []

    if (isLocal)
        data = result?.import?.tab ? result.import.tab : []
    else
        data = result?.transit?.tab ? result.transit.tab : []


    return (

        <Grid item   xs={12} md={12}  style={{marginTop: 20}}>
            <Grid container alignItems="center" justifyContent="space-between"  >

                <Grid item />
                <Grid item>
                    <Typography variant="h5"><FormattedMessage id={isLocal ? 'statistics-import' : 'statistics-transit'} /> {type?.name} </Typography>
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
                                        <StatItem key={index} item={item} type={type} isLocal={isLocal} percentage={percentage} />
                                    ))}

                                </List>

                                :
                                <>
                                    <Typography style={{ textAlign: 'center' , padding:10}} variant="h6">
                                        <FormattedMessage id={isLocal ? 'no-importation' : 'no-transit'} />
                                    </Typography>
                                </>

                        }
                    </>

                }
            </MainCard>


        </Grid>
    );
};

export default StatImportBetail;

