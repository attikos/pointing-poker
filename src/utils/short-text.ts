export const shortText = (text:string, count = 12):string => {
  let result = text;

  if ( (text.length + 1) > count ) {
    result = text.slice(0, count) + '...';
  }

  return result;
};
