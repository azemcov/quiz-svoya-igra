import classes from "/src/components/EditSection/EditSection.module.css";

export default function EditSection({
  editDefaultQ,
  setEditDefaultQ,
  editDefaultSuperQ,
  setEditDefaultSuperQ,
}) {
  function isQuestionOK(il, iq, rn) {
    if (typeof rn === "number") {
      let questionData = editDefaultQ[rn][il].line[iq];
      let { typeOfQuestion, question, linkQ, answer, typeOfAnswer, linkA } =
        questionData;
      let hasText = question !== "" && answer !== "";
      let validQuestionType = ["picture", "audio", "text"].includes(
        typeOfQuestion
      );
      let validAnswerType = ["picture", "audio", "text"].includes(typeOfAnswer);
      let hasLinkQ =
        typeOfQuestion === "picture" || typeOfQuestion === "audio"
          ? linkQ !== ""
          : true;
      let hasLinkA =
        typeOfAnswer === "picture" || typeOfAnswer === "audio"
          ? linkA !== ""
          : true;
      let isValid =
        hasText && validQuestionType && validAnswerType && hasLinkQ && hasLinkA;
      return isValid ? classes.green : classes.red;
    } else {
      let questionData = editDefaultSuperQ[iq];
      let {
        theme,
        typeOfQuestion,
        question,
        linkQ,
        answer,
        typeOfAnswer,
        linkA,
      } = questionData;
      let hasTheme = theme !== "";
      let hasText = question !== "" && answer !== "";
      let validQuestionType = ["picture", "audio", "text"].includes(
        typeOfQuestion
      );
      let validAnswerType = ["picture", "audio", "text"].includes(typeOfAnswer);
      let hasLinkQ =
        typeOfQuestion === "picture" || typeOfQuestion === "audio"
          ? linkQ !== ""
          : true;
      let hasLinkA =
        typeOfAnswer === "picture" || typeOfAnswer === "audio"
          ? linkA !== ""
          : true;
      let isValid =
        hasTheme &&
        hasText &&
        validQuestionType &&
        validAnswerType &&
        hasLinkQ &&
        hasLinkA;
      return isValid ? classes.green : classes.red;
    }
  }
  return (
    <>
      <img
        style={{
          height: "20%",
          position: "absolute",
          right: "80px",
          bottom: "40px",
        }}
        src="https://getfile.dokpub.com/yandex/get/https://disk.yandex.ru/i/82Mg16QYi3UO_g"
        alt=""
      />
      <div className={classes.center} style={{ gap: "30px", height: "70%" }}>
        <div
          className={classes.center}
          style={{ flexDirection: "column", height: "100%" }}
        >
          <p className={classes.center}>Вопросы первого раунда</p>
          {Array.from({ length: 6 }).map((_, il) => (
            <div className={classes.center}>
              <input
                className={classes.input}
                type="text"
                defaultValue={editDefaultQ[0][il].theme}
                placeholder={`Название темы ${il + 1}`}
                onChange={(e) => {
                  e.target.value;
                }}
              ></input>
              {Array.from({ length: 7 }).map((_, iq) => (
                <button className={isQuestionOK(il, iq, 0)}>{iq + 1}</button>
              ))}
            </div>
          ))}
        </div>
        <div
          className={classes.center}
          style={{ flexDirection: "column", height: "100%" }}
        >
          <p className={classes.center}>Вопросы второго раунда</p>
          {Array.from({ length: 6 }).map((_, il) => (
            <div className={classes.center}>
              <input
                className={classes.input}
                type="text"
                defaultValue={""}
                placeholder={`Название темы ${il + 7}`}
                onChange={(e) => {
                  e.target.value;
                }}
              ></input>
              {Array.from({ length: 7 }).map((_, iq) => (
                <button className={isQuestionOK(il, iq, 1)}>{iq + 1}</button>
              ))}
            </div>
          ))}
        </div>
      </div>
      <p className={classes.center}>Вопросы супер игры</p>
      <div className={classes.center}>
        {Array.from({ length: 7 }).map((_, iq) => (
          <button className={isQuestionOK(undefined, iq, "final")}>
            {iq + 1}
          </button>
        ))}
      </div>
    </>
  );
}
