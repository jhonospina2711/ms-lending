export const success = (data: any, result: boolean) => {
  return {
    success: result,
    data: data,
  };
};
