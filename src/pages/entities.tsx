import { useEffect } from 'react'
import { useEntitiesStore } from '@/stores/entities'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Link } from 'wouter'

export function Entities() {
  const { tables, columns, isLoading, error, fetchEntities, getTableColumns } = useEntitiesStore()

  useEffect(() => {
    fetchEntities()
  }, [fetchEntities])

  if (isLoading) {
    return <div>Loading database entities...</div>
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>
  }
  console.log("table s", tables);
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Database Entities</h1>
      
      <Accordion type="single" collapsible>
        {tables.map((tableName) => (
          <AccordionItem key={tableName} value={tableName}>
            <AccordionTrigger className="text-xl font-semibold">
              {tableName}
            </AccordionTrigger>
            <AccordionContent>
              <div className="mb-4">
                <Link href={`/entities/${tableName}/edit`}>{'Edit ' + tableName}</Link>
              </div>

              <Table>
                <TableCaption>Columns in {tableName}</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Comment</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getTableColumns(tableName).map((column) => (
                    <TableRow key={`${column.table}-${column.name}`}>
                      <TableCell className="font-medium">{column.name}</TableCell>
                      <TableCell>{column.type}</TableCell>
                      <TableCell>{column.comment}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}