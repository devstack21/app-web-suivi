// project import
import applications from './applications';
import widget from './widget';
import formsTables from './forms-tables';
import chartsMap from './charts-map';
import other from './other';
import pages from './pages';
import itineraire from './minepia/itineraire';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [itineraire, widget, applications, formsTables, chartsMap, pages, other]
};

export default menuItems;
