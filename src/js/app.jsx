import React from 'react';

export default class App extends React.Component {
  // your Javascript goes here
  constructor(props) {
    super(props);
    this.state = {
      balance: 0,
      rate: 0,
      term: 15,
      submit: 0,
    };
    this.calculate = this.calculate.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  updateState(e) {
    this.setState({[e.target.name]: [e.target.value]});
  }

  calculate(e){
    const r = (this.state.rate)/100/12; // Monthly Percentage Rate - take the input from the APR and divide it by 12 to divide into months
    const p = (this.state.balance); // Principal Balance - take the input from the balance input tag
    const n = (this.state.term) * 12; // Number of Months the Loan will be paid - take the input from the select element and multiply by 12(for each month of the year)
    const mortgage = (p * ((r * (Math.pow((1 + r), n))) / (Math.pow((1 + r), n) - 1))).toFixed(2); // This will be the output
    this.setState({submit: mortgage});
    console.log(r, 'APR');
    console.log(p, 'Principal');
    console.log(n, 'Number of Months')
    console.log(mortgage, 'Mortgage')
  }

  render(){
    return (
      <div className='container'>
        <h3>Mortgage Calculator</h3>
        <label htmlFor='balance' className='col-sm-2 control-label'>Loan Balance ($)</label>
        <div className='col-sm-10'>
          <input name='balance' type='number' value={this.state.balance} onChange={this.updateState} />
        </div>
        <label htmlFor="rate" className="col-sm-2 control-label">Interest Rate (%)</label>
        <div className='col-sm-10'>
          <input name='rate' type='number' step='0.01' value={this.state.rate} onChange={this.updateState} />
        </div>
        <label htmlFor='term' className='col-sm-2 control-label'>Loan Term (years)</label>
        <div className='col-sm-10'>
          <select name='term' value={this.state.term} onChange={this.updateState}>
            <option value='15'>15</option>
            <option value='30'>30</option>
          </select>
        </div>
        <div className='col-sm-10'>
        <button name='submit' onClick={this.calculate}>Calculate</button>
        <div name='output' id='output'>${this.state.submit} is your payment.</div>
        </div>
      </div>
    )
  }
}
