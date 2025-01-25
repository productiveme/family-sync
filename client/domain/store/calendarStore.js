import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCalendarStore = create(
  persist(
    (set, get) => ({
      activities: [],
      profiles: [],
      selectedProfile: null,
      filters: {
        activityType: null,
        profileId: null
      },

      addActivity: (activity) => {
        set((state) => ({
          activities: [...state.activities, { ...activity, id: Date.now() }]
        }));
      },

      updateActivity: (id, updates) => {
        set((state) => ({
          activities: state.activities.map((activity) =>
            activity.id === id ? { ...activity, ...updates } : activity
          )
        }));
      },

      deleteActivity: (id) => {
        set((state) => ({
          activities: state.activities.filter((activity) => activity.id !== id)
        }));
      },

      addProfile: (profile) => {
        set((state) => ({
          profiles: [...state.profiles, { ...profile, id: Date.now() }]
        }));
      },

      setSelectedProfile: (profileId) => {
        set({ selectedProfile: profileId });
      },

      setFilters: (filters) => {
        set({ filters });
      },

      getFilteredActivities: () => {
        const state = get();
        return state.activities.filter((activity) => {
          if (state.filters.activityType && activity.type !== state.filters.activityType) {
            return false;
          }
          if (state.filters.profileId && activity.profileId !== state.filters.profileId) {
            return false;
          }
          return true;
        });
      }
    }),
    {
      name: 'family-calendar-storage'
    }
  )
);

export default useCalendarStore;
