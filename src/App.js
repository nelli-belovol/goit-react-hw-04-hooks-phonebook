import './App.css';
import React, { useState, useEffect } from 'react';
import shortid from 'shortid';
// import debounce from 'lodash.debounce';

import ContactsForm from 'Components/ContactsForm/ContactsForm';
import ContactsList from 'Components/ContactList/ContactList';
import Filter from 'Components/Filter/Filter.jsx';
const initial_contacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? initial_contacts,
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify([...contacts]));
  }, [contacts]);

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const filterContact = () => {
    const normalizeFilter = filter.toLowerCase();

    const filterContacts = contacts.filter(contact => {
      return contact.name.toLowerCase().includes(normalizeFilter);
    });
    return filterContacts;
  };

  const handleSubmit = ({ name, number }) => {
    const includesName = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase(),
    );

    if (includesName) {
      alert(`${name} is already in contacts.`);
      return;
    }

    setContacts(prevState => [
      ...prevState,
      { name, number, id: shortid.generate() },
    ]);
  };

  const handleDelContact = id => {
    const idxContact = contacts.findIndex(contact => {
      return contact.id === id;
    });

    setContacts(() => {
      const newContacts = [...contacts];

      newContacts.splice(idxContact, 1);
      return newContacts;
    });
  };

  return (
    <div className="App">
      <h1>Phonebook</h1>
      <ContactsForm onSubmit={handleSubmit} />
      <h2>Contacts</h2>
      <Filter
        contacts={contacts}
        filter={filter}
        title="Find contacts by name"
        onChange={changeFilter}
      />
      <ContactsList onClick={handleDelContact} contacts={filterContact()} />
    </div>
  );
}

export default App;
