import React, { useState } from 'react';
import PropTypes from 'prop-types';
import s from './ContactsForm.module.scss';

export default function ContactsForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleNameChange = e => {
    setName(e.target.value);
  };

  const handleNumberChange = e => {
    setNumber(e.target.value);
  };

  const handleButtonSubmit = e => {
    e.preventDefault();
    onSubmit({ name, number });
    setNumber('');
    setName('');
  };

  return (
    <form className={s.form} onSubmit={handleButtonSubmit}>
      <label htmlFor="name">Name</label>
      <input
        value={name}
        id="name"
        onChange={handleNameChange}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
        required
      />
      <label htmlFor="number">Number</label>
      <input
        value={number}
        id="number"
        onChange={handleNumberChange}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
        required
      />
      <button className={s.form__button} type="submit">
        Add Contact
      </button>
    </form>
  );
}

ContactsForm.propTypes = {
  onSubmit: PropTypes.func,
};
