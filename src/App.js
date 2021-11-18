import './App.css';
import React, { Component } from 'react';
import shortid from 'shortid';
// import debounce from 'lodash.debounce';

import ContactsForm from 'Components/ContactsForm/ContactsForm';
import ContactsList from 'Components/ContactList/ContactList';
import Filter from 'Components/Filter/Filter.jsx';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem(
        'contacts',
        JSON.stringify([...this.state.contacts]),
      );
    }
  }

  componentDidMount() {
    const items = JSON.parse(localStorage.getItem('contacts'));

    if (items) {
      this.setState({ contacts: items });
    }
  }

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  filterContact = () => {
    const normalizeFilter = this.state.filter.toLowerCase();
    const filterContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter),
    );
    return filterContacts;
  };

  handleSubmit = ({ name, number }) => {
    const includesName = this.state.contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase(),
    );

    if (includesName) {
      alert(`${name} is already in contacts.`);
      return;
    }

    this.setState(prevState => ({
      contacts: [
        ...prevState.contacts,
        {
          name,
          number,
          id: shortid.generate(),
        },
      ],
    }));
  };

  handleDelContact = id => {
    const idxContact = this.state.contacts.findIndex(contact => {
      return contact.id === id;
    });

    this.setState(prevState => {
      const newContacts = [...prevState.contacts];
      newContacts.splice(idxContact, 1);
      return {
        contacts: [...newContacts],
      };
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Phonebook</h1>
        <ContactsForm onSubmit={this.handleSubmit} />
        <h2>Contacts</h2>
        <Filter
          contacts={this.state.contacts}
          filter={this.state.filter}
          title="Find contacts by name"
          onChange={this.changeFilter}
        />
        <ContactsList
          onClick={this.handleDelContact}
          contacts={this.filterContact()}
        />
      </div>
    );
  }
}

export default App;
