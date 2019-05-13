import React from 'react';
import classnames from 'classnames';

const Match = ({
}) => (
    <div className="container">
    <div className="row">
      <div className="col-xs-12">
      <div className="row match-row">
        <div className="col-xs-2 ">Tito</div>
        <div className="col-xs-2">
          <div className="row">
            <div className="col-xs-2"> 
               <i className="fas fa-sort-up fa-2x icon"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-2">
              <i className="fas fa-sort-down fa-2x icon"
              />
            </div>
          </div>
        </div>
        <div className="col-xs-2"> 4</div>
        <div className="col-xs-2"> 3 </div>
        <div className="col-xs-2">
          <div className="row">
            <div className="col-xs-2">
              <i className="fas fa-sort-up fa-2x icon"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-2">
              <i className="fas fa-sort-down fa-2x icon"
              />
            </div>
          </div>
        </div>
        <div className="col-xs-2 ">Tito 2</div>
      </div>
      <div className="row match-row">
        <div className="col-xs-2 match-border-top"></div>
        <div className="col-xs-2 match-diagonal-left"></div>
        <div className="col-xs-2 match-border-bottom"></div>
        <div className="col-xs-2 match-border-bottom"></div>
        <div className="col-xs-2 match-diagonal-right"></div>
        <div className="col-xs-2 match-border-top "></div>
      </div>
  </div>
  </div>
</div>
  );

export default Match;
