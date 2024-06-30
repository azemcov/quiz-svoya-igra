import classes from "/src/components/EditRegularQSection/EditRegularQSection.module.css";
import Button from "/src/components/Button/Button.jsx";

export default function EditRegularQSection({
  editDefaultQ,
  setEditDefaultQ,
  editDefaultSuperQ,
  setEditDefaultSuperQ,
  setBoardCondition,
}) {
  return (
    <>
      <Button
        style={{ position: "absolute", top: "30px", left: "30px" }}
        onClick={() => {
          setBoardCondition("editor");
        }}
      >
        НАЗАД
      </Button>
    </>
  );
}
