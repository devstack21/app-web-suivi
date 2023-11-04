import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { useMediaQuery, Box, Checkbox, FormControl, FormControlLabel, FormGroup, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import { ThemeMode } from 'config';
import useConfig from 'hooks/useConfig';

// third-party
import ReactApexChart from 'react-apexcharts';

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
            columnWidth: '30%',
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
          // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
          categories: ['Littoral', 'Centre', 'Extreme-Nord', 'Nord', 'Adamaoua', 'Ouest', 'Nord-Ouest', 'Sud-Ouest','Sud', 'Est']
        },
        yaxis: {
          title: {
            text: '' //$ (thousands)
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter(val) {
              return ` ${val}`;
            }
          }
        },
        legend: {
          show: false
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

// ==============================|| SALES COLUMN CHART ||============================== //

const SalesChart = ({dataRegion}) => {
  const theme = useTheme();
  const { mode } = useConfig();

  const [legend, setLegend] = useState({
    income: true,
    cos: true
  });
  const [effAvList, setEffAvList] = useState([]);
  const [effApList, setEffApList] = useState([]);
  const [lastObject, setLastObject] = useState();
  


  useEffect(() => {
    const region_r = dataRegion ? dataRegion.slice(0, -1).map(item => item.name): [];
    const effectif_avant = dataRegion ? dataRegion.slice(0, -1).map(item => item.eff_emb1): [];
    const effectif_apres = dataRegion ? dataRegion.slice(0, -1).map(item => item.eff_emb2): [];
    const lastObject = dataRegion[dataRegion.length - 1];
    setLastObject(lastObject)
    
    setEffAvList(effectif_avant)
    setEffApList(effectif_apres)
    
    // Mettez à jour les options ici
    setOptions(prevOptions => ({
      ...prevOptions,
      xaxis: {
        categories: region_r
      }
    }));
  

  }, [dataRegion]);

  const { income, cos } = legend;

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const warning = theme.palette.warning.main;
  const primaryMain = theme.palette.primary.main;
  const successDark = theme.palette.success.dark;

  const initialSeries = [
    {
      name: 'Avant',
      data: effAvList, //[180, 90, 135, 114, 120, 145]
    },
    {
      name: 'Apres',
      data: effApList, //[120, 45, 78, 150, 168, 99]
    }
  ];

  const [series, setSeries] = useState(initialSeries);

  const handleLegendChange = (event) => {
    setLegend({ ...legend, [event.target.name]: event.target.checked });
  };

  const xsDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [options, setOptions] = useState(columnChartOptions);

  useEffect(() => {
    if (income && cos) {
      setSeries(initialSeries);
    } else if (income) {
      setSeries([
        {
          name: 'Avant',
          data: effAvList, //[180, 90, 135, 114, 120, 145]
        }
      ]);
    } else if (cos) {
      setSeries([
        {
          name: 'Apres',
          data: effApList, //[120, 45, 78, 150, 168, 99]
        }
      ]);
    } else {
      setSeries([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [income, cos, effApList, effAvList]);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: !(income && cos) && cos ? [primaryMain] : [warning, primaryMain],
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
      plotOptions: {
        bar: {
          columnWidth: xsDown ? '60%' : '30%'
        }
      }
    }));
  }, [mode, primary, secondary, line, warning, primaryMain, successDark, income, cos, xsDown]);

  return (
    <MainCard sx={{ mt: 1 }} content={false}>
      <Box sx={{ p: 2.5, pb: 0 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack spacing={1.5}>
            <Typography variant="h6" color="secondary">
              Effectif avant - apres
            </Typography>
            {lastObject? <Typography variant="h4">{lastObject['total']['som_total1']} - {lastObject['total']['som_total2']}</Typography>
            :
            <Typography variant="h4">0</Typography>}
            
          </Stack>
          <FormControl component="fieldset">
            <FormGroup row>
              <FormControlLabel
                control={<Checkbox color="warning" checked={income} onChange={handleLegendChange} name="income" />}
                label="Avant"
              />
              <FormControlLabel control={<Checkbox checked={cos} onChange={handleLegendChange} name="cos" />} label="Apres" />
            </FormGroup>
          </FormControl>
        </Stack>
        <Box id="chart" sx={{ bgcolor: 'transparent' }}>
          <ReactApexChart options={options} series={series} type="bar" height={360} />
        </Box>
      </Box>
    </MainCard>
  );
};

export default SalesChart;
