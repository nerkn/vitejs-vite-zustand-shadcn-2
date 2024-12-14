import { create } from 'zustand';
import axios from 'axios';
import { siteConfig } from '@/config/site';

interface EntityActions {
  get: (filter: Record<string, any>, refresh?: boolean) => Promise<any[]>;
  set: (id: number, data: Record<string, any>) => Promise<void>;
  delete: (id: number) => Promise<void>;
  fetchAll: () => Promise<void>;
}

type EntityStoreState = Record<string, any[]>;

export const useEntityStore = create<EntityStoreState>(() => ({}));

export function useEntity(entityType: string): EntityActions {
  const store = useEntityStore();

  const get = async (filter: Record<string, any>, refresh: boolean = false): Promise<any[]> => {
    const entities = store[entityType] || [];

    // Check if data is already cached
    const filtered = entities.filter((entity) =>
      Object.entries(filter).every(([key, value]) => entity[key]?.toString().includes(value.toString()))
    );

    if (filtered.length > 0 && !refresh) {
      return filtered;
    }

    // Fetch from backend if data is not cached or refresh is true
    try {
      const response = await axios.get(`${siteConfig.backend.url}/v1/${entityType}`, { params: { where: filter } });
      useEntityStore.setState((state) => ({
        [entityType]: response.data,
      }));
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch ${entityType}:`, error);
      return [];
    }
  };

  const set = async (id: number, data: Record<string, any>) => {
    try {
      const response = await axios.post(`${siteConfig.backend.url}/v1/${entityType}`, { id, ...data });
      useEntityStore.setState((state) => ({
        [entityType]: state[entityType]?.map((entity) =>
          entity.id === id ? { ...entity, ...response.data } : entity
        ) || [response.data],
      }));
    } catch (error) {
      console.error(`Failed to update ${entityType}:`, error);
    }
  };

  const del = async (id: number) => {
    try {
      await axios.delete(`${siteConfig.backend.url}/v1/${entityType}/${id}`);
      useEntityStore.setState((state) => ({
        [entityType]: state[entityType]?.filter((entity) => entity.id !== id),
      }));
    } catch (error) {
      console.error(`Failed to delete ${entityType}:`, error);
    }
  };

  const fetchAll = async () => {
    try {
      const response = await axios.get(`${siteConfig.backend.url}/v1/${entityType}`);
      useEntityStore.setState((state) => ({
        [entityType]: response.data,
      }));
    } catch (error) {
      console.error(`Failed to fetch ${entityType}:`, error);
    }
  };

  return { get, set, delete: del, fetchAll };
}
