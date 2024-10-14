import React from 'react';

interface CurrencySwitcherProps {
  selectedCurrency: 'USD' | 'EUR' | 'MKD';
  onChangeCurrency: (currency: 'USD' | 'EUR' | 'MKD') => void;
}

const CurrencySwitcher: React.FC<CurrencySwitcherProps> = ({ selectedCurrency, onChangeCurrency }) => {
  return (

      <label>
        <select
          value={selectedCurrency}
          onChange={(e) => onChangeCurrency(e.target.value as 'USD' | 'EUR' | 'MKD')}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="MKD">MKD</option>
        </select>
      </label>

  );
};

export default CurrencySwitcher;
