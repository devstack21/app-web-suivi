import { Grid, TextField, Stack } from "@mui/material";
import { FormattedMessage } from "react-intl";


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



const DateSelector = ({ startDate, setStartDate, endDate, setEndDate }) => {

    return (

        <Grid item xs={12}>
            <Stack justifyContent="space-between"
                sx={{ p: 1.25, borderColor: 'primary.lighter', borderRadius: 1, borderWidth: 5, bgcolor: 'white' }}
                alignItems="center"  // Align items vertically
                alignContent="center" // Align content horizontally
                direction='row' >
                <Stack direction="row" alignItems="center"  // Align items vertically
                    alignContent="center" // Align content horizontally
                >
                    
                    <DatePicker date={startDate} setDate={setStartDate} label="start-date" />
                    <DatePicker date={endDate} setDate={setEndDate} label="end-date" />
                </Stack>

                
            </Stack>

        </Grid>


    )
}

export default DateSelector