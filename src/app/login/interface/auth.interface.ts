export interface AuthResponse {
  token: string;
  message: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  message: boolean;
}

export interface User {
  idUser: number;
  email: string;
  password?: string;
  role: UserRole;
  deleteFlag: boolean;
  temporaryPassword: boolean;
}

export interface UserDTO {
  idUser: number;
  email?: string;
  role?: UserRole;
  deleteFlag?: boolean;
  temporaryPassword?: boolean;
  passwordReset?: boolean;
  employee?: Employee;
}

export interface Employee {
  idEmployee: number;
  firstName: string;
  lastName: string;
  cf?: string;
  address?: string;
  birthDate?: string;
  birthPlace?: string;
  registrationDate?: string;
  personalPhoneNumber?: string;
  companyPhoneNumber?: string;
  personalEmail?: string;
  companyEmail?: string;
}


export enum EMPLOYEE_ROLE {
  AMMINISTRAZIONE = 'AMMINISTRAZIONE',
  COMMERCIALE = 'COMMERCIALE',
  DIPENDENTE = 'DIPENDENTE',
  ACADEMY = 'ACADEMY',
  P_IVA = 'P_IVA',
  EX_DIPENDENTE = 'EX_DIPENDENTE'
}

export enum UserRole {
  ADMIN = "ADMIN",
  AMMINISTRAZIONE = "AMMINISTRAZIONE",
  COMMERCIALE = "COMMERCIALE",
  SUPPORTO_SPECIAL = "SUPPORTO_SPECIAL",
  OPERATORE = "OPERATORE",
  HR = "HR",
  SUPPORTO = "SUPPORTO",
  USER = "USER"
}
