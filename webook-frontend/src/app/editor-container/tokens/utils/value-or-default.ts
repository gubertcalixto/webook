export const valueOrDefault = (value?: any, defaultValue?: any) => {
  return typeof value === 'undefined'
    ? defaultValue
    : value;
}