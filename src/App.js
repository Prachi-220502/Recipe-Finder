import './App.css';
import { useEffect , useState, useRef } from "react";

function App() {
  const [ingredientList, updateIngredientList] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const APP_KEY = "413cbab4883d823632e6e72a721464dd";
  const APP_ID = "099ed8fc";

  const search = ()=> {
    console.log("input ref",inputRef);
    searchForRecipe(inputRef.current.value);
    inputRef.current.value = "";
  };
  const searchForRecipe = (query)=> {
    setLoading(true);
    let url = `search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;
    fetch(url).then(response => {
      return response.json()
    })
    .then(res => {
      console.log(res.hits);
      updateIngredientList(res.hits);
      setLoading(false);
    })
    .catch(err => {console.log("error", err)
     setLoading(false);}
    );
  };
useEffect(() => {
  searchForRecipe('paneer');
}, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="InputWrapper">
          <input ref={inputRef} placeholder="Search for recipe"/>
          <button onClick={search}>Search</button>
        </div>
        {loading && <p>Loading...</p>}
        <div className="Wrapper">
          {ingredientList.map(({recipe}) =>{
            return (
              <div key= {recipe.label} className="Ingredient">
                <span>{recipe.label}</span>
                <img src={recipe.image}/>
                <div className="Steps">
                {recipe.ingredientLines.map((step,index)=>{
                  return<p key={index}>{step}</p>;
                })}
                </div>
              </div>
            )
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
