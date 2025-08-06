// export const isEmpty = value => {
//   return (
//     (value && Array.isArray(value) ? value.length < 0 : Object.keys(value).length < 0) ||
//     value === null ||
//     value === undefined ||
//     value === ''
//   );
// };
export const isEmpty = value => {
  let condition = value === null || value === undefined;
  if (Array.isArray(value)) {
    condition = condition || value.length <= 0;
  } else if (value === {}) {
    condition = condition || true;
  } else {
    condition = condition || value === '';
  }
  return condition;
};
