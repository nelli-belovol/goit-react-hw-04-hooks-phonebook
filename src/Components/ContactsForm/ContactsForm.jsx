import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './ContactsForm.module.scss';

export default class ContactsForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };

  handleNumberChange = e => {
    this.setState({ number: e.target.value });
  };

  handleButtonSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    this.props.onSubmit({ name, number });
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <form className={s.form} onSubmit={this.handleButtonSubmit}>
        <label htmlFor="name">Name</label>
        <input
          value={this.state.name}
          id="name"
          onChange={this.handleNameChange}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
        />
        <label htmlFor="number">Number</label>
        <input
          value={this.state.number}
          id="number"
          onChange={this.handleNumberChange}
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
}

ContactsForm.propTypes = {
  onSubmit: PropTypes.func,
};
