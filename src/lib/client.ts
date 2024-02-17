export const waitFor = async (time: number = 1000) => {
  return new Promise((res) =>
    setTimeout(() => {
      res(true);
    }, time)
  );
};
