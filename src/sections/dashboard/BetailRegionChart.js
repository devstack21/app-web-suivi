import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// project import
import { ThemeMode } from 'config';
import useConfig from 'hooks/useConfig';

// third-party
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { REQUEST_STATUS } from 'utils/apiConfig';

// chart options
const columnChartOptions = {
  chart: {
    type: 'bar',
    height: 430,
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '50%',
      borderRadius: 4
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 8,
    colors: ['transparent']
  },
  xaxis: {
    categories: ['Adamaou', 'Centre', 'Est/East', 'Extrême-Nord/Far North ',
      'Littoral', 'Nord/North', 'Nord-Ouest/Northwest ', 'Ouest/West', 'Sud/South', 'Sud-Ouest/Southwest']
  },
  yaxis: {
    title: {
      text: 'Effectif'
    }
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

function generateResult(regions, tab_values) {
  if (tab_values?.length === 0) {
    // If tab_current_period is empty, return an array of 10 zeros
    return new Array(10).fill(0);
  }
  const effectifEmbarqueDict = tab_values?.reduce((acc, entry) => {
    acc[entry.region_approvisionement] = entry.effectif_embarque;
    return acc;
  }, {});

  const result = regions.map(region => effectifEmbarqueDict[region.name] || 0);

  return result;
}

// ==============================|| SALES COLUMN CHART ||============================== //

const ApproBetailRegionChart = ({visitor}) => {
  const theme = useTheme();
  const { mode, fontFamily } = useConfig();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const warning = theme.palette.warning.main;
  const primaryMain = theme.palette.primary.main;
  const successDark = theme.palette.success.dark;

  const { result } = useSelector((state) => visitor ? state.visitor.supply : state.dashboard.supply);
  const { regionTab, status } = useSelector((state) => state.location.region);


  const [options, setOptions] = useState(columnChartOptions);
  const [series, setSeries] = useState([]);
  

  useEffect(() => {
    if (status == REQUEST_STATUS.succeed) {

      const tab_now = generateResult(regionTab, result.approvisionement.tab);
      const tab_prev = generateResult(regionTab, result.approvisionement.tab_prev_period);
  
      setSeries([
        {
          name: `${(new Date(result?.date?.now?.debut)).toDateString() } - ${(new Date(result?.date?.now?.fin)).toDateString() }`,
          data: tab_now
        },
        {
          name: 'Période précédente',
          data: tab_prev
        }
      ])
    }
   

  }, [status])

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [warning, primaryMain],
      xaxis: {
        labels: {
          style: {
            colors: [secondary, secondary, secondary, secondary, secondary, secondary]
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary]
          }
        }
      },
      grid: {
        borderColor: line
      },
      theme: {
        mode: mode === ThemeMode.DARK ? 'dark' : 'light'
      },
      legend: {
        fontFamily,
        position: 'top',
        horizontalAlign: 'right',
        labels: {
          colors: 'grey.500'
        }
      }
    }));
  }, [mode, primary, secondary, line, warning, primaryMain, successDark, fontFamily]);

  return (
    <Box id="chart" sx={{ bgcolor: 'transparent' }}>
      <ReactApexChart options={options} series={series} type="bar" height={430} />
    </Box>
  );
};

export default ApproBetailRegionChart;
