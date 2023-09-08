import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type ModalProps = {
  open: boolean;
  triggerButton?: React.ReactNode;
  title?: string;
  description?: string;
  handleCancel: () => void;
  handleSubmit?: () => void;
  children?: React.ReactNode;
  disableFooter?: boolean;
  submitText?: string;
};
export default function Modal({
  title,
  description,
  open,
  handleCancel,
  children,
  handleSubmit,
  disableFooter = false,
  submitText = "Submit",
}: ModalProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          {title ? <AlertDialogTitle>{title}</AlertDialogTitle> : null}
          {description ? (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          ) : null}
        </AlertDialogHeader>
        {children}
        {!disableFooter && (
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => handleCancel()}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => handleSubmit?.()}>
              {submitText}
            </AlertDialogAction>
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
