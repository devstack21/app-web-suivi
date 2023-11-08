import { Box, CircularProgress, Grid, Stack, Typography } from "@mui/material";

export const SpinnLoader = ({title}) =>{
    return (

        <Grid container spacing={3}>
            <Grid item xs={12}>

                <Grid container direction="column" justifyContent="center" alignItems="center">
                    <Grid item>
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>
                    </Grid>
                    <Grid item>
                        <Stack spacing={1}>
                            <Typography align="center" variant="h6">
                                {title}
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}