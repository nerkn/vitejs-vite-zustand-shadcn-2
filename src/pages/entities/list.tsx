import { siteConfig } from '@/config/site';
import { useEntities } from '@/stores/entities'
import axios from 'axios' 
import { useEffect, useState } from 'react'; 
import { Link } from 'wouter';

export function EntitiesList({ params}: { params: {tableName:string} }) {

  const { columns:columnsAll } = useEntities()
  const [data, setData] = useState<any[]>([]);
  const [filter, setFilter] = useState('');
  const [filterValue, setFilterValue]   = useState('');
  let tableName = params.tableName.replace(siteConfig.backend.tablePrefix, '');
  let columns = columnsAll.filter(column=>column.table==tableName)

  useEffect(() => {
    let where = (filter && filterValue)?`?where=${filter}+like+%${filterValue}%`:''
    axios.get(`${siteConfig.backend.url}/v1/${tableName}${where}`)
      .then(response => {
        console.log(response.data);
        if(!response.data) 
          setData([]);
        setData(response.data.data);
      })
  }, [filter, filterValue]);


  return (
    <div>EntitiesList
    <form>
        <select onChange={e => setFilter(e.target.value)}>
          <option value="">All</option>
          {columns.map(column => <option key={column.name} value={column.name}>{column.name}</option>)}
        </select>
      <input type="text" onChange={e => setFilterValue(e.target.value)} />
    </form>
    <Link href={`/entities/${tableName}/new`}> New </Link>
    <table>
      <thead>
        <tr>
          {columns.map(column => <th key={column.name}>{column.name}</th>)}
        </tr>
      </thead>
      <tbody>
        {data && data.map(row => (
          <tr key={row.id}>
            {columns.map(column => <td key={column.name}>{row[column.name]}</td>)}
            <td><Link href={`/entities/${tableName}/${row.id}`}> edit </Link></td>
    
          </tr>
        ))}
      </tbody>
    </table>
    </div>
 
  )
}
