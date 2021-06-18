import { ModalProps } from "ebs-design/dist/components/organisms/Modal/Modal";
import { FormInstance } from "ebs-design";
import { ReactNode } from "react";

export interface ModalFormProps<T> extends Omit<ModalProps, "children"> {
  form: FormInstance<T>;
  open: boolean;
  title: string;
  bottom: ReactNode;
}
