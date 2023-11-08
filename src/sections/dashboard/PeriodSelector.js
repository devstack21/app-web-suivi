
// material-ui
import {
    Grid,
    MenuItem,
    TextField,
} from '@mui/material';

import { FormattedMessage } from 'react-intl';
import { PERIODS } from 'utils/apiConfig';



const PeriodSelector = ({ value, setValue }) => (
    <Grid item>
        <TextField
            id="standard-select-currency"
            size="small"
            select
            value={value}
            onChange={(e) => setValue(e.target.value)}
            sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem' } }}
        >
            {PERIODS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    <FormattedMessage id={option.label} />
                </MenuItem>
            ))}
        </TextField>
    </Grid>

);

export default PeriodSelector;

