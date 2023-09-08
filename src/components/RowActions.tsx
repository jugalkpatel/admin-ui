import { Button } from "@/components/ui/button";
import { PenSquare } from "lucide-react";
import Modal from "@/components/Modal";
import { Row } from "@tanstack/react-table";
import { Member, useAppContext } from "@/contexts/AppProvider";
import useModal from "@/hooks/useModal";
import EditRow from "@/components/EditRow";
import DeleteRow from "@/components/DeleteRow";

type RowActionsProps = {
  row: Row<Member>;
};

export default function RowActions({ row }: RowActionsProps) {
  const { dispatch } = useAppContext();
  const {
    showModal: showEditModal,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useModal();

  return (
    <>
      <div className="flex gap-2">
        <Button variant="outline" size="icon" onClick={openEditModal}>
          <PenSquare className="h-4 w-4" />
        </Button>
        <DeleteRow id={row.original.id} />
      </div>
      <Modal
        open={showEditModal}
        title="Edit"
        handleCancel={closeEditModal}
        disableFooter={true}
      >
        <EditRow
          {...row.original}
          handleSubmit={(payload) => dispatch({ type: "UPDATE_ROW", payload })}
        />
      </Modal>
    </>
  );
}
