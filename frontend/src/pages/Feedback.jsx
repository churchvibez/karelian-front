import React, { useState } from "react";

const Feedback = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Feedback submitted:", { name, title, description });
    setName("");
    setTitle("");
    setDescription("");
  };

  return (
    <div className="generalPages">
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
          адресу: <a href="leochashchindevelopment@gmail.com">leochashchindevelopment@gmail.com</a>
        </p>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
