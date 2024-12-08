import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { siteConfig } from '@/config/site'

interface ColumnDefinition {
  table: string
  name: string
  type: string
  comment: string
}

interface EntitiesState {
  tables: string[]
  columns: ColumnDefinition[]
  isLoading: boolean
  error: string | null
  // Actions
  fetchEntities: () => Promise<void>
  getTableColumns: (tableName: string) => ColumnDefinition[]
}

export const useEntities = create<EntitiesState>()(
  persist(
    (set, get) => ({
      tables: [],
      columns: [],
      isLoading: false,
      error: null,

      fetchEntities: async () => {
        try {
          set({ isLoading: true, error: null })
          const response = await fetch(`${siteConfig.backend.url}/v1/getAllTables`)
          if (!response.ok) {
            throw new Error('Failed to fetch database entities')
          }

          const data = await response.json()
          console.log("response", data)
          set({ 
            tables: data.data.tables,
            columns: data.data.columns,
            isLoading: false 
          })
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch entities',
            isLoading: false 
          })
        }
      },

      getTableColumns: (tableName: string) => {
        const state = get()
        return state.columns.filter(col => col.table === tableName)
      },
    }),
    {
      name: 'entities-storage',
      partialize: (state) => ({ 
        tables: state.tables,
        columns: state.columns
      }),
    }
  )
)