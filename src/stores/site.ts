import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface SeoSettings {
  title: string
  description: string
  keywords: string
  ogImage?: string
}

interface SiteSettings {
  name: string
  logo: string
  favicon?: string
  primaryColor?: string
  seo: SeoSettings
}

interface SiteState {
  settings: SiteSettings | null
  isLoading: boolean
  error: string | null
  // Actions
  fetchSettings: () => Promise<void>
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<void>
}

const DEFAULT_SETTINGS: SiteSettings = {
  name: '',
  logo: '',
  seo: {
    title: '',
    description: '',
    keywords: ''
  }
}

export const useSiteStore = create<SiteState>()(
  persist(
    (set, get) => ({
      settings: DEFAULT_SETTINGS,
      isLoading: false,
      error: null,

      fetchSettings: async () => {
        try {
          set({ isLoading: true, error: null })
          // Replace with your API endpoint
          const response = await fetch('/api/settings')
          if (!response.ok) throw new Error('Failed to fetch settings')
          
          const settings = await response.json()
          set({ settings, isLoading: false })
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch settings',
            isLoading: false 
          })
        }
      },

      updateSettings: async (newSettings) => {
        try {
          set({ isLoading: true, error: null })
          // Replace with your API endpoint
          const response = await fetch('/api/settings', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newSettings),
          })
          
          if (!response.ok) throw new Error('Failed to update settings')
          
          const updatedSettings = await response.json()
          set({ 
            settings: updatedSettings,
            isLoading: false 
          })
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to update settings',
            isLoading: false 
          })
        }
      },
    }),
    {
      name: 'site-settings-storage',
      storage: createJSONStorage(() => localStorage),
      // Only persist these fields
      partialize: (state) => ({ 
        settings: state.settings 
      }),
    }
  )
)