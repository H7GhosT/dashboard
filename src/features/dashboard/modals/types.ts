import { ModalProps } from "components/common/Modal";
import { Dispatch, ReactNode, SetStateAction } from "react";

export interface ModalFormProps<T> extends Omit<ModalProps, "children"> {
  top: ReactNode;
  bottom: ReactNode;
  data?: T;
  setData: Dispatch<SetStateAction<T | undefined>>;
}
