export interface loan {
  user_id: number;
  amount?: number;
  term?: number;
  installment?: number;
  date: Date;
  target_id: number;
  rate: number;
}
