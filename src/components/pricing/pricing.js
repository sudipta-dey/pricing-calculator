import React, {Component} from 'react';
import data from '../../data/countries.json';
import rate from '../../data/exchangeRate.json';

class pricing extends Component {

  /**
   * Setting up initial State
   *
   */

  state = {
    query: '',
    results: [],
    country: '',
    isoCode: '',
    rate: '',
    value: '',
    amount: '',
    showList: false
  }

/**
 * Filter country from json data based on user input
 *
 * @param {arr} array json data
 * @param {searchKey} text search text
 */
  filterCountryData = (arr, searchKey) => {
    if(arr){
      return arr['countries'].filter(function(obj) {
        return Object.keys(obj).some(function(key) {
          return obj['country']['name'].toLowerCase().includes(searchKey);
        })
      });
    }
  }

/**
 * Get the Country name user has searched from the countries json file data
 *
 */
  getCountry = () => {
    if(data){
      var search = this.state.query;
      var results = [];

      var searchLength = search.length;

      results = this.filterCountryData(data,this.state.query.toLowerCase());

      this.setState({
            results: results,
            showList: true
      })
    }
  }


/**
 * Method is called when user enters any data in the country input field
 *
 */
 inputChangeHandler = () => {
    this.setState({
      query: this.search.value
    }, () => {

          this.getCountry();

    })
  }

  /**
   * Method is called when user enters any data in the amount input field,
   *  and we need to calcul;ate final amount to be transfered
   *
   */
   amountChangeHandler = () => {
      this.setState({
        amount: this.search2.value
      });

      const finalValue = (this.state.rate * this.search2.value).toFixed(2);

      this.setState({
        value : finalValue
      });

    }

  /**
   * Method to update country once it has been selected by user by clicking on country name
   * We also update the rate and isoCode based on country selection
   * @param {countryVal} string country selected bu user
   */
   countrySelected = (countryVal) => {
      this.setState({
        country : countryVal
        }, () => {
        if(rate) {

          const index = rate['countries'].findIndex(function(item, i){
            return item.name === countryVal;
          });

          if(index > -1){
            const fetchedRate = rate['countries'][index]['rate'];
            this.setState({
              rate : fetchedRate
            });
          }


          const indexCountry = data['countries'].findIndex(function(item, i){
            return item['country']['name'] === countryVal;
          });

           let convertedMoney = data['countries'][indexCountry]['country']['currencies'][0]['currency']['isoCode'];

           this.setState({
             isoCode : convertedMoney
           });

        }

        this.setState({
          showList : false
        });

      })

   }

  /**
   * Method returns list of searched countries to be displayed to user
   *
   */
  searchedCountries = () => {
    if(this.state.results && this.state.showList){
      const options = this.state.results.map(r => (
        <li key={r['country']['name']} onClick={() => this.countrySelected(r['country']['name'])}>
          {r['country']['name']}
        </li>
      ));
     return <div><ul className="CountryList">{options}</ul></div>
    }
  }

  /**
   * Render Method returns Dom to be displayed to user
   *
   */
   render() {
    return (
      <div className='PricingCalculator'>
          <div className='PricingOption'>Send to</div>

          <form>
            <input
              className='CountrySearchInput'
              ref={input => this.search = input}
              onChange={this.inputChangeHandler}
              onClick={this.inputChangeHandler}
            />
          <div className="CountrySelected">{this.state.country}</div>
              {this.searchedCountries()}
          </form>

          <div className='PricingOption'>Send amount</div>
          <form>
            <input className='AmountInput'
              ref={input => this.search2 = input}
              onChange={this.amountChangeHandler}
              onClick={this.amountChangeHandler}
            />
          </form>

          <div className='PricingOption'>They'll get</div>
          <form>
            <input className='FinalInput'
            value={this.state.value}
            />
          <input className='IsoCode'
            value={this.state.isoCode}
            />
          </form>

          <div className="ExchangeRate">
          1 GBP = {this.state.rate} {this.state.isoCode}
          </div>

          <div>
            <button>Send Money</button>
          </div>
      </div>

    )
  }
};

export default pricing;
