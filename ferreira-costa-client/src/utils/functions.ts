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

export const formatDate = (date: string | Date) => {
  const _date = new Date(date)
  return `${String(_date.getDay()).padStart(2, '0')}/${String(_date.getMonth() + 1).padStart(2, '0')}/${_date.getFullYear()}`
}

export const applyPhoneMask = (value: string) => {
  if (value)
    return value
      .replace(/\D/g, '')
      .replace(/^(\d\d)(\d)/g, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
  return value
}

export const applyCpfMask = (value: string) => {
  if (value)
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  return value
}

export const removeMask = (value: string) => value ? value.replace(/\D/g, '') : value