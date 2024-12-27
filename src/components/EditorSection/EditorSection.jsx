import { useState, useEffect } from 'react';
import { defaultQuestions, defaultFinalQuestions } from '@/data-default.js';
import Button from '@components/Button/Button.jsx';
import classes from '@components/EditorSection/EditorSection.module.css';

export default function EditorSection({
  editDefaultQ,
  setEditDefaultQ,
  editDefaultSuperQ,
  setEditDefaultSuperQ,
  setBoardCondition,
  EP,
  setEP,
  qtyOfNewRounds,
  setQtyOfNewRounds,
  setRebut,
  setImportedRoundQuestions,
  setImportedFinalQuestions,
}) {
  let [reload, setReload] = useState(true);

  function handleButtonClick() {
    document.getElementById('jsonFileInput').click();
  }
  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file && file.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        const parsedData = JSON.parse(content);
        if (parsedData.Regular.length === 2) {
          setEditDefaultQ(parsedData.Regular);
        } else if (parsedData.Regular.length === 1) {
          setQtyOfNewRounds(false);
          setEditDefaultQ(parsedData.Regular);
        }
        setEditDefaultSuperQ(parsedData.Super);
      };
      reader.readAsText(file);
      setReload(false);
      setTimeout(() => {
        setReload(true);
      }, 100);
    } else {
      console.error('Please select a valid JSON file.');
    }
  }

  // Функция проверки заполненности фопросов
  function isQuestionOK(il, iq, rn) {
    if (typeof rn === 'number') {
      let questionData = editDefaultQ[rn][il].line[iq];
      let { typeOfQuestion, question, linkQ, answer, typeOfAnswer, linkA } =
        questionData;
      let hasText = question !== '' && answer !== '';
      let validQuestionType = ['picture', 'audio', 'text'].includes(
        typeOfQuestion
      );
      let validAnswerType = ['picture', 'audio', 'text'].includes(typeOfAnswer);
      let hasLinkQ =
        typeOfQuestion === 'picture' || typeOfQuestion === 'audio'
          ? linkQ !== ''
          : true;
      let hasLinkA =
        typeOfAnswer === 'picture' || typeOfAnswer === 'audio'
          ? linkA !== ''
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
      let hasTheme = theme !== '';
      let hasText = question !== '' && answer !== '';
      let validQuestionType = ['picture', 'audio', 'text'].includes(
        typeOfQuestion
      );
      let validAnswerType = ['picture', 'audio', 'text'].includes(typeOfAnswer);
      let hasLinkQ =
        typeOfQuestion === 'picture' || typeOfQuestion === 'audio'
          ? linkQ !== ''
          : true;
      let hasLinkA =
        typeOfAnswer === 'picture' || typeOfAnswer === 'audio'
          ? linkA !== ''
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

  // Функция сохранения в JSON
  function saveAsJSON(data, filename = 'data.json') {
    const jsonStr = JSON.stringify(data, null, 2); // Преобразуем объект в JSON-строку
    const blob = new Blob([jsonStr], { type: 'application/json' }); // Создаем Blob-объект из JSON-строки
    const url = URL.createObjectURL(blob); // Создаем URL для Blob-объекта

    const link = document.createElement('a'); // Создаем ссылку
    link.href = url;
    link.download = filename; // Устанавливаем имя файла для скачивания
    link.click(); // Программно кликаем по ссылке, чтобы начать скачивание

    URL.revokeObjectURL(url); // Освобождаем URL
  }

  return (
    <>
      {reload && (
        <>
          <div
            className={classes.center}
            style={{ gap: '30px', height: '60%' }}>
            {/* Вопросы 1-го раунда */}
            <div
              className={classes.center}
              style={{ flexDirection: 'column', height: '100%' }}>
              <p className={classes.center}>Вопросы первого раунда</p>
              {Array.from({ length: 6 }).map((_, il) => (
                <div key={`theme1${il}`} className={classes.center}>
                  <input
                    className={classes.input}
                    type='text'
                    defaultValue={editDefaultQ[0][il].theme}
                    placeholder={`Название темы № ${il + 1}`}
                    onChange={(e) => {
                      setEditDefaultQ(
                        (d) => ((d[0][il].theme = e.target.value), d)
                      );
                    }}></input>
                  {Array.from({ length: 7 }).map((_, iq) => (
                    <button
                      key={`line1${iq}`}
                      onClick={() => {
                        setEP([0, il, iq]);
                        setBoardCondition('editRegularQ');
                      }}
                      className={isQuestionOK(il, iq, 0)}>
                      {iq + 1}
                    </button>
                  ))}
                </div>
              ))}
              <div style={{ marginBottom: 'calc(36px + 3vh)' }}></div>
            </div>

            {/* Вопросы 2-го раунда */}
            <div
              className={classes.center}
              style={{ flexDirection: 'column', height: '100%' }}>
              {qtyOfNewRounds && (
                <>
                  <p className={classes.center}>Вопросы второго раунда</p>
                  {Array.from({ length: 6 }).map((_, il) => (
                    <div key={`theme2${il}`} className={classes.center}>
                      <input
                        className={classes.input}
                        type='text'
                        value={editDefaultQ[1][il].theme}
                        placeholder={`Название темы № ${il + 7}`}
                        onChange={(e) => {
                          setEditDefaultQ(
                            (d) => ((d[1][il].theme = e.target.value), d)
                          );
                        }}></input>
                      {Array.from({ length: 7 }).map((_, iq) => (
                        <button
                          key={`line2${iq}`}
                          onClick={() => {
                            setEP([1, il, iq]);
                            setBoardCondition('editRegularQ');
                          }}
                          className={isQuestionOK(il, iq, 1)}>
                          {iq + 1}
                        </button>
                      ))}
                    </div>
                  ))}
                </>
              )}
              {/* Переключатель 1 и 2 игры */}
              <div
                className={classes.checkboxText}
                onClick={() => {
                  if (editDefaultQ.length === 1 && qtyOfNewRounds === false) {
                    setEditDefaultQ([editDefaultQ[0], defaultQuestions[1]]);
                  } else if (
                    editDefaultQ.length === 2 &&
                    qtyOfNewRounds === true
                  ) {
                    setEditDefaultQ([editDefaultQ[0]]);
                  }
                  setQtyOfNewRounds((r) => !r);
                }}>
                <input
                  className={classes.checkbox}
                  type='checkbox'
                  checked={qtyOfNewRounds}
                  onChange={() => {}}
                />
                2-й раунд
              </div>
              {/* Конец переключателя 1 и 2 игры */}
            </div>
          </div>

          {/* Вопросы супер-игры */}
          <p className={classes.center}>Вопросы супер игры</p>
          <div className={classes.center}>
            {Array.from({ length: 7 }).map((_, iq) => (
              <button
                key={`final${iq}`}
                onClick={() => {
                  setEP(['final', undefined, iq]);
                  setBoardCondition('editRegularQ');
                }}
                className={isQuestionOK(undefined, iq, 'final')}>
                {iq + 1}
              </button>
            ))}
          </div>
          <div
            className={classes.center}
            style={{ marginTop: '40px', gap: '20px' }}>
            <Button
              onClick={() => {
                saveAsJSON({
                  Regular: qtyOfNewRounds
                    ? editDefaultQ
                    : [editDefaultQ.shift()],
                  Super: editDefaultSuperQ,
                });
              }}>
              сохранить
            </Button>
            <div>
              <Button onClick={handleButtonClick}>загрузить</Button>
              <input
                type='file'
                id='jsonFileInput'
                accept='.json'
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </div>
            <Button
              onClick={() => {
                setImportedRoundQuestions(editDefaultQ);
                setImportedFinalQuestions(editDefaultSuperQ);
                setRebut((r) => ++r);
                setBoardCondition('start');
              }}>
              играть
            </Button>
          </div>
        </>
      )}
    </>
  );
}
