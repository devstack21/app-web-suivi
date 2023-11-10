// ==============================|| CUSTOM FUNCTION - COLORS ||============================== //

const getColors = (theme, color) => {
  switch (color) {
    case 'secondary':
      return theme.palette.secondary;
    case 'error':
      return theme.palette.error;
    case 'warning':
      return theme.palette.warning;
    case 'info':
      return theme.palette.info;
    case 'success':
      return theme.palette.success;
    default:
      return theme.palette.primary;
  }
};

export const tabColor = [
  '#FF6347', // Tomato
  '#32CD32', // Lime Green
  '#1E90FF', // Dodger Blue
  '#9932CC', // Dark Orchid
  '#FFD700', // Gold
  '#20B2AA', // Light Sea Green
  '#FF4500', // Orange Red
  '#00CED1', // Dark Turquoise
  '#8A2BE2', // Blue Violet
  '#FF69B4', // Hot Pink
  '#2F4F4F', // Dark Slate Gray
  '#FF8C00', // Dark Orange
  '#4682B4', // Steel Blue
  '#8B008B', // Dark Magenta
  '#228B22', // Forest Green
  '#DC143C', // Crimson
  '#BDB76B', // Dark Khaki
  '#556B2F', // Dark Olive Green
  '#9932CC', // Dark Orchid (repeated for variety)
  '#FF6347'  // Tomato (repeated for variety)
];


export default getColors;
