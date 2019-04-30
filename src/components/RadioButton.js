import React from 'react';
import classnames from 'classnames';

const RadioButtons = ({
  value, handleOptionChange, name, selectedOption, label, description
}) => (
      <div className="frb-group">
      <div className="frb frb-default">
            <input type="radio" 
              name={name}
              value={value}
              checked={selectedOption === value}
              onChange={() => handleOptionChange(name, value)}
            />
        <label className='label-radio' onClick={() => handleOptionChange(name, value)}>
          <span className="frb-title">{label}</span>
          <span className="frb-description">{description}</span>
						</label>
          </div>
       </div>
);

export default RadioButtons;
