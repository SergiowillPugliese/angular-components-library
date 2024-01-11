export interface GenericResponse<T> {
  status: number;
  result: T;
  error?: string;
  message?: string;
}
