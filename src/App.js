import "./App.css";
import { Component } from "react";
import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/search-box/search-box.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monsters: [],
      searchField: "",
      count: 0 + this.props.increment,
    };
  }
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => this.setState({ monsters: users }));
  }
  handleChange = (e) => {
    this.setState(() => {
      return {
        searchField: e.target.value,
      };
    });
  };
  handleChangeBtn = () => {
    this.setState(
      (prevState, prevProps) => {
        return {
          count: prevState.count + prevProps.increment,
        };
      },
      () => console.log(this.state.count)
    );
  };

  render() {
    const { monsters, searchField } = this.state; //destructuring concept because we do not want to modify the original state/raw state
    const filteredMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );
    return (
      <div className="App">
        <h1> Monsters Application</h1>
        <SearchBox
          placeholder="Search a monster"
          handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonsters} />
        {this.state.count} <br />
        <button onClick={this.handleChangeBtn}>Update</button>
      </div>
    );
  }
}

export default App;
