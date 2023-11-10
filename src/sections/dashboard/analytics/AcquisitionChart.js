import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// project imports
import { ThemeMode } from 'config';
import useConfig from 'hooks/useConfig';

// third-party
import ReactApexChart from 'react-apexcharts';
import { tabColor } from 'utils/getColors';

// ==============================|| ACQUISITION-CHANNELS CHART ||============================== //


const AcquisitionChart = () => {
  const theme = useTheme();
  const line = theme.palette.divider;
  const { primary, secondary } = theme.palette.text;

  const { mode } = useConfig();

  // chart options
  const barChartOptions = {
    chart: {
      type: 'bar',
      height: 250,
      width: '100%',
      stacked: true,
      toolbar: {
        show: false
      }
    },
    xaxis: {
      categories: ['Centrafrique', 'Congo', 'Gabon', 'Guinée-Equatoriale','Tchad'],
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        show: true
      }
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        show: false
      }
    },
    tooltip: {
      x: {
        show: false
      }
    },
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'left',
      offsetX: 10,
      markers: {
        width: 8,
        height: 8,
        radius: '50%'
      }
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      show: false
    },
    stroke: {
      colors: ['transparent'],
      width: 1
    }
  };

  const [options, setOptions] = useState(barChartOptions);
  const [series] = useState([
    {
      name: 'Porcin',
      data: [21, 17, 15, 13, 15]
    },
    {
      name: 'Bovin',
      data: [28, 30, 20, 26, 18]
    },
    {
      name: 'Canard',
      data: [50, 51, 60, 54, 53]
    }, {
      name: 'Chevre',
      data: [50, 51, 60, 54, 53]
    }, {
      name: 'Coq',
      data: [50, 51, 60, 54, 53]
    },
    {
      name: 'Porcin',
      data: [21, 17, 15, 13, 15]
    },
    {
      name: 'Bovin',
      data: [28, 30, 20, 26, 18]
    },
    {
      name: 'Canard',
      data: [50, 51, 60, 54, 53]
    }, {
      name: 'Chevre',
      data: [50, 51, 60, 54, 53]
    }, {
      name: 'Coq',
      data: [50, 51, 60, 54, 53]
    }
  ]);
  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: tabColor,
      theme: {
        mode: mode === ThemeMode.DARK ? 'dark' : 'light'
      },
      legend: {
        labels: {
          colors: 'grey.500'
        }
      }
    }));
  }, [mode, primary, secondary, line, theme]);

  return <ReactApexChart options={options} series={series} type="bar" height={250} />;
};

export default AcquisitionChart;
