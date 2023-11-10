import { Grid, TextField, IconButton, Stack, Typography, } from "@mui/material";
import { FormattedMessage } from "react-intl";


import ReactToPrint from 'react-to-print';
import { PrinterOutlined } from '@ant-design/icons';
import { useTheme } from "@emotion/react";

const DatePicker = ({ date, setDate, label }) => {
    return (
        <Grid item xs={8} md={4} marginX={2} >
            <TextField
                fullWidth
                label={<FormattedMessage id={label} />}
                type="date"
                defaultValue={date}
                onChange={(e) => { setDate(e.target.value); }}
                InputLabelProps={{ shrink: true, }}
            />

        </Grid>
    )
}



const DateSelector = ({ startDate, setStartDate, endDate, setEndDate, componentRef }) => {

    const theme = useTheme()

    return (

        <Grid item xs={12}>
            <Stack justifyContent="space-between"
                sx={{ p: 1.25, borderColor: 'primary.lighter', borderRadius: 1, borderWidth: 5, bgcolor: 'white'}}
                alignItems="center"  // Align items vertically
                alignContent="center" // Align content horizontally
                direction='row' >
                <Stack direction="row" alignItems="center"  // Align items vertically
                    alignContent="center" // Align content horizontally
                >
                    <Typography>
                        <FormattedMessage id="period" />
                    </Typography>
                    <DatePicker date={startDate} setDate={setStartDate} label="start-date" />
                    <DatePicker date={endDate} setDate={setEndDate} label="end-date" />
                </Stack>

                <Stack direction="row" justifyContent="flex-end">

                    <ReactToPrint
                        trigger={() => (
                            <IconButton>
                                <PrinterOutlined style={{ color: theme.palette.grey[900] }} />
                            </IconButton>
                        )}
                        content={() => componentRef.current}
                    />
                </Stack>

            </Stack>

        </Grid>


    )
}

export default DateSelector