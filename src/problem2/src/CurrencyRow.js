import React from "react";

export default function CurrencyRow(props) {
  const { currencyOptions, selectCurrency, onChangeCurrency, onchangeAmount, amount } = props;

  return (
    <div>
      <input type="number" id="amount" value={amount} onChange={onchangeAmount} />
      <select id="from-currency" value={selectCurrency} onChange={onChangeCurrency}>
        {currencyOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
