export interface CardProps<T> {
  data: T;
  onEdit: () => void;
  afterDelete?: () => void;
}
