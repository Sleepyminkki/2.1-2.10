import React from 'react';
import { useEffect, useState } from 'react';

const Search = ({persons, searchInput, setSearchInput}) => {

  const filter = event => {
    const query = event.target.value;
    const updateList = persons.filter(person => {
     return person.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    })
    setSearchInput(query);
  }

  return (
    <div>
      filter shown with {" "}<input 
          id="search"
          name="search"
          onChange={filter}
          value={searchInput}
          autoComplete="off"
          />
    </div>
 )
}

const Add = ({persons, setPersons}) => {

  const [newName, setNewName] = useState('');

  const [names, setNames] = useState(newName);

  const handleNameChange = event => {
    setNewName(event.target.value);
  }

  const [newNumber, setNewNumber] = useState(0);

  const [numbers, setNumbers] = useState(newNumber);

  const handleNumberChange = secondEvent => {
    setNewNumber(secondEvent.target.value);
  }

  const handleClick = () => {
    setNames(newName);
    setNumbers(newNumber);

    if (persons.some(person => person.name === newName)) {
      alert(newName + " is already added to phonebook");
    } else {
    setPersons(current => [...current, {name: newName, number: newNumber}]);

    }

    setNewName("");
    setNewNumber(0);
  }

  return (
    <div>
      <div>
          name: <input 
          type="text"
          id="name"
          name="name"
          onChange={handleNameChange}
          value={newName}
          autoComplete="off"
          /><br/>
          number: <input 
          type="number"
          id="number"
          name="number"
          onChange={handleNumberChange}
          value={newNumber}
          autoComplete="off"
          />
      </div>
        <div>
          <button type="submit" onClick={handleClick}>add</button>
        </div>
    </div>
  )
}

const Names = ({persons, searchInput}) => {

  return (
    <div>
      {persons.filter(person => 
      person.name.toLowerCase().includes(searchInput.toLowerCase()))
       .map((person, index) => (
        <p key={index}>{person.name} {person.number}</p>
       ))}
    </div>
  )
}

const App = () => {

  const [persons, setPersons] = useState([
    {name: "Arto Hellas", number: "040-1231244"},
    {name: 'Ada Lovelace', number: '39-44-5323523' },
    {name: 'Dan Abramov', number: '12-43-234345' },
    {name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]); 

  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3003/persons')
    .then((response) => response.json())
    .then((data) => setJsonData(data))
    .catch((error) => console.error(error));
}, []);
 
  const [searchInput, setSearchInput] = useState("");

  return (
    <div>
      <h2>Phonebook</h2>

      <Search persons={persons} searchInput={searchInput} setSearchInput={setSearchInput}/>

      <h2>Add a new</h2>
       
      <Add persons={persons} setPersons={setPersons}/>
       
      <h2>Numbers</h2>

      <Names persons={persons} searchInput={searchInput}/>

      <h2>JSON</h2>

      {jsonData.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
    </div>
  )

}

export default App;
