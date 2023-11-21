export const validateChecksumDigits = (cpf: string) => {
  const cpfNumbers = cpf.replace(/\D/g, '');

  let sum = 0;
  for (let i = 10; i > 1; i--) {
    sum += parseInt(cpfNumbers.charAt(10 - i)) * i;
  }
  let remainder = sum % 11;
  const checksumDigit1 = remainder < 2 ? 0 : 11 - remainder;

  sum = 0;
  for (let i = 11; i > 1; i--) {
    sum += parseInt(cpfNumbers.charAt(11 - i)) * i;
  }
  remainder = sum % 11;
  const checksumDigit2 = remainder < 2 ? 0 : 11 - remainder;

  return (
    parseInt(cpfNumbers.charAt(9)) === checksumDigit1 &&
    parseInt(cpfNumbers.charAt(10)) === checksumDigit2
  );
};

