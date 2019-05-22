import React from 'react';

const header = (props) => {

  const headerMarkup = (
    <div>
      <div className="HeaderNav"></div>
      <h1 className='HeaderDescription'>
      {props.children}
      </h1>
      <hr className="HeaderLine"></hr>
      <div className="HeaderSubtitle">{props.subtitle}</div>
    </div>
   );

   return <div>{headerMarkup}</div>

};

export default header;
