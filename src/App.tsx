import {Layout} from './components/layout/layout'
import './App.css'
import { Route, Switch } from 'wouter'
import { Entities } from './pages/entities'
import { EntitiesList } from './pages/entities/list'
import { useEntities } from './stores/entities';
import { EntityEdit } from './pages/entities/edit'

function App() {
  useEntities();

  return (
    <Layout>
        <Route path="/" >
        </Route>
        <Switch >
        <Route path="/entities" ><Entities /></Route>
        <Route path="/entities/:tableName"  component={ EntitiesList} />
        <Route path="/entities/:tableName/edit/"  component={ EntityEdit} />
        <Route path="/entities/:tableName/:entityId"  component={ EntityEdit} />
        </Switch>

      
    </Layout>
  )
}

export default App
