import classes from "/src/components/modal/ModalQuestion.module.css";
import { createPortal } from "react-dom";

export default function ModalQuestion({ children, ...props }) {
  return createPortal(
    <dialog {...props} className={classes.question}>
      {children}
    </dialog>,
    document.body
  );
}
