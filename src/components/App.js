import "../styles/App.css";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

// Importing components
import Navbar from "./Navbar";
import InventoryList from "./InventoryList";
import AddInventory from "./AddInventory";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <div className="container">
          <Route exact path="/" component={InventoryList} />
          <Route exact path="/create" component={AddInventory} />
        </div>
      </Switch>
    </Router>
  );
};

export default App;
