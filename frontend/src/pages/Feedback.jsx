import React, { useState } from "react";

const Feedback = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const encodedTitle = encodeURIComponent(title);
    const encodedDescription = encodeURIComponent(description);
    const mailtoLink = `mailto:leochashchindevelopment@gmail.com?subject=${encodedTitle}&body=${encodedDescription}`;
    window.location.href = mailtoLink;
    setTitle("");
    setDescription("");
  };

  return (
    <div className="generalPages">
      <p className="location">{`> Обратная связь`}</p>
      <div>
        <h2>Обратная связь</h2>
      </div>
      <div>
        <p>
          Исполнители проекта надеются на помощь родственников погибших воинов
          в исправлении и дополнении сведений о них.
          <br />
          <br />
          В базе данных возможно наличие неточностей по причинам составления
          документов в условиях боевых действий, недостаточной грамотности
          писарей, особенностей написания имен и фамилий, ветхого состояния
          документов и т.д.
          <br />
          <br />
          Если Вы хотите сообщить о неточностях, которые Вы нашли в базе
          данных, или дополнительную информацию, пожалуйста, заполните форму
          ниже. Или Вы можете отправить электронное письмо непосредственно по
          адресу: <a href="mailto:leochashchindevelopment@gmail.com">leochashchindevelopment@gmail.com</a>
        </p>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="feedbackTitle" htmlFor="title">Насчет:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: "500px", height: "20px" }}
            />
          </div>
          <div style={{ marginBottom: "50px" }}>
            <label classname="feedbackDesc" htmlFor="description">Описание:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: "500px", height: "200px" }}
            />
          </div>
          <button className="feedbackButton" type="submit" style={{ display: "block", marginTop: "50px" }}>Отправить</button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
