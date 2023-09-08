import { useAppContext } from "@/contexts/AppProvider";
import useModal from "@/hooks/useModal";
import { Button } from "@/components/ui/button";
import Modal from "@/components/Modal";
import { Trash } from "lucide-react";

type DeleteSelectedRows = {
  ids: string[];
  reset: () => void;
};
export default function DeleteSelectedRows({ ids, reset }: DeleteSelectedRows) {
  const { dispatch } = useAppContext();
  const {
    showModal: showDeleteModal,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();

  const isDisable = !ids.length;

  const handleSubmit = () => {
    dispatch({ type: "DELETE_ROW", payload: ids });
    reset();
    closeDeleteModal();
  };

  return (
    <>
      <Button
        variant="destructive"
        size="icon"
        onClick={openDeleteModal}
        disabled={isDisable}
      >
        <Trash className="h-4 w-4" color="#fff" />
      </Button>
      <Modal
        open={showDeleteModal}
        title="Are you sure you want to delete this row?"
        submitText="Delete"
        handleCancel={closeDeleteModal}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
