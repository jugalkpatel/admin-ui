import { useState } from "react";
export default function useModal() {
  const [showModal, setModal] = useState(false);

  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  return { showModal, closeModal, openModal, setModal };
}
