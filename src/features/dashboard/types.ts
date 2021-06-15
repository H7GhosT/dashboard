export interface CardProps<T> {
  fromAdmin: Boolean;
  data: T;
  onEdit: () => void;
}
