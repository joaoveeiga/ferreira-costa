import { IModalProps, Modal as NativeBaseModal } from "native-base";
import { Text } from "./Text";

type ModalProps = IModalProps & {
  dismiss: () => void;
  title: string;
};

export const Modal = ({ dismiss, children, title, ...rest }: ModalProps) => {
  return (
    <NativeBaseModal {...rest}>
      <NativeBaseModal.Content maxWidth="400px">
        <NativeBaseModal.CloseButton onPress={dismiss} />
        <NativeBaseModal.Header>
          <Text bold fontSize={"lg"}>{title}</Text>
        </NativeBaseModal.Header>
        <NativeBaseModal.Body>{children}</NativeBaseModal.Body>
      </NativeBaseModal.Content>
    </NativeBaseModal>
  );
};
