import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    sidebarExpanded: true,
    notifications: [],
    user: null
  }),

  actions: {
    toggleSidebar() {
      this.sidebarExpanded = !this.sidebarExpanded;
    },
    
    setSidebarExpanded(expanded) {
      this.sidebarExpanded = expanded;
    },

    addNotification(notification) {
      this.notifications.push({
        id: Date.now(),
        timestamp: new Date(),
        ...notification
      });
    },

    removeNotification(id) {
      const index = this.notifications.findIndex(n => n.id === id);
      if (index > -1) {
        this.notifications.splice(index, 1);
      }
    },

    setUser(user) {
      this.user = user;
    }
  },

  getters: {
    unreadNotifications: (state) => state.notifications.filter(n => !n.read),
    unreadCount: (state) => state.notifications.filter(n => !n.read).length
  },
});