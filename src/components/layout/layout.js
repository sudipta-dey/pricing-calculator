import React from 'react';
import Header from '../header/header';
import Pricing from '../pricing/pricing';

const layout = (props) => {

  const layoutMarkup = (
    <div>
      <Header subtitle="Fast and reliable international money transfers to over 200 countries and territories">
        <div>SEND MONEY ABROAD
        </div><div>FROM THE UK</div>
      </Header>
      <div>
        <Pricing />
      </div>
    </div>
  );

  return <div>{layoutMarkup}</div>

};

export default layout;
