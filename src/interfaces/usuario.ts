export interface LOGIN {
  id?: number;
  correo: string;
  password: string;
}

export interface REGISTER {
  id?: number;
  nombre: string;
  apellido: string;
  correo: string;
  password: string;
  confirmPassword: string;
  rol: string;
}
