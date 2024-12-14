import {Layout} from './components/layout/layout'
import './App.css'
import { Route, Switch } from 'wouter'
import { Entities } from './pages/entities'
import { EntitiesList } from './pages/entities/list'

function App() {
  

  return (
    <Layout>
        <Route path="/" ></Route>
        <Route path="/entities" nest>
        <Switch>
          <Route path="/:tableName"  component={ EntitiesList} />
          <Route><Entities /></Route>
        </Switch>
        </Route>

      
    </Layout>
  )
}

export default App
