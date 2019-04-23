import React from 'react';

const Star = ({
    selected, rateStar
}) => {
    const filled = selected ? 'fas fa-star star-filled':'far fa-star'
   return(
       <i className={filled} onClick={rateStar}></i >
    )}

export default Star;