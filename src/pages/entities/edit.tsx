import { useEntities } from "@/stores/entities";
import { useEntity } from "@/stores/entityDatas";
import { useEffect, useState } from "react";

export function EntityEdit ({ params}: { params: {tableName:string, entityId?:string}} ){
    const { columns:columnsAll } = useEntities()
    const [entity, entitySet] = useState<any[]>([]);
    let tableName = params.tableName;
    let entityId  = params.entityId;
    let columns = columnsAll.filter(column=>column.table==tableName)
    let entityGetter =  useEntity(tableName)    
    useEffect(()=>{
        entityGetter.
        get({id:entityId}).
        then(r=>entitySet(r))
    },[tableName, entityId])

    return <form>
        {entityId?'Edit':'Create'}
        {columns.map(col=><div>
            <div>{col.name}</div>
            <input name={col.name} value={entity[col.name]} />
        </div>)}
            <div><input type="submit" /></div>
    </form>
}