
// material-ui
import {
    Grid,
    Typography
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';




const StatIndicateurVille = () => {



    return (

        <Grid item xs={12} md={7} lg={8}>
            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                    <Typography variant="h5">Tendance des alertes par ville</Typography>
                </Grid>
                <Grid item />
            </Grid>
            <MainCard sx={{ mt: 2 }} content={false}>
            </MainCard>
        </Grid>
    );
};

export default StatIndicateurVille;

//                <OrdersList ListTendanceVille={[]} />

