export interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  type: 'income' | 'expense';
  description: string;
  date: string;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
}

export interface News {
  id: string;
  title: string;
  content: string;
  url: string;
  published_at: string;
}

export interface SavingTip {
  id: string;
  title: string;
  content: string;
  created_at: string;
}