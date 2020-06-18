import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";
import { wait } from "@testing-library/react";

function App() {
  const [repositories, setrepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setrepositories(response.data);
    });
  }, []);


  async function handleAddRepository() {

    const response = await api.post('repositories', {
      id: "uuid",
      title: "Repositorio",
      url: "https://github.com/ProativaRastreamento/gitpro",
      techs: ["Node.js", "reacJS"],
      likes: 0
    })

    const repository = response.data;

    setrepositories([...repositories, repository]);
  }
//**************************************************************** */
  async function handleRemoveRepository(id) {

    await api.delete(`repositories/${id}`);
    setrepositories(repositories.filter( repository => repository.id !== id ));
  }
  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(Repository =>
          <li key={Repository.id}>

            <ul>
            <li>{Repository.title}</li>
              <li>{Repository.url} </li>
              <li>{Repository.likes} Likes</li>
            </ul>
            

          <button onClick={() => handleRemoveRepository(Repository.id)}>
            Remover
          </button>
        </li>
        )}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;