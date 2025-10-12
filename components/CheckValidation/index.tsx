const CheckValidation = ({ isValid, children }: { isValid: boolean; children: any }) => {
  if (!isValid) return;

  return children;
};

export default CheckValidation;
