import classes from "@components/ModalSection/ModalSection.module.css";
import ReactDOM from "react-dom";

export default function ModalSection({ ...props }) {
  return ReactDOM.createPortal(
    <dialog
      open={props.open}
      className={classes.modal}
      onClick={() => props.setModal((m) => !m)}
    >
      <div
        className={classes.message}
        onClick={() => props.setModal((m) => !m)}
      >
        <div>
          <div className={classes.center}>
            <section className={classes.keySection}>
              <div className={classes.center}>
                <p className={classes.saple}>Enter</p>
              </div>
              <div className={classes.center}>
                <p className={classes.saple}>1</p>
                <p className={classes.saple}>2</p>
                <p className={classes.saple}>3</p>
              </div>
              <div className={classes.center}>
                <p className={classes.saple}>Q</p>
                <p className={classes.saple}>W</p>
                <p className={classes.saple}>E</p>
              </div>
              <div className={classes.center}>
                <p className={classes.saple}>=</p>
              </div>
              <div className={classes.center}>
                <p className={classes.saple}>Backspace</p>
              </div>
            </section>
            <section className={classes.textSection}>
              <div className={classes.center}>
                <p className={classes.text}>Действие / Сл. окно</p>
              </div>
              <div className={classes.center}>
                <p className={classes.text}>Повышение счёта комманд</p>
              </div>
              <div className={classes.center}>
                <p className={classes.text}>Понижение счёта комманд</p>
              </div>
              <div className={classes.left}>
                <p className={classes.text}>Показать ответ</p>
              </div>
              <div className={classes.left}>
                <p className={classes.text}>Нет верного ответа</p>
              </div>
            </section>
          </div>

          <div
            className={classes.checkboxText}
            onClick={() => props.setButtonVisibility((bv) => !bv)}
            style={{ cursor: "pointer" }}
          >
            <input
              className={classes.checkbox}
              style={{ cursor: "pointer" }}
              type="checkbox"
              checked={props.buttonVisibility}
              onChange={() => {}}
            />
            Показывать кнопки
          </div>
        </div>
      </div>
    </dialog>,
    document.body
  );
}
