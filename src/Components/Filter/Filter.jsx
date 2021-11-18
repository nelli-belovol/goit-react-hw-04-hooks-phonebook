import React from 'react';
import PropTypes from 'prop-types';
import s from './Filter.module.scss';

export default function Filter({ onChange, filter }) {
  return (
    <>
      <label className={s.filter} htmlFor="findname">
        Find contacts by name
        <input id="findname" type="text" onChange={onChange} value={filter} />
      </label>
    </>
  );
}

Filter.propTypes = {
  onChange: PropTypes.func,
  filter: PropTypes.string,
};
