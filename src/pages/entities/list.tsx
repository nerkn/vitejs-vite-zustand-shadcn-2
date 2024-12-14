import { siteConfig } from '@/config/site';
import { useEntitiesStore } from '@/stores/entities'
import axios from 'axios' 
import { useEffect, useState } from 'react'; 

export function EntitiesList({ params}: { params: {tableName:string} }) {
  const { columns } = useEntitiesStore()
  const [data, setData] = useState<any[]>([]);
  const [filter, setFilter] = useState('');
  const [filterValue, setFilterValue]   = useState('');
  let tableName = params.tableName.replace(siteConfig.backend.tablePrefix, '');

  useEffect(() => {
    let filterNow = (filter && filterValue) ? `where=${filter}=${filterValue}` : '';
    axios.get(`${siteConfig.backend.url}/v1/${tableName}?${filterNow}`)
      .then(response => {
        console.log(response.data);
        if(!response.data) 
          setData([]);
        setData(response.data.data);
      })
  }, [filter, filterValue]);

  return (
    <div>
    <form>
        <select onChange={e => setFilter(e.target.value)}>
          <option value="">All</option>
          {columns.map(column => <option key={column.name} value={column.name}>{column.name}</option>)}
        </select>
      <input type="text" onChange={e => setFilterValue(e.target.value)} />
    </form>

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
          </tr>
        ))}
      </tbody>
    </table>
    </div>
 
  )
}
