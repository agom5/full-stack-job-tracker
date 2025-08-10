export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  status: 'Applied' | 'Interviewing' | 'Offer' | 'Rejected';
  date_applied: string;
  owner_id: number;
}

export interface JobCreate {
  title: string;
  company: string;
  location?: string;
  status: 'Applied' | 'Interviewing' | 'Offer' | 'Rejected';
  date_applied: string;
}

export interface JobUpdate {
  title: string;
  company: string;
  location?: string;
  status: 'Applied' | 'Interviewing' | 'Offer' | 'Rejected';
  date_applied: string;
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  jobs: Job[];
}

export interface UserCreate {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface Token {
  access_token: string;
  token_type: string;
}

export interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isLoading: boolean;
}

export interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}
