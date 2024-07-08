import { useState, useEffect, useDebugValue } from "react";
import classes from "@components/EditQuestionSection/EditQuestionSection.module.css";
import Button from "@components/Button/Button.jsx";

export default function EditQuestionSection({
  editDefaultQ,
  setEditDefaultQ,
  editDefaultSuperQ,
  setEditDefaultSuperQ,
  setBoardCondition,
  EP,
  setEP,
}) {
  let [radioPropQ, setRadioPropQ] = useState(
    EP[0] !== "final"
      ? editDefaultQ[EP[0]][EP[1]].line[EP[2]].typeOfQuestion
      : editDefaultSuperQ[EP[2]].typeOfQuestion
  );
  let [radioPropA, setRadioPropA] = useState(
    EP[0] !== "final"
      ? editDefaultQ[EP[0]][EP[1]].line[EP[2]].typeOfAnswer
      : editDefaultSuperQ[EP[2]].typeOfAnswer
  );
  let [LinkQ, setLinkQ] = useState(
    EP[0] !== "final"
      ? editDefaultQ[EP[0]][EP[1]].line[EP[2]].linkQ
      : editDefaultSuperQ[EP[2]].linkQ
  );
  let [LinkA, setLinkA] = useState(
    EP[0] !== "final"
      ? editDefaultQ[EP[0]][EP[1]].line[EP[2]].linkA
      : editDefaultSuperQ[EP[2]].linkA
  );
  let [audioFile, setAudioFile] = useState("");
  let [plays, setPlays] = useState(false);
  let [cat, setCat] = useState(
    EP[0] !== "final" ? editDefaultQ[EP[0]][EP[1]].line[EP[2]].cat : false
  );

  useEffect(() => {
    if (plays) {
      const audio = new Audio(audioFile);

      function handleEnded() {
        setPlays(false);
      }
      audio.addEventListener("ended", handleEnded);
      audio.play();

      return () => {
        audio.pause();
        audio.currentTime = 0;
        setPlays(false);
        audio.removeEventListener("ended", handleEnded);
      };
    }
  }, [plays]);

  //Функция преобразует ссылку с яндекс диска
  // function validLink(link) {
  //   let YAtest = /https:\/\/disk\.yandex\.ru/.test(link);
  //   let getfileTest = /getfile\.dokpub\.com/.test(link);
  //   if (YAtest && getfileTest) {
  //     return link;
  //   } else if (YAtest) {
  //     return `https://getfile.dokpub.com/yandex/get/${link}`;
  //   } else {
  //     return link;
  //   }
  // }

  // Функция преобразует ссылку с google диска
  // function validLink(link) {
  //   const regex = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)\/view/;
  //   const match = link.match(regex);
  //   if (match) {
  //     return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  //   } else {
  //     return link;
  //   }
  // }

  // Функция преобразует ссылку с dropbox диска
  function validLink(link) {
    let DropBoxTest = /www\.dropbox\.com/.test(link);
    let DropBoxTest2 = /dl=0/.test(link);
    if (DropBoxTest && DropBoxTest2) {
      return link.substring(0, link.length - 1) + "1";
    } else {
      return link;
    }
  }

  // function validLink(link) {
  //   return link;
  // }

  return (
    <>
      <Button
        style={{ position: "absolute", top: "30px", left: "30px" }}
        onClick={() => {
          setBoardCondition("editor");
          setEP([undefined, undefined, undefined]);
        }}
      >
        НАЗАД
      </Button>
      <p className={classes.headText}>
        {EP[0] === "final"
          ? `Супер-вопрос № ${EP[2] + 1}`
          : `Раунд № ${EP[0] + 1}, тема: ${
              editDefaultQ[EP[0]][EP[1]].theme
            }, вопрос № ${EP[2] + 1}`}
      </p>
      <div className={`${classes.center} ${classes.section}`}>
        <div
          className={`${classes.center} ${classes.column} ${classes.section}`}
        >
          {EP[0] === "final" && (
            <>
              <input
                type="text"
                className={classes.input}
                defaultValue={editDefaultSuperQ[EP[2]].theme}
                placeholder={`Название темы`}
                onChange={(e) => {
                  setEditDefaultSuperQ(
                    (def) => ((def[EP[2]].theme = e.target.value), def)
                  );
                }}
              />
              <hr
                style={{
                  margin: 0,
                  width: "30vw",
                  border: "0.5px dashed gray",
                }}
              />
            </>
          )}

          {/* Кот в мешке */}
          {EP[0] !== "final" && (
            <div
              className={classes.checkboxText}
              onClick={() => {
                setEditDefaultQ(
                  (def) => (
                    (def[EP[0]][EP[1]].line[EP[2]].cat =
                      !def[EP[0]][EP[1]].line[EP[2]].cat),
                    setCat((i) => !i),
                    def
                  )
                );
              }}
            >
              <input
                className={classes.checkbox}
                type="checkbox"
                checked={editDefaultQ[EP[0]][EP[1]].line[EP[2]].cat}
                onChange={() => {}}
              />
              Кот в мешке
            </div>
          )}

          <form className={classes.left}>
            <div>
              {/* ВОПРОС переключатель ТЕКСТ */}
              <input
                type="radio"
                id="textQ"
                name="typeOfRadioQ"
                value="text"
                checked={radioPropQ === "text"}
                onChange={(e) => {
                  setPlays(false);
                  setLinkQ("");
                  EP[0] !== "final"
                    ? setEditDefaultQ(
                        (def) => (
                          (def[EP[0]][EP[1]].line[EP[2]].linkQ = ""), def
                        )
                      )
                    : setEditDefaultSuperQ(
                        (def) => ((def[EP[2]].linkQ = ""), def)
                      );
                  EP[0] !== "final"
                    ? setEditDefaultQ(
                        (def) => (
                          (def[EP[0]][EP[1]].line[EP[2]].typeOfQuestion =
                            "text"),
                          def
                        )
                      )
                    : setEditDefaultSuperQ(
                        (def) => ((def[EP[2]].typeOfQuestion = "text"), def)
                      );
                  setRadioPropQ(e.target.value);
                }}
              />
              <label htmlFor="textQ">Текстовый вопрос</label>
            </div>

            <div>
              {/* ВОПРОС переключатель КАРТИНКА */}
              <input
                type="radio"
                id="pictureQ"
                name="typeOfRadioQ"
                value="picture"
                checked={radioPropQ === "picture"}
                onChange={(e) => {
                  setPlays(false);
                  setLinkQ("");
                  EP[0] !== "final"
                    ? setEditDefaultQ(
                        (def) => (
                          (def[EP[0]][EP[1]].line[EP[2]].linkQ = ""), def
                        )
                      )
                    : setEditDefaultSuperQ(
                        (def) => ((def[EP[2]].linkQ = ""), def)
                      );

                  EP[0] !== "final"
                    ? setEditDefaultQ(
                        (def) => (
                          (def[EP[0]][EP[1]].line[EP[2]].typeOfQuestion =
                            "picture"),
                          def
                        )
                      )
                    : setEditDefaultSuperQ(
                        (def) => ((def[EP[2]].typeOfQuestion = "picture"), def)
                      );
                  setRadioPropQ(e.target.value);
                }}
              />
              <label htmlFor="pictureQ">Картинка-вопрос</label>
            </div>
            <div>
              {/* ВОПРОС переключатель АУДИО */}
              <input
                type="radio"
                id="audioQ"
                name="typeOfRadioQ"
                value="audio"
                checked={radioPropQ === "audio"}
                onChange={(e) => {
                  setPlays(false);
                  setLinkQ("");
                  EP[0] !== "final"
                    ? setEditDefaultQ(
                        (def) => (
                          (def[EP[0]][EP[1]].line[EP[2]].linkQ = ""), def
                        )
                      )
                    : setEditDefaultSuperQ(
                        (def) => ((def[EP[2]].linkQ = ""), def)
                      );
                  EP[0] !== "final"
                    ? setEditDefaultQ(
                        (def) => (
                          (def[EP[0]][EP[1]].line[EP[2]].typeOfQuestion =
                            "audio"),
                          def
                        )
                      )
                    : setEditDefaultSuperQ(
                        (def) => ((def[EP[2]].typeOfQuestion = "audio"), def)
                      );
                  setRadioPropQ(e.target.value);
                }}
              />
              <label htmlFor="audioQ">Аудио-вопрос</label>
            </div>
          </form>

          {/* Текстовое поле ВОПРОС */}
          <textarea
            className={`${classes.textarea} ${
              radioPropQ === "text" ? classes.bottomArea : ""
            }`}
            defaultValue={
              EP[0] === "final"
                ? editDefaultSuperQ[EP[2]].question
                : editDefaultQ[EP[0]][EP[1]].line[EP[2]].question
            }
            placeholder={`Вопрос`}
            onChange={(e) => {
              EP[0] === "final"
                ? setEditDefaultSuperQ(
                    (def) => ((def[EP[2]].question = e.target.value), def)
                  )
                : setEditDefaultQ(
                    (def) => (
                      (def[EP[0]][EP[1]].line[EP[2]].question = e.target.value),
                      def
                    )
                  );
            }}
          />

          {/* Всплывающая строка для ссылки на медиа-ВОПРОС */}
          {(radioPropQ === "picture" || radioPropQ === "audio") && (
            <input
              type="text"
              className={classes.input}
              value={LinkQ}
              placeholder={`Ссылка для ${
                radioPropQ === "picture"
                  ? "картинки-"
                  : radioPropQ === "audio"
                  ? "аудио-"
                  : "текстового "
              }вопроса`}
              onChange={(e) => {
                setLinkQ(validLink(e.target.value));
                EP[0] !== "final"
                  ? setEditDefaultQ(
                      (def) => (
                        (def[EP[0]][EP[1]].line[EP[2]].linkQ = validLink(
                          e.target.value
                        )),
                        def
                      )
                    )
                  : setEditDefaultSuperQ(
                      (def) => (
                        (def[EP[2]].linkQ = validLink(e.target.value)), def
                      )
                    );
              }}
            />
          )}
          {/* Линия между вопросами */}
          <hr
            style={{ margin: 0, width: "30vw", border: "0.5px dashed gray" }}
          />

          <form className={classes.left}>
            <div>
              {/* ОТВЕТ переключатель ТЕКСТ */}
              <input
                type="radio"
                id="textA"
                name="typeOfRadioA"
                value="text"
                checked={radioPropA === "text"}
                onChange={(e) => {
                  setPlays(false);
                  setLinkA("");
                  EP[0] !== "final"
                    ? setEditDefaultQ(
                        (def) => (
                          (def[EP[0]][EP[1]].line[EP[2]].linkA = ""), def
                        )
                      )
                    : setEditDefaultSuperQ(
                        (def) => ((def[EP[2]].linkA = ""), def)
                      );
                  EP[0] !== "final"
                    ? setEditDefaultQ(
                        (def) => (
                          (def[EP[0]][EP[1]].line[EP[2]].typeOfAnswer = "text"),
                          def
                        )
                      )
                    : setEditDefaultSuperQ(
                        (def) => ((def[EP[2]].typeOfAnswer = "text"), def)
                      );
                  setRadioPropA(e.target.value);
                }}
              />
              <label htmlFor="textA">Текстовый ответ</label>
            </div>

            <div>
              {/* ОТВЕТ переключатель КАРТИНКА */}
              <input
                type="radio"
                id="pictureA"
                name="typeOfRadioA"
                value="picture"
                checked={radioPropA === "picture"}
                onChange={(e) => {
                  setPlays(false);
                  setLinkA("");
                  EP[0] !== "final"
                    ? setEditDefaultQ(
                        (def) => (
                          (def[EP[0]][EP[1]].line[EP[2]].linkA = ""), def
                        )
                      )
                    : setEditDefaultSuperQ(
                        (def) => ((def[EP[2]].linkA = ""), def)
                      );
                  EP[0] !== "final"
                    ? setEditDefaultQ(
                        (def) => (
                          (def[EP[0]][EP[1]].line[EP[2]].typeOfAnswer =
                            "picture"),
                          def
                        )
                      )
                    : setEditDefaultSuperQ(
                        (def) => ((def[EP[2]].typeOfAnswer = "picture"), def)
                      );
                  setRadioPropA(e.target.value);
                }}
              />
              <label htmlFor="pictureA">Картинка-ответ</label>
            </div>
            <div>
              {/* ОТВЕТ переключатель АУДИО */}
              <input
                type="radio"
                id="audioA"
                name="typeOfRadioA"
                value="audio"
                checked={radioPropA === "audio"}
                onChange={(e) => {
                  setPlays(false);
                  setLinkA("");
                  EP[0] !== "final"
                    ? setEditDefaultQ(
                        (def) => (
                          (def[EP[0]][EP[1]].line[EP[2]].linkA = ""), def
                        )
                      )
                    : setEditDefaultSuperQ(
                        (def) => ((def[EP[2]].linkA = ""), def)
                      );
                  EP[0] !== "final"
                    ? setEditDefaultQ(
                        (def) => (
                          (def[EP[0]][EP[1]].line[EP[2]].typeOfAnswer =
                            "audio"),
                          def
                        )
                      )
                    : setEditDefaultSuperQ(
                        (def) => ((def[EP[2]].typeOfAnswer = "audio"), def)
                      );
                  setRadioPropA(e.target.value);
                }}
              />
              <label htmlFor="audioA">Аудио-ответ</label>
            </div>
          </form>

          {/* Текстовое поле ОТВЕТ */}
          <textarea
            className={`${classes.textarea} ${
              radioPropA === "text" ? classes.bottomArea : ""
            }`}
            defaultValue={
              EP[0] === "final"
                ? editDefaultSuperQ[EP[2]].answer
                : editDefaultQ[EP[0]][EP[1]].line[EP[2]].answer
            }
            placeholder={`Ответ`}
            onChange={(e) => {
              EP[0] === "final"
                ? setEditDefaultSuperQ(
                    (def) => ((def[EP[2]].answer = e.target.value), def)
                  )
                : setEditDefaultQ(
                    (def) => (
                      (def[EP[0]][EP[1]].line[EP[2]].answer = e.target.value),
                      def
                    )
                  );
            }}
          />

          {/* Всплывающая строка для ссылки на медиа-ОТВЕТ */}
          {(radioPropA === "picture" || radioPropA === "audio") && (
            <input
              type="text"
              className={classes.input}
              value={LinkA}
              placeholder={`Ссылка для ${
                radioPropA === "picture"
                  ? "картинки-"
                  : radioPropA === "audio"
                  ? "аудио-"
                  : "текстового "
              }ответа`}
              onChange={(e) => {
                setLinkA(validLink(e.target.value));
                EP[0] !== "final"
                  ? setEditDefaultQ(
                      (def) => (
                        (def[EP[0]][EP[1]].line[EP[2]].linkA = validLink(
                          e.target.value
                        )),
                        def
                      )
                    )
                  : setEditDefaultSuperQ(
                      (def) => (
                        (def[EP[2]].linkA = validLink(e.target.value)), def
                      )
                    );
              }}
            />
          )}
        </div>

        {/* МЕДИА КОНТЕНТ */}
        {(radioPropQ !== "text" || radioPropA !== "text") && (
          <>
            <div
              className={`${classes.center} ${classes.section} ${classes.column}`}
            >
              {/* надпись вопрос */}
              <p style={{ margin: 0 }}>
                {radioPropQ === "picture"
                  ? "Картинка для вопроса:"
                  : radioPropQ === "audio"
                  ? "Аудио-дорожка для вопроса:"
                  : `⠀`}
              </p>
              {/* если картинка-вопрос */}
              {radioPropQ === "picture" && (
                <>
                  <div className={classes.dashedZone}>
                    <div className={`${classes.center} ${classes.widthheight}`}>
                      <img
                        src={LinkQ}
                        alt="no media"
                        className={classes.image}
                      />
                    </div>
                  </div>
                </>
              )}
              {/* если аудио-вопрос */}
              {radioPropQ === "audio" && (
                <>
                  <div className={classes.audioZone}>
                    <div className={`${classes.center} ${classes.widthheight}`}>
                      <Button
                        onClick={() => {
                          setAudioFile(LinkQ);
                          setPlays((e) => !e);
                        }}
                      >
                        Старт/Стоп
                      </Button>
                    </div>
                  </div>
                </>
              )}
              {/* если нет медиа */}
              {radioPropQ === "text" && (
                <>
                  <div className={classes.noZone}>
                    <div className={`${classes.center} ${classes.widthheight}`}>
                      <p>{` `}</p>
                    </div>
                  </div>
                </>
              )}
              {/* надпись ответ */}
              <p style={{ margin: 0 }}>
                {radioPropA === "picture"
                  ? "Картинка для ответа:"
                  : radioPropA === "audio"
                  ? "Аудио-дорожка для ответа:"
                  : `⠀`}
              </p>
              {/* если картинка-ответ */}
              {radioPropA === "picture" && (
                <>
                  <div className={classes.dashedZone}>
                    <div className={`${classes.center} ${classes.widthheight}`}>
                      <img
                        src={LinkA}
                        alt="no media"
                        className={classes.image}
                      />
                    </div>
                  </div>
                </>
              )}
              {/* если аудио-ответ */}
              {radioPropA === "audio" && (
                <>
                  <div className={classes.audioZone}>
                    <div className={`${classes.center} ${classes.widthheight}`}>
                      <Button
                        onClick={() => {
                          setAudioFile(LinkA);
                          setPlays((e) => !e);
                        }}
                      >
                        Старт/Стоп
                      </Button>
                    </div>
                  </div>
                </>
              )}
              {/* если нет медиа */}
              {radioPropA === "text" && (
                <>
                  <div className={classes.noZone}>
                    <div className={`${classes.center} ${classes.widthheight}`}>
                      <p>{` `}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
      <p style={{ fontSize: "calc(1vw + 1vh)", color: "gray" }}>
        Пока работают только прямые ссылки ( картинки можно брать, например, с{" "}
        <a
          href="https://wikipedia.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          wikipedia.org
        </a>{" "}
        ), либо ссылки с{" "}
        <a
          href="https://www.dropbox.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          dropbox.com
        </a>
        , если нужно использовать аудиофайлы
      </p>
    </>
  );
}
