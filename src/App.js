import React, {useState} from 'react';
import Autocomplete from './component/Autocomplete'
import Axios from 'axios';
import './App.css';

function App() {
  const apiKey = "b1d153f6";
  const [selected, setSelected] = useState(["Room","Dark Room"]);
  const [dataset, setDataset] = useState([]);


  function onChange(e){
    Axios.get('http://www.omdbapi.com/?apikey='+apiKey+'&type=movie&s='+e)
      .then( resp => {
        if(resp.data.Response === "True"){
          let temp = resp.data.Search.map( mov => {
            return{
              Title: mov.Title,
              Year: mov.Year
            }
          });
          setDataset(temp);
        }
      })
  }

  function onSelect(index){
    let temp = [...selected];
    temp.push(dataset[index].Title);
    setSelected(temp);
    setDataset([]);
  }

  function onClear(index){
    let temp = [...selected];
    temp.splice(index,1);
    setSelected(temp);
  }

  return (
    <div className="App">
      <header className="App-header">
        JBL - Autocomplete
      </header>

      <div className="parent-elem">
        <Autocomplete 
          dataset = {{list: dataset, title: 'Title', subtitle: "Year"}}
          onChange = {onChange}
          onSelect = {onSelect}
          onClear = {onClear}
          selected = {selected}
        />
      </div>
    </div>
  );
}

export default App;
