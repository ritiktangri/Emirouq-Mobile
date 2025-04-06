const CheckValidation = ({ isValid, children }: any) => {
  if (!isValid) return;

  return { children };
};

export default CheckValidation;
