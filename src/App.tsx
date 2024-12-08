import {Layout} from './components/layout/layout'
import './App.css'
import { Route } from 'wouter'
import { Entities } from './pages/entities'
import { EntitiesList } from './pages/entities/list'
import { useEntities } from './stores/entities';

function App() {
  useEntities();

  return (
    <Layout>
        <Route path="/" >
        </Route>
        <Route path="/entities" >
          <Route path="/entities/:tableName"  component={ EntitiesList} />
          <Entities />
        </Route>

      
    </Layout>
  )
}

export default App
