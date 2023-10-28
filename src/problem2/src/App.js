import React, { useEffect, useState } from "react";
import "./App.css";
import CurrencyRow from "./CurrencyRow";

const BASE_URL = "https://interview.switcheo.com/prices.json";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  const [boolean, setBoolean] = useState(false);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        const firstCurrency = data.map((value) => value.currency)[1];
        setCurrencyOptions([...data.map((value) => value.currency)]);
        setFromCurrency(data.map((value) => value.currency)[0]);
        setToCurrency(firstCurrency);

        setExchangeRate(
          data.find((value) => value.currency === firstCurrency).price
        );
      });
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then((res) => res.json())
        .then((data) =>
          setExchangeRate(
            data.find((value) => value.currency === toCurrency).price
          )
        );
    }
  }, [fromCurrency, toCurrency]);

  function handleFromAmountChange(e) {
    if (e.target.value < 0) {
      setBoolean(true);
    } else {
      setBoolean(false);
    }
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  function handleConvertCurrency(fromValue, toValue) {
    const temp = fromValue;
    fromValue = toValue;
    toValue = temp;
    setFromCurrency(fromValue);
    setToCurrency(toValue);

    return;
  }

  return (
    <div class="container currency-converter">
      <h1>Money change</h1>
      <div class="input-container">
        <div>
          <CurrencyRow
            currencyOptions={currencyOptions}
            selectCurrency={fromCurrency}
            onChangeCurrency={(e) => setFromCurrency(e.target.value)}
            onchangeAmount={handleFromAmountChange}
            amount={fromAmount}
          />
        </div>
        <span>=</span>
        <div>
          <CurrencyRow
            currencyOptions={currencyOptions}
            selectCurrency={toCurrency}
            onChangeCurrency={(e) => setToCurrency(e.target.value)}
            onchangeAmount={handleToAmountChange}
            amount={boolean === true ? 0 : toAmount}
          />
        </div>
      </div>
      <div id="info-data">
        <div>
          {1} {fromCurrency} bằng
          <p className="exchange-rate">
            {exchangeRate} {toCurrency}
          </p>
        </div>
        <button
          onClick={() => handleConvertCurrency(fromCurrency, toCurrency)}
          id="convert-button"
        >
          Convert
        </button>
      </div>
    </div>
  );
}

export default App;
