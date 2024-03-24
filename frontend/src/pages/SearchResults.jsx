import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { baseUrl } from '../apiConfig';

const SearchResults = () => 
{
  const [soldiers, setSoldiers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [inputSurname, setInputSurname] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputFathername, setInputFathername] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => 
  {
    const queryParams = new URLSearchParams(location.search);
    const surname = queryParams.get('surname') || '';
    const name = queryParams.get('name') || '';
    const fathername = queryParams.get('fathername') || '';
    const page = parseInt(queryParams.get('page') || 1);

    setInputSurname(surname);
    setInputName(name);
    setInputFathername(fathername);

    fetch(`${baseUrl}/soldiers/search/?surname=${surname}&name=${name}&fathername=${fathername}&page=${page}`)
      .then(response => response.json())
      .then(data => {
        setSoldiers(data.results);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
      })
      .catch(error => console.error('Error fetching search results:', error));
  }, [location.search]);

  const handleSubmit = (event) => 
  {
    event.preventDefault();
    const searchParams = new URLSearchParams({
      surname: inputSurname,
      name: inputName,
      fathername: inputFathername,
      page: 1
    }).toString();
    navigate(`/site/bd/search/?${searchParams}`);
  };

  const renderPagination = () => 
  {
    let startPage = Math.max(currentPage - 5, 1);
    let endPage = Math.min(startPage + 9, totalPages);

    const pages = [];
    for (let i = startPage; i <= endPage; i++) 
    {
      pages.push(i);
    }

    return (
      <div className="pagination">
        <button onClick={() => changePage(1)} disabled={currentPage === 1}>&lt;&lt;</button>
        <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>&lt;</button>
        {pages.map(page => (
          <button key={page} disabled={page === currentPage} onClick={() => changePage(page)}>
            {page}
          </button>
        ))}
        <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>&gt;</button>
        <button onClick={() => changePage(totalPages)} disabled={currentPage === totalPages}>&gt;&gt;</button>
      </div>
    );
  };

  const changePage = (newPage) => 
  {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('page', newPage);
    window.location.search = queryParams.toString();
  };

  return (
    <div className="generalPages">
      <div>
          <button className="backButton" onClick={() => navigate(-1)}>
            ←
          </button>    
        </div>
      

      <div className="searchFormContainer">
      <form className="searchForm" onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label htmlFor="surname">Фамилия:</label>
          <input id="surname" type="text" value={inputSurname} onChange={e => setInputSurname(e.target.value)} />
        </div>
        <div className="inputGroup">
          <label htmlFor="name">Имя:</label>
          <input id="name" type="text" value={inputName} onChange={e => setInputName(e.target.value)} />
        </div>
        <div className="inputGroup">
          <label htmlFor="fathername">Отчество:</label>
          <input id="fathername" type="text" value={inputFathername} onChange={e => setInputFathername(e.target.value)} />
        </div>
        <button className="submitButton" type="submit">Submit Query</button>
      </form>
    </div>


      {soldiers.map((soldier, index) => (
        <div key={index} style={{ marginBottom: "20px" }}> {/* Added space between soldiers */}
          <h3>{[soldier.s_surname, soldier.s_name, soldier.s_fathername].filter(Boolean).join(' ')}</h3>
          <ul>
            {soldier.s_birthyear && <li>Дата рождения: {soldier.s_birthyear}</li>}
            {soldier.s_birthrepublic && <li>Республика: {soldier.s_birthrepublic}</li>}
            {soldier.s_birthregion && <li>Регион: {soldier.s_birthregion}</li>}
            {soldier.s_birthrayon && <li>Район: {soldier.s_birthrayon}</li>}
            {soldier.s_birthtown && <li>Город: {soldier.s_birthtown}</li>}
            {soldier.s_calledby && <li>Призван: {soldier.s_calledby}</li>}
            {soldier.s_rank && <li>Звание: {soldier.s_rank}</li>}
            {soldier.s_deathdate && <li>Дата гибели: {soldier.s_deathdate}</li>}
            {soldier.s_burialplace && <li>Место захоронения: {soldier.s_burialplace}</li>}
            {soldier.s_milforce && <li>Воинское соединение: {soldier.s_milforce}</li>}
            {soldier.s_reason && <li>Причина гибели: {soldier.s_reason}</li>}
          </ul>
        </div>
      ))}
      {renderPagination()}
    </div>
  );
};

export default SearchResults;
