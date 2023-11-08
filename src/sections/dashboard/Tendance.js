import { CaretDownOutlined, CaretUpOutlined, } from "@ant-design/icons"
import { useTheme } from "@emotion/react";
import { Grid, Stack, Typography } from "@mui/material"
import { FormattedMessage } from "react-intl";


export const TendanceComponent = ({ percentage, total }) => {

    const theme = useTheme();

    return (
        <Grid item xs={12} sm={6}>
            <Stack sx={{ ml: 2, mt: 3 }} alignItems={{ xs: 'center', sm: 'flex-start' }}>
                <Stack direction="row" alignItems="center">
                    {
                        percentage > 0 ?
                            <>

                                <CaretUpOutlined style={{ color: theme.palette.success.main, paddingRight: '4px' }} />
                                <Typography color={theme.palette.success.main}>{percentage}%</Typography>
                            </>
                            :
                            <>

                                <CaretDownOutlined style={{ color: theme.palette.error.main, paddingRight: '4px' }} />
                                <Typography color={theme.palette.error.main}>{percentage}%</Typography>
                            </>
                    }
                </Stack>
                <Typography color="textSecondary" sx={{ display: 'block' }}>
                    <FormattedMessage id="effectif-total" /> {total} <FormattedMessage id="heads" />
                </Typography>
            </Stack>
        </Grid>
    )
}