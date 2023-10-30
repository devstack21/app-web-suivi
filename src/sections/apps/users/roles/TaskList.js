// TaskList.jsx

// material-ui
import { CardContent, Checkbox, FormControlLabel, Grid, Tooltip } from '@mui/material';

// project imports
import MainCard from 'components/MainCard';

// assets
import { PlusCircleOutlined } from '@ant-design/icons';
import IconButton from 'components/@extended/IconButton';
import { FormattedMessage } from 'react-intl';

// ===========================|| DATA WIDGET - TODO LIST ||=========================== //

const TaskList = ({ availableModule, setSelectedModule, selectedModule }) => {


  // Handle checkbox change
  const handleCheckboxChange = (item) => {
    const isSelected = selectedModule.some((selectedItem) => selectedItem.id === item.id);

    if (isSelected) {
      // If already selected, remove from the list
      setSelectedModule((prevSelectedTab) => prevSelectedTab.filter((selectedItem) => selectedItem.id !== item.id));
    } else {
      // If not selected, add to the list
      setSelectedModule((prevSelectedTab) => [...prevSelectedTab, { ...item, module_id :availableModule.id }]);
    }
  };


  return (
    <MainCard
      title={<FormattedMessage id='task-list' />}
      content={false}
      secondary={
        <Tooltip title={<FormattedMessage id='task-list' />}>
          <IconButton>
            <PlusCircleOutlined />
          </IconButton>
        </Tooltip>
      }
      sx={{ '& .MuiCardHeader-root': { p: 1.75 } }}
    >
      <CardContent>
        <Grid container spacing={0} >
          {availableModule?.taches?.map((task) => (
            <Grid item xs={12} key={task.id}>
              <FormControlLabel
                control={
                  <Checkbox
                    name={task.id}
                    color="primary"
                    checked={selectedModule?.some((selectedItem) => selectedItem.id === task.id)}
                    onChange={() => handleCheckboxChange(task)}
                  />
                }
                label={task.libelle}
              />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </MainCard>
  );
};


export default TaskList;
