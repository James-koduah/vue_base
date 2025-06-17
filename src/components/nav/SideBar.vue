<template>
    <!-- Mobile Overlay Backdrop -->
    <div v-if="isMobile && expandSideBar" class="mobile-backdrop" @click="closeMobileSidebar"></div>
    
    <div
        id="sidebar"
        :class="['sidebar', expandSideBar ? 'sidebar-expanded' : 'sidebar-collapsed', isMobile ? 'sidebar-mobile' : 'sidebar-desktop']"
    >
        <!-- Toggle Button -->
        <div class="sidebar-toggle">
            <button @click="toggleSidebar" class="toggle-btn">
                <SvgIcons :icon="expandSideBar ? 'expandLeft' : 'expandRight'" color="white" />
            </button>
        </div>

        <!-- Theme Toggle Button -->
        <div class="theme-toggle-section">
            <button @click="toggleTheme" class="theme-toggle-btn" :title="themeStore.isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'">
                <SvgIcons :icon="themeStore.isDark ? 'sun' : 'moon'" color="white" />
                <span v-if="expandSideBar" class="theme-label">
                    {{ themeStore.isDark ? 'Light Mode' : 'Dark Mode' }}
                </span>
            </button>
        </div>

        <!-- Navigation -->
        <nav class="sidebar-nav">
            <div class="group">
                <div class="nav-item" @click="handleNavClick">
                    <div class="icon-wrap">
                        <SvgIcons icon="dashboard" color="white" />
                    </div>
                    <span v-if="expandSideBar" class="nav-label">Dashboard</span>
                </div>
            </div>

            <div class="group">
                <div class="nav-item" @click="handleNavClick">
                    <div class="icon-wrap">
                        <SvgIcons icon="book" color="white" />
                    </div>
                    <span v-if="expandSideBar" class="nav-label">Courses</span>
                </div>
                <div class="nav-item" @click="handleNavClick">
                    <div class="icon-wrap">
                        <SvgIcons icon="homework" color="white" />
                    </div>
                    <span v-if="expandSideBar" class="nav-label">Assignments</span>
                </div>
                <div class="nav-item" @click="handleNavClick">
                    <div class="icon-wrap">
                        <SvgIcons icon="studentResults" color="white" />
                    </div>
                    <span v-if="expandSideBar" class="nav-label">Results</span>
                </div>
            </div>

            <div class="group">
                <div class="nav-item" @click="handleNavClick">
                    <div class="icon-wrap">
                        <SvgIcons icon="calender" color="white" />
                    </div>
                    <span v-if="expandSideBar" class="nav-label">Calendar</span>
                </div>
                <div class="nav-item" @click="handleNavClick">
                    <div class="icon-wrap">
                        <SvgIcons icon="calenderEvent" color="white" />
                    </div>
                    <span v-if="expandSideBar" class="nav-label">Events</span>
                </div>
                <div class="nav-item" @click="handleNavClick">
                    <div class="icon-wrap">
                        <SvgIcons icon="message" color="white" />
                    </div>
                    <span v-if="expandSideBar" class="nav-label">Messages</span>
                </div>
            </div>

            <div class="group">
                <div class="nav-item" @click="handleNavClick">
                    <div class="icon-wrap">
                        <SvgIcons icon="person" color="white" />
                    </div>
                    <span v-if="expandSideBar" class="nav-label">Profile</span>
                </div>
                <div class="nav-item" @click="handleNavClick">
                    <div class="icon-wrap">
                        <SvgIcons icon="settings" color="white" />
                    </div>
                    <span v-if="expandSideBar" class="nav-label">Settings</span>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import SvgIcons from '../utils/SvgIcons.vue';
import { useThemeStore } from '../../stores/themeStore';

export default {
    components: {
        SvgIcons
    },
    data() {
        return {
            currentRoute: this.$route.path,
            expandSideBar: true,
            themeStore: useThemeStore(),
            isMobile: false
        }
    },
    mounted() {
        this.checkMobile();
        window.addEventListener('resize', this.checkMobile);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.checkMobile);
    },
    methods: {
        toggleTheme() {
            this.themeStore.toggleTheme();
        },
        toggleSidebar() {
            this.expandSideBar = !this.expandSideBar;
            this.$emit('sidebar-toggle', this.expandSideBar);
        },
        closeMobileSidebar() {
            if (this.isMobile) {
                this.expandSideBar = false;
                this.$emit('sidebar-toggle', this.expandSideBar);
            }
        },
        checkMobile() {
            const wasMobile = this.isMobile;
            this.isMobile = window.innerWidth < 650;
            
            // Close sidebar when switching to mobile
            if (!wasMobile && this.isMobile) {
                this.expandSideBar = false;
                this.$emit('sidebar-toggle', this.expandSideBar);
            }
            // Open sidebar when switching to desktop
            else if (wasMobile && !this.isMobile) {
                this.expandSideBar = true;
                this.$emit('sidebar-toggle', this.expandSideBar);
            }
        },
        handleNavClick() {
            // Close mobile sidebar when clicking nav items
            if (this.isMobile && this.expandSideBar) {
                this.closeMobileSidebar();
            }
        }
    },
    emits: ['sidebar-toggle'],
    watch: {
        $route(to) {
            this.currentRoute = to.path
        }
    }
}
</script>

<style scoped>
/* Mobile Backdrop */
.mobile-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: calc(var(--z-fixed) - 1);
    opacity: 1;
    transition: opacity var(--transition);
}

.sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    background: var(--sidebar-bg);
    color: var(--sidebar-text);
    z-index: var(--z-fixed);
    display: flex;
    flex-direction: column;
    transition: width var(--transition), background-color var(--transition), transform var(--transition);
    overflow: hidden;
    box-shadow: var(--shadow);
}

/* Desktop Sidebar */
.sidebar-desktop.sidebar-expanded {
    width: 220px;
    transform: translateX(0);
}
.sidebar-desktop.sidebar-collapsed {
    width: 60px;
    transform: translateX(0);
}

/* Mobile Sidebar */
.sidebar-mobile {
    width: 280px;
    z-index: var(--z-fixed);
}
.sidebar-mobile.sidebar-expanded {
    transform: translateX(0);
}
.sidebar-mobile.sidebar-collapsed {
    transform: translateX(-100%);
}

/* Mobile Media Query */
@media (max-width: 650px) {
    .sidebar-desktop {
        display: none;
    }
    
    .sidebar-mobile {
        display: flex;
    }
}

@media (min-width: 651px) {
    .sidebar-mobile {
        display: none;
    }
    
    .sidebar-desktop {
        display: flex;
    }
    
    .mobile-backdrop {
        display: none;
    }
}

.sidebar-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 56px;
    min-height: 56px;
    border-bottom: 1px solid var(--sidebar-border);
    --svg-width: 22px;
    --svg-height: 22px;
}
.toggle-btn {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    width: 100%;
    padding: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color var(--transition-fast);
    border-radius: var(--radius);
}
.toggle-btn:hover {
    background: var(--sidebar-hover);
}

/* Theme Toggle Section */
.theme-toggle-section {
    padding: 8px 12px;
    border-bottom: 1px solid var(--sidebar-border);
}
.theme-toggle-btn {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    width: 100%;
    padding: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 16px;
    transition: background-color var(--transition-fast);
    border-radius: var(--radius);
    --svg-width: 20px;
    --svg-height: 20px;
}
.theme-toggle-btn:hover {
    background: var(--sidebar-hover);
}

/* Center theme toggle when collapsed */
.sidebar-collapsed .theme-toggle-btn {
    justify-content: center;
    gap: 0;
}
.theme-label {
    font-size: 0.875rem;
    font-weight: 500;
    white-space: nowrap;
    transition: opacity var(--transition-fast);
}

.sidebar-nav {
    flex: 1 1 auto;
    overflow-y: auto;
    padding-top: 8px;
    scrollbar-width: thin;
    scrollbar-color: var(--sidebar-hover) transparent;
}
.sidebar-nav::-webkit-scrollbar {
    width: 6px;
}
.sidebar-nav::-webkit-scrollbar-track {
    background: transparent;
}
.sidebar-nav::-webkit-scrollbar-thumb {
    background: var(--sidebar-hover);
    border-radius: 3px;
}
.group {
    padding: 8px 0;
    border-bottom: 1px solid var(--sidebar-border);
}
.group:last-of-type {
    border: none;
}
.nav-item {
    display: flex;
    align-items: center;
    height: 44px;
    margin: 4px 12px;
    padding: 0 12px;
    border-radius: var(--radius);
    cursor: pointer;
    transition: background-color var(--transition-fast), transform var(--transition-fast);
    position: relative;
}

/* Perfect centering for collapsed sidebar */
.sidebar-collapsed .nav-item {
    margin: 4px 8px;
    padding: 0;
    justify-content: center;
}

.sidebar-collapsed .icon-wrap {
    margin: 0;
}
.nav-item:hover {
    background: var(--sidebar-hover);
    transform: translateX(2px);
}
.nav-item:active {
    transform: translateX(0);
}
.icon-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 20px;
    width: 20px;
    height: 20px;
    --svg-width: 20px;
    --svg-height: 20px;
}
.nav-label {
    margin-left: 16px;
    white-space: nowrap;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--sidebar-text);
    transition: opacity var(--transition-fast);
}
</style>
