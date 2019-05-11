import React from 'react';
const NewMatch = ({
    match, upScore, downScore
}) => (
<div>
      <div className="row ">
        <div className="col-xs-7 topElimination">
      Hector y Titito 1234
      </div>
      <div className="col-xs-2">
          <div className="row">
            <div className="col-xs-1 ">
              <i className="fas fa-sort-up fa-2x icon"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-1">
              <i className="fas fa-sort-down fa-2x icon"
              />
            </div>
          </div>
      </div>
        <div className="col-xs-1 topElimination">
        4
      </div>
     </div>
      <div className="row topElimination ">
        <div className="col-xs-7 topElimination">
          player A
      </div>
        <div className="col-xs-2">
          <div className="row">
            <div className="col-xs-1 ">
              <i className="fas fa-sort-up fa-2x icon"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-1">
              <i className="fas fa-sort-down fa-2x icon"
              />
            </div>
          </div>
        </div>
        <div className="col-xs-1 topElimination">
          4
      </div>
      </div>
</div>
  )

export default NewMatch;
