import React from 'react';
import PropTypes from 'prop-types';
import s from './ContactList.module.scss';

export default function ContactList({ title, contacts, onClick }) {
  return (
    <>
      <h2>{title}</h2>
      <ul className={s.contacts__list}>
        {contacts.map(contact => {
          return (
            <li key={contact.id}>
              {contact.name}: {contact.number}
              <button
                className={s.contacts__button}
                onClick={() => onClick(contact.id)}
                type="button"
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  handleDel: PropTypes.func,
};
