export const responseSuccess = (data: any, result: boolean) => {
  return {
    status: result,
    data: data,
  };
};

export const responseError = (message: string, result: boolean) => {
  return {
    status: result,
    message: message,
  };
};
