import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Grid } from '@mui/material';

// project import
import { ThemeMode } from 'config';
import useConfig from 'hooks/useConfig';

// third-party
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { tabColor } from 'utils/getColors';

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
        yaxis: {
          show: false
        }
      }
    }
  ]
};



const TypeBetailPieChart = () => {
  const theme = useTheme();
  const { mode, fontFamily } = useConfig();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const warning = theme.palette.warning.main;
  const primaryMain = theme.palette.primary.main;
  const successDark = theme.palette.success.dark;

  const { result } = useSelector((state) => state.dashboard.type);


  const [options, setOptions] = useState(columnChartOptions);
  const [series, setSeries] = useState([]);
  const [labels, setLabels] = useState([]);


  useEffect(() => {
    const seriesData = result.tab_current_period.map((item) => item.quantity);
    setSeries(seriesData);
    setLabels(result.tab_current_period.map((item) => item.type_animal));
  }, [result.tab_current_period]);


  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: tabColor,
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
    <Grid item xs={5} md={6} >
      <Box id="chart" sx={{ bgcolor: 'transparent' }}>
        <ReactApexChart options={options} series={series} type="donut" height={250} />
      </Box>
    </Grid>

  );
};

export default TypeBetailPieChart;
