import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { siteConfig } from '@/config/site'

interface RelationDefinition {
  id: number
  entityType1: string
  entityType2: string
  relationName: string
  extraTable: string
}

interface Relation {
  entity1Id: number
  entity2Id: number
  relationId: number
  jsonField: Record<string, any>
  extraTableRowId: number
}

interface RelatedEntity {
  id: number
  type: string
  data: any // Entity data
  relation: {
    jsonField: Record<string, any>
    extraTableData?: any
  }
}

interface RelationsState {
  definitions: RelationDefinition[]
  relations: Relation[]
  isLoading: boolean
  error: string | null
  // Actions
  fetchRelationDefinitions: () => Promise<void>
  getRelationsForEntity: (entityType: string, entityId: number) => Promise<Record<string, RelatedEntity[]>>
  getRelatedEntities: (
    entityType: string, 
    entityId: number, 
    relationName: string
  ) => Promise<RelatedEntity[]>
  addRelation: (
    entity1Type: string,
    entity1Id: number,
    entity2Type: string,
    entity2Id: number,
    relationName: string,
    jsonField?: Record<string, any>
  ) => Promise<void>
}

export const useRelationsStore = create<RelationsState>()(
  persist(
    (set, get) => ({
      definitions: [],
      relations: [],
      isLoading: false,
      error: null,

      fetchRelationDefinitions: async () => {
        try {
          set({ isLoading: true, error: null })
          const response = await fetch(`${siteConfig.backend.url}/v1/getRelationDefinitions`)
          
          if (!response.ok) {
            throw new Error('Failed to fetch relation definitions')
          }

          const data = await response.json()
          set({ 
            definitions: data.definitions,
            isLoading: false 
          })
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch relations',
            isLoading: false 
          })
        }
      },

      getRelationsForEntity: async (entityType: string, entityId: number) => {
        try {
          set({ isLoading: true, error: null })
          const response = await fetch(
            `${siteConfig.backend.url}/v1/getEntityRelations?type=${entityType}&id=${entityId}`
          )
          
          if (!response.ok) {
            throw new Error('Failed to fetch entity relations')
          }

          const data = await response.json()
          set({ isLoading: false })
          return data.relations
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch entity relations',
            isLoading: false 
          })
          return {}
        }
      },

      getRelatedEntities: async (entityType: string, entityId: number, relationName: string) => {
        try {
          set({ isLoading: true, error: null })
          const response = await fetch(
            `${siteConfig.backend.url}/v1/getRelatedEntities?` + 
            `type=${entityType}&id=${entityId}&relation=${relationName}`
          )
          
          if (!response.ok) {
            throw new Error('Failed to fetch related entities')
          }

          const data = await response.json()
          set({ isLoading: false })
          return data.entities
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch related entities',
            isLoading: false 
          })
          return []
        }
      },

      addRelation: async (
        entity1Type: string,
        entity1Id: number,
        entity2Type: string,
        entity2Id: number,
        relationName: string,
        jsonField: Record<string, any> = {}
      ) => {
        try {
          set({ isLoading: true, error: null })
          const response = await fetch(`${siteConfig.backend.url}/v1/addRelation`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              entity1Type,
              entity1Id,
              entity2Type,
              entity2Id,
              relationName,
              jsonField,
            }),
          })
          
          if (!response.ok) {
            throw new Error('Failed to add relation')
          }

          set({ isLoading: false })
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to add relation',
            isLoading: false 
          })
        }
      },
    }),
    {
      name: 'relations-storage',
      partialize: (state) => ({ 
        definitions: state.definitions
      }),
    }
  )
)