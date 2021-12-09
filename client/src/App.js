import './App.css'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import routes from './routes'
import 'semantic-ui-css/semantic.min.css'
import Header from './components/Header'
import { GlobalProvider } from './context/Provider'
import isAuthenticated from './utils/isAuthenticated'

const RenderRoute = (route) => {
  document.title = route.title || "HDev App"

  return (
    <Route
      path={route.path} 
      exact
      render={(props) => isAuthenticated() || !route.needsAuth ? <route.component {...props} /> : <Redirect to={{pathname: "/login", state: { from: props.location }}}/> }
    > 
    </Route>
  )
}

function App() {
  return (
    <div className="App">
      <GlobalProvider>
        <Router>
            <Header />
            <Switch>
              {routes.map((route, index) => (
                <RenderRoute {...route} key={index}>
                </RenderRoute>
              ))}
            </Switch>
        </Router>  
      </GlobalProvider>
    </div>
  );
}

export default App;