export const currentDate = () => {
  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };
  const today = new Date();
  //@ts-ignore
  return new Intl.DateTimeFormat('en-US', options).format(today);
};
