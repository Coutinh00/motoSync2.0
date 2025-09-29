// Validações para formulários

// Validação de email
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return {
    isValid: emailRegex.test(email),
    message: emailRegex.test(email) ? '' : 'Email inválido'
  };
};

// Validação de senha
export const validatePassword = (password) => {
  const minLength = 6;
  return {
    isValid: password.length >= minLength,
    message: password.length >= minLength ? '' : `Senha deve ter pelo menos ${minLength} caracteres`
  };
};

// Validação de CPF
export const validateCPF = (cpf) => {
  // Remove caracteres não numéricos
  const cleanCPF = cpf.replace(/\D/g, '');
  
  if (cleanCPF.length !== 11) {
    return { isValid: false, message: 'CPF deve ter 11 dígitos' };
  }

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cleanCPF)) {
    return { isValid: false, message: 'CPF inválido' };
  }

  // Validação do algoritmo do CPF
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.charAt(9))) {
    return { isValid: false, message: 'CPF inválido' };
  }

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.charAt(10))) {
    return { isValid: false, message: 'CPF inválido' };
  }

  return { isValid: true, message: '' };
};

// Validação de telefone
export const validatePhone = (phone) => {
  const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
  return {
    isValid: phoneRegex.test(phone),
    message: phoneRegex.test(phone) ? '' : 'Telefone deve estar no formato (XX) XXXXX-XXXX'
  };
};

// Validação de placa de veículo
export const validatePlate = (plate) => {
  const plateRegex = /^[A-Z]{3}-\d{4}$/;
  return {
    isValid: plateRegex.test(plate.toUpperCase()),
    message: plateRegex.test(plate.toUpperCase()) ? '' : 'Placa deve estar no formato ABC-1234'
  };
};

// Validação de chassis
export const validateChassis = (chassis) => {
  const minLength = 10;
  return {
    isValid: chassis.length >= minLength,
    message: chassis.length >= minLength ? '' : `Chassis deve ter pelo menos ${minLength} caracteres`
  };
};

// Validação de RFID
export const validateRFID = (rfid) => {
  const minLength = 8;
  return {
    isValid: rfid.length >= minLength,
    message: rfid.length >= minLength ? '' : `RFID deve ter pelo menos ${minLength} caracteres`
  };
};

// Validação de campo obrigatório
export const validateRequired = (value, fieldName) => {
  return {
    isValid: value.trim().length > 0,
    message: value.trim().length > 0 ? '' : `${fieldName} é obrigatório`
  };
};

// Validação de comprimento mínimo
export const validateMinLength = (value, minLength, fieldName) => {
  return {
    isValid: value.length >= minLength,
    message: value.length >= minLength ? '' : `${fieldName} deve ter pelo menos ${minLength} caracteres`
  };
};

// Validação de comprimento máximo
export const validateMaxLength = (value, maxLength, fieldName) => {
  return {
    isValid: value.length <= maxLength,
    message: value.length <= maxLength ? '' : `${fieldName} deve ter no máximo ${maxLength} caracteres`
  };
};

// Validação de número
export const validateNumber = (value, fieldName) => {
  const isNumber = !isNaN(value) && !isNaN(parseFloat(value));
  return {
    isValid: isNumber,
    message: isNumber ? '' : `${fieldName} deve ser um número válido`
  };
};

// Validação de email único (para verificar se email já existe)
export const validateUniqueEmail = async (email, currentUserId = null) => {
  // Esta função seria implementada com uma chamada à API
  // Por enquanto, retorna sempre válido
  return {
    isValid: true,
    message: ''
  };
};

// Validação de placa única (para verificar se placa já existe)
export const validateUniquePlate = async (plate, currentMotoId = null) => {
  // Esta função seria implementada com uma chamada à API
  // Por enquanto, retorna sempre válido
  return {
    isValid: true,
    message: ''
  };
};

// Validação completa de usuário
export const validateUser = async (userData) => {
  const errors = {};

  // Nome
  const nameValidation = validateRequired(userData.name, 'Nome');
  if (!nameValidation.isValid) {
    errors.name = nameValidation.message;
  }

  // Email
  const emailValidation = validateEmail(userData.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.message;
  }

  // CPF
  if (userData.cpf) {
    const cpfValidation = validateCPF(userData.cpf);
    if (!cpfValidation.isValid) {
      errors.cpf = cpfValidation.message;
    }
  }

  // Telefone
  if (userData.phone) {
    const phoneValidation = validatePhone(userData.phone);
    if (!phoneValidation.isValid) {
      errors.phone = phoneValidation.message;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Validação completa de moto
export const validateMoto = async (motoData) => {
  const errors = {};

  // Placa
  const plateValidation = validatePlate(motoData.plate);
  if (!plateValidation.isValid) {
    errors.plate = plateValidation.message;
  }

  // Modelo
  const modelValidation = validateRequired(motoData.model, 'Modelo');
  if (!modelValidation.isValid) {
    errors.model = modelValidation.message;
  }

  // Chassis
  const chassisValidation = validateChassis(motoData.chassis);
  if (!chassisValidation.isValid) {
    errors.chassis = chassisValidation.message;
  }

  // RFID
  const rfidValidation = validateRFID(motoData.rfid);
  if (!rfidValidation.isValid) {
    errors.rfid = rfidValidation.message;
  }

  // Status
  const statusValidation = validateRequired(motoData.status, 'Status');
  if (!statusValidation.isValid) {
    errors.status = statusValidation.message;
  }

  // Localização
  const locationValidation = validateRequired(motoData.location, 'Localização');
  if (!locationValidation.isValid) {
    errors.location = locationValidation.message;
  }

  // Filial
  const filialValidation = validateRequired(motoData.filial, 'Filial');
  if (!filialValidation.isValid) {
    errors.filial = filialValidation.message;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Validação de login
export const validateLogin = (email, password) => {
  const errors = {};

  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.message;
  }

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.message;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export default {
  validateEmail,
  validatePassword,
  validateCPF,
  validatePhone,
  validatePlate,
  validateChassis,
  validateRFID,
  validateRequired,
  validateMinLength,
  validateMaxLength,
  validateNumber,
  validateUniqueEmail,
  validateUniquePlate,
  validateUser,
  validateMoto,
  validateLogin
};
