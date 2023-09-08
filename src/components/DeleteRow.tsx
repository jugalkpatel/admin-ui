import { useAppContext } from "@/contexts/AppProvider";
import useModal from "@/hooks/useModal";
import { Button } from "@/components/ui/button";
import Modal from "@/components/Modal";
import { Trash } from "lucide-react";
export default function DeleteRow({ id }: { id: string }) {
  const { dispatch } = useAppContext();
  const {
    showModal: showDeleteModal,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();

  const handleSubmit = () => {
    dispatch({ type: "DELETE_ROW", payload: [id] });
    closeDeleteModal();
  };

  return (
    <>
      <Button variant="outline" size="icon" onClick={openDeleteModal}>
        <Trash className="h-4 w-4" color="#ff0000" />
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
