import {Layout} from './components/layout/layout'
import './App.css'
import { Route, Switch } from 'wouter'
import { Entities } from './pages/entities'
import { EntitiesList } from './pages/entities/list'
import { useEntities } from './stores/entities';

function App() {
  useEntities();

  return (
    <Layout>
        <Route path="/" >
        </Route>
        <Switch >
        <Route path="/entities" ><Entities /></Route>
        <Route path="/entities/:tableName"  component={ EntitiesList} />
        </Switch>

      
    </Layout>
  )
}

export default App
