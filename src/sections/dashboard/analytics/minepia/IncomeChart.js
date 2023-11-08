import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// project import
import { ThemeMode } from 'config';
import useConfig from 'hooks/useConfig';

// third-party
import ReactApexChart from 'react-apexcharts';

// chart options
const areaChartOptions = {
  chart: {
    height: 355,
    type: 'area',
    toolbar: {
      show: false
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      type: 'vertical',
      inverseColors: false,
      opacityFrom: 0.5,
      opacityTo: 0
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight',
    width: 1
  },
  grid: {
    show: true,
    borderColor: '#90A4AE',
    strokeDashArray: 0,
    position: 'back',
    xaxis: {
      lines: {
        show: true
      }
    },
    yaxis: {
      lines: {
        show: true
      }
    }
  }
};

// ==============================|| INCOME LINE CHART ||============================== //

const IncomeAreaChart = ({ slot, quantity, dataRegion }) => {
  const theme = useTheme();
  const { mode } = useConfig();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);
  const [villesList, setVillesList] = useState([]);
  const [effvillesList, setEffvillesList] = useState([]);
  
  
  useEffect(() => {
    
    
    const villesList_r = dataRegion.villes ? dataRegion.villes.map(ville => ville.name) : [];
    setVillesList(villesList_r)
    const effvillesList_r = dataRegion.villes ? dataRegion.villes.map(ville => ville.effectif) : [];
    setEffvillesList(effvillesList_r)
  }, [dataRegion]);


  useEffect(() => {
    
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.primary.main, theme.palette.primary[700]],
      xaxis: {
        categories:
          slot === 'month'
            ? villesList
            : villesList,
        labels: {
          style: {
            colors: [
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary
            ]
          }
        },
        axisBorder: {
          show: true,
          color: line
        },
        tickAmount: slot === 'month' ? 11 : 7
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
      tooltip: {
        y: {
          formatter(val) {
            return `$ ${val}`;
          }
        }
      },
      theme: {
        mode: mode === ThemeMode.DARK ? 'dark' : 'light'
      }
    }));
  }, [mode, primary, secondary, line, theme, slot, villesList]);

  const [series, setSeries] = useState([
    {
      name: 'Income',
      data: [0, 86, 28, 115, 48, 210, 136]
    }
  ]);

  useEffect(() => {
    setSeries([
      {
        name: 'Income',
        data: slot === 'month' ? effvillesList : effvillesList
      }
    ]);
    // switch (quantity) {
    //   case 'By volume':
    //     setSeries([
    //       {
    //         name: 'Income',
    //         data: slot === 'month' ? [100, 40, 60, 40, 40, 40, 80, 40, 40, 50, 40, 40] : [100, 20, 60, 20, 20, 80, 20]
    //       }
    //     ]);
    //     break;

    //   case 'By margin':
    //     setSeries([
    //       {
    //         name: 'Income',
    //         data: slot === 'month' ? [120, 85, 101, 98, 87, 105, 91, 114, 94, 86, 115, 35] : [51, 40, 28, 51, 42, 109, 100]
    //       }
    //     ]);
    //     break;
    //   case 'By sales':
    //     setSeries([
    //       {
    //         name: 'Income',
    //         data: slot === 'month' ? [90, 85, 101, 98, 87, 105, 91, 114, 94, 86, 115, 35] : [21, 40, 28, 51, 42, 109, 100]
    //       }
    //     ]);
    //     break;
    //   default:
    //     break;
    // }
  }, [slot, quantity, effvillesList]);

  return <ReactApexChart options={options} series={series} type="area" height={355} />;
};

IncomeAreaChart.propTypes = {
  slot: PropTypes.string,
  quantity: PropTypes.any
};

export default IncomeAreaChart;
