import React, { useState, useRef } from 'react';
import './Autocomplete.css';

function Autocomplete(props) {
  const {selected, onClear, onChange, dataset, onSelect} = props;
  const [position, setPosition] = useState({top: 0, left: 0});
  const [suggestions, toggleSuggestions] = useState(false);
  const inputEl = useRef(null);

  function debounce(fn, delay) {
    var timer = null;
    return function () {
      var context = this,
        args = arguments[0].target.value;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.call(context, args);
      }, delay);
    };
  }

  function handleSelect(index){
    onSelect(index);
    inputEl.current.value = "";
    toggleSuggestions(false);
  }

  function handleFocus(){
    toggleSuggestions(true);
    let pos = {
      top: inputEl.current.getClientRects()[0].bottom,
      left: inputEl.current.getClientRects()[0].x
    }
    setPosition(pos);
  }
  function handleBlur(e){
    setTimeout(() => toggleSuggestions(false),500)
  }

  return (
    <div className="main-cont">
      {selected.map( (item,i) => 
        <span key = {i} className="selected-item">
          {item}
          <span className="clear-btn" onClick={() => onClear(i)}>x</span>
        </span>
      )}
      {selected.length < 5 && <input
        ref={inputEl}
        className="input-field"
        onChange = {debounce(onChange, 500)}
        onFocus = {handleFocus}
        onBlur = {handleBlur}
      />}
      {suggestions && dataset.list.length >0 && <div className="dropdown" style={position}>
        {dataset.list.map( (item, i) => 
          <div 
            key={i} 
            onClick={() => handleSelect(i)} 
            className="dropdown-option"
          >
            <span className="title">{item[dataset.title]}</span>
            <span className="subtitle">{item[dataset.subtitle]}</span>
          </div>
        )}
      </div>}
    </div>
  );
}

export default Autocomplete;
