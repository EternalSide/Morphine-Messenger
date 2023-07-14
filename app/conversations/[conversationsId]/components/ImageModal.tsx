"use client";

import Modal from "@/app/components/Modal";
import Image from "next/image";

interface ImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  src?: string | null;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, src }) => {
  if (!src) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="max-w-[75%] h-96 max-h-[75%] ">
        <Image alt="Фото" className="" fill src={src} />
      </div>
    </Modal>
  );
};
export default ImageModal;
