export interface Foto {
  id: number;
  nome: string;
  contentType: string;
  url: string;
}

export interface Pet {
  id: number;
  nome: string;
  raca: string;
  idade: number;
  foto?: Foto;
}

export interface Tutor {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  cpf: number;
  foto?: Foto;
}

export interface PetWithTutor extends Pet {
  tutores?: Tutor[];
}

export interface TutorWithPets extends Tutor {
  pets?: Pet[];
}

export interface PaginatedResponse<T> {
  page: number;
  size: number;
  total: number;
  pageCount: number;
  content: T[];
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refresh_expires_in: number;
}

export interface LoginCredentials {
  username: string;
  password: string;
}
