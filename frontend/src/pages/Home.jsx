import React from "react";
import MainPage from '../images/mainPage.jpg';

const Home = () => {
  return (
    <div className="generalPages">
      <div className="home">
        <img src={MainPage} alt="Main Page"/>
        <div className="homePageRightText">
          <p>ПОИСК  ПО  БАЗЕ  ДАННЫХ</p>
          <input type="text" placeholder="Фамилия"/>
          <input type="text" placeholder="Имя"/>
          <input type="text" placeholder="Отчество"/>
          <button>Искать</button>
      </div>
      <div className="homePageBottomHeader">
        <h2>Памяти погибших воинов Карельского фронта посвящается</h2>
      </div>  
      <div className="homeBottomPageText">  
        <p>
          Карельский фронт был самым протяженным из всех фронтов Великой
          Отечественной войны. Он действовал на наиболее сложном по природно-климатическим
          условиям северном ТВД с 1.9.1941 по 15.11.1944. Сдержав в 1941 г. натиск финской армии и
          немецкой армии «Норвегия» стремившихся захватить Кольский полуостров и Советскую
          Карелию, фронт стабилизировался до июня 1944 г., обеспечивая безопасность Мурманска и
          Обозерской железной дороги. После проведения Петрозаводско-Свирской и
          Петсамо-Киркенесской операций фронт, решивший поставленные ему стратегические задачи,
          был расформирован.
          <br></br><br></br>
          Этот Интернет-ресурс предназначен для родных и близких военнослужащих всех видов и родов
          войск вооруженных сил СССР погибших, умерших от ран и болезней, а также пропавших без
          вести на Карельском фронте в 1941-1944 гг. Поиск можно вести по фамилии, имени и
          отчеству. Интернет-ресурс адресован и всем интересующимся историей Великой Отечественной
          и Второй мировой войны.
          <br></br><br></br>
          Не считая призванных в армию, из 700-тысячного населения Карело-Финской ССР 536 тысяч
          человек были эвакуированы во внутренние районы СССР, а приблизительно 85 тысяч остались
          на оккупированной территории. Интернет-ресурс будет содержать большой массив данных о
          сложных судьбах этих людей.
        </p>
      </div>
    </div>

    </div>
  );
};

export default Home;
