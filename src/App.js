import {BrowserRouter} from 'react-router-dom'
import MyRoutes from './MyRoutes'
import Menu from './components/Menu'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Menu/>
       <MyRoutes/>
      </BrowserRouter>
    </div>
  );
}

export default App;
