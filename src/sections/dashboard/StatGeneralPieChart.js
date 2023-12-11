import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Grid, Typography } from '@mui/material';

// project import
import { ThemeMode } from 'config';
import useConfig from 'hooks/useConfig';

// third-party
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { tabColor, tabColor1 } from 'utils/getColors';
import { FormattedMessage } from 'react-intl';

// chart options
const columnChartOptions = {
  chart: {
    type: 'donut',
    height: 430,
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '30%',
      borderRadius: 4
    }
  },
  dataLabels: {
    enabled: true
  },
  stroke: {
    show: true,
    width: 8,
    colors: ['transparent']
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    y: {
      formatter(val) {
        return ` ${val} têtes`;
      }
    }
  },
  legend: {
    show: true,
    fontFamily: `'Public Sans', sans-serif`,
    offsetX: 10,
    offsetY: 10,
    labels: {
      useSeriesColors: false
    },
    markers: {
      width: 16,
      height: 16,
      radius: '50%',
      offsexX: 2,
      offsexY: 2
    },
    itemMargin: {
      horizontal: 15,
      vertical: 50
    }
  },
  responsive: [
    {
      breakpoint: 600,
      options: {
        chart: {
          width: '100%', // Adjust the width for smaller screens
        },
        legend: {
          position: 'bottom', // Move the legend to the bottom on smaller screens
        },
      },
    },
  ],
};



const StatGeneralPieChart = ({ type, visitor }) => {
  const theme = useTheme();
  const { mode, fontFamily } = useConfig();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const warning = theme.palette.warning.main;
  const primaryMain = theme.palette.primary.main;
  const successDark = theme.palette.success.dark;

  const { result } = useSelector((state) => visitor ? state.visitor.type : state.dashboard.type);


  const [options, setOptions] = useState(columnChartOptions);
  const [series, setSeries] = useState([]);
  const [labels, setLabels] = useState([]);


  useEffect(() => {
    const data = type == 'animals' ? result.result.animals : result.result.transport
    const seriesData = data.map((item) => item.quantity);
    setSeries(seriesData);
    setLabels(data.map((item) => item.name));
  }, [result.result]);


  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: type == 'animals' ? tabColor : tabColor1,
      labels: labels,
      dataLabels: {
        offsetY: 5
      },
      grid: {
        borderColor: line,
      },
      theme: {
        mode: mode === ThemeMode.DARK ? 'dark' : 'light',
      },
      legend: {
        fontFamily,
        horizontalAlign: 'right',
        verticalAlign: 'middle',
        labels: {
          colors: 'grey.500',
        },
        itemMargin: {
          horizontal: 2, // Adjust this value to reduce the space between the legend items
          vertical: 5
        }
      },
    }));
  }, [mode, primary, secondary, line, warning, primaryMain, successDark, fontFamily, labels]);
  return (
    <>

      <Grid container alignItems={type == 'animals' ? 'right' : 'left'} justifyContent="space-between">

        <Typography variant="h5" textAlign={type == 'animals' ? 'right' : 'left'} ><FormattedMessage id='statistics'/> <FormattedMessage id={type}/> </Typography>
        <Grid item>
        </Grid>
      </Grid>
      <Box id="chart" sx={{ bgcolor: 'transparent' }}>
        <ReactApexChart options={options} series={series} type="donut" height={250} />
      </Box>
    </>

  );
};

export default StatGeneralPieChart;
