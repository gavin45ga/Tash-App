export const getDaysOpen = daysArray => {
  daysOpenString = '';
  if (daysArray && daysArray.length > 0) {
    daysArray.forEach(element => {
      switch (element.toLowerCase()) {
        case 'sunday':
          daysOpenString = daysOpenString.concat('S|');
          break;
        case 'monday':
          daysOpenString = daysOpenString.concat('M|');
          break;
        case 'tuesday':
          daysOpenString = daysOpenString.concat('T|');
          break;
        case 'wedensday':
          daysOpenString = daysOpenString.concat('W|');
          break;
        case 'thursday':
          daysOpenString = daysOpenString.concat('T|');
          break;
        case 'friday':
          daysOpenString = daysOpenString.concat('F|');
          break;
        case 'saturday':
          daysOpenString = daysOpenString.concat('S|');
          break;
        default:
          daysOpenString = daysOpenString.concat('');
      }
    });
    return daysOpenString.slice(0, daysOpenString.length - 1);
  }
  return daysOpenString;
};
