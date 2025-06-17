<template>
    <!-- Sidebar for desktop/tablet -->
    <div v-if="!screenSize.isMobile"
        :class="['sidebar', expanded ? 'sidebar-expanded' : 'sidebar-collapsed', getThemeStyle(theme, 'sidebar', 'shadow'), getThemeStyle(theme, 'sidebar', 'background')]"
        :style="{ height: 'calc(100vh - 50px)', top: '50px' }">
        <!-- Organization Header -->
        <div class="sidebar-header">
            <div class="sidebar-header-row">
                <div class="sidebar-header-icon">
                    <Building2 :class="['sidebar-org-icon', getThemeStyle(theme, 'text', 'secondary')]"></Building2>
                </div>
                <div class="sidebar-org-name-wrapper" :style="{
                    transform: expanded ? 'scaleX(1)' : 'scaleX(0)',
                    opacity: expanded ? 1 : 0,
                    transition: 'transform 300ms ease-in-out, opacity 200ms ease-in-out'
                }">
                    <span :class="['sidebar-org-name', getThemeStyle(theme, 'text', 'primary')]">
                        Teemboom Chat
                    </span>
                </div>
            </div>
        </div>

        <!-- Navigation -->
        <nav class="sidebar-nav">
            <RouterLink v-for="item in navigation" :key="item.name" :to="item.path" :title="item.name" :class="[
                'sidebar-nav-item',
                expanded ? 'sidebar-nav-item-expanded' : 'sidebar-nav-item-collapsed',
                isActive(item.path)
                    ? [getThemeStyle(theme, 'sidebar', 'itemActive'), getThemeStyle(theme, 'sidebar', 'itemActiveText')]
                    : [getThemeStyle(theme, 'text', 'secondary'), getThemeStyle(theme, 'sidebar', 'itemHover')]
            ]">
                <div class="sidebar-nav-icon-wrapper">
                    <component :is="item.icon"
                        :class="['sidebar-nav-icon', isActive(item.path) ? getThemeStyle(theme, 'text', 'inverse') : getThemeStyle(theme, 'text', 'accent')]"></component>
                </div>
                <div class="sidebar-nav-label-wrapper" :style="{
                    transform: expanded ? 'scaleX(1)' : 'scaleX(0)',
                    opacity: expanded ? 1 : 0,
                    transition: 'transform 300ms ease-in-out, opacity 200ms ease-in-out'
                }">
                    <span class="sidebar-nav-label">{{ item.name }}</span>
                </div>
            </RouterLink>
        </nav>

        <!-- Sign Out Button -->
        <div class="sidebar-signout-wrapper">
            <button @click="showSignOutConfirm = true" title="Sign out" :class="[
                'sidebar-signout',
                expanded ? 'sidebar-signout-expanded' : 'sidebar-signout-collapsed',
                getThemeStyle(theme, 'text', 'secondary'),
                getThemeStyle(theme, 'interactive', 'hover', 'background')
            ]">
                <div class="sidebar-signout-icon-wrapper">
                    <LogOut class="sidebar-signout-icon" />
                </div>
                <div class="sidebar-signout-label-wrapper" :style="{
                    transform: expanded ? 'scaleX(1)' : 'scaleX(0)',
                    opacity: expanded ? 1 : 0,
                    transition: 'transform 300ms ease-in-out, opacity 200ms ease-in-out'
                }">
                    <span class="sidebar-signout-label">Sign out</span>
                </div>
            </button>
        </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="screenSize.isMobile"
        :class="['sidebar-mobile-overlay', isMobileMenuOpen ? 'sidebar-mobile-overlay-open' : 'sidebar-mobile-overlay-closed']">
        <div class="sidebar-mobile-backdrop" @click="isMobileMenuOpen = false" />
        <div :class="[
            'sidebar-mobile',
            theme === 'dark' ? 'sidebar-mobile-dark' : 'sidebar-mobile-light',
            isMobileMenuOpen ? 'sidebar-mobile-open' : 'sidebar-mobile-closed'
        ]" :style="{ top: '50px', height: 'calc(100vh - 50px)' }">
            <!-- Organization Header -->
            <div class="sidebar-mobile-header">
                <div class="sidebar-mobile-header-row">
                    <div class="sidebar-mobile-header-org">
                        <Building2
                            :class="['sidebar-mobile-org-icon', theme === 'dark' ? 'sidebar-mobile-org-icon-dark' : 'sidebar-mobile-org-icon-light']" />
                        <span
                            :class="['sidebar-mobile-org-name', theme === 'dark' ? 'sidebar-mobile-org-name-dark' : 'sidebar-mobile-org-name-light']">
                            {{ organization.name }}
                        </span>
                    </div>
                    <button @click="isMobileMenuOpen = false"
                        :class="theme === 'dark' ? 'sidebar-mobile-close-dark' : 'sidebar-mobile-close-light'">
                        <X class="sidebar-mobile-close-icon" />
                    </button>
                </div>
            </div>

            <!-- Mobile Navigation -->
            <nav class="sidebar-mobile-nav">
                <RouterLink v-for="item in navigation" :key="item.name" :to="item.path"
                    @click.native="isMobileMenuOpen = false" :class="[
                        'sidebar-mobile-nav-item',
                        isActive(item.path)
                            ? [getThemeStyle(theme, 'sidebar', 'itemActive'), getThemeStyle(theme, 'sidebar', 'itemActiveText')]
                            : [getThemeStyle(theme, 'text', 'secondary'), getThemeStyle(theme, 'sidebar', 'itemHover')]
                    ]">
                    <component :is="item.icon"
                        :class="['sidebar-mobile-nav-icon', theme === 'dark' ? 'sidebar-mobile-nav-icon-dark' : 'sidebar-mobile-nav-icon-light']" />
                    <span class="sidebar-mobile-nav-label">{{ item.name }}</span>
                </RouterLink>
            </nav>

            <!-- Mobile Sign Out Button -->
            <div class="sidebar-mobile-signout-wrapper">
                <button @click="showSignOutConfirm = true" :class="[
                    'sidebar-mobile-signout',
                    theme === 'dark' ? 'sidebar-mobile-signout-dark' : 'sidebar-mobile-signout-light'
                ]">
                    <LogOut class="sidebar-mobile-signout-icon" />
                    <span>Sign out</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { Building2, ChevronLeft, ChevronRight, LogOut, X } from 'lucide-vue-next'

const props = defineProps({
    expanded: {
        type: Boolean,
        default: true
    }
})
const screenSize = ref({ isMobile: false })
const isMobileMenuOpen = ref(false)
const showSignOutConfirm = ref(false)

const route = useRoute()

const organization = ref({ name: 'My Org' })
const navigation = ref([
    { name: 'Dashboard', path: '/dashboard', icon: Building2 },
    { name: 'Settings', path: '/settings', icon: ChevronRight }
])

const theme = ref('light')

function getThemeStyle(theme, category, element, type = '') {
    // You can define your theme logic here
    return ''
}

function isActive(path) {
    return route.path === path || (path !== '/dashboard' && route.path.startsWith(path))
}
</script>

<style scoped>
.sidebar {
    position: fixed;
    top: 50px;
    left: 0;
    z-index: 200;
    height: 100vh;
    width: 48px; /* w-12 */
    box-shadow: 0 10px 15px -3px rgba(17, 24, 39, 0.7), 0 4px 6px -4px rgba(17, 24, 39, 0.7); /* shadow-lg shadow-gray-900 */
    will-change: transform;
    transition: width 0.3s ease-in-out;
    overflow: hidden;
    background-color: #1f2937; /* bg-gray-800 */
}

.sidebar-expanded {
    width: 256px;
}

.sidebar-collapsed {
    width: 48px;
}

.sidebar-header {
    padding: 8px;
}

.sidebar-header-row {
    display: flex;
    align-items: center;
    position: relative;
}

.sidebar-header-icon {
    position: absolute;
    left: 0;
    z-index: 10;
}

.sidebar-org-icon {
    height: 24px;
    width: 24px;
    min-width: 24px;
}

.sidebar-org-name-wrapper {
    margin-left: 32px;
    transform-origin: left;
}

.sidebar-org-name {
    font-size: 1.125rem;
    font-weight: 600;
    white-space: nowrap;
}

.sidebar-nav {
    overflow-y: auto;
    max-height: calc(100vh - 8rem);
}

.sidebar-nav-item {
    display: flex;
    align-items: center;
    position: relative;
    border-radius: 6px;
    transition: padding 0.2s, margin 0.2s, background-color 0.2s;
    padding-top: 10px;
    padding-bottom: 10px;
}

.sidebar-nav-item-expanded {
    padding-left: 12px;
    padding-right: 12px;
    margin-left: 8px;
    margin-right: 8px;
}

.sidebar-nav-item-collapsed {
    padding-left: 6px;
    padding-right: 6px;
}

.sidebar-nav-icon-wrapper {
    position: absolute;
    left: 12px;
    z-index: 10;
}

.sidebar-nav-icon {
    height: 20px;
    width: 20px;
}

.sidebar-nav-label-wrapper {
    margin-left: 32px;
    transform-origin: left;
}

.sidebar-nav-label {
    font-size: 0.875rem;
    font-weight: 500;
    white-space: nowrap;
}

.sidebar-signout-wrapper {
    position: absolute;
    bottom: 16px;
    width: 100%;
}

.sidebar-signout {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    border-radius: 10px;
    transition: padding 0.2s, margin 0.2s, background-color 0.2s;
    padding-top: 10px;
    padding-bottom: 10px;
}

.sidebar-signout-expanded {
    padding-left: 12px;
    padding-right: 12px;
    margin-left: 8px;
    margin-right: 8px;
}

.sidebar-signout-collapsed {
    padding-left: 6px;
    padding-right: 6px;
}

.sidebar-signout-icon-wrapper {
    position: absolute;
    left: 12px;
    z-index: 10;
}

.sidebar-signout-icon {
    height: 20px;
    width: 20px;
}

.sidebar-signout-label-wrapper {
    margin-left: 32px;
    transform-origin: left;
}

.sidebar-signout-label {
    font-size: 0.875rem;
    font-weight: 500;
    white-space: nowrap;
}

/* Mobile styles */
.sidebar-mobile-overlay {
    position: fixed;
    inset: 0;
    z-index: 50;
}

.sidebar-mobile-overlay-open {
    display: block;
}

.sidebar-mobile-overlay-closed {
    display: none;
}

.sidebar-mobile-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
}

.sidebar-mobile {
    position: fixed;
    top: 50px;
    left: 0;
    z-index: 200;
    height: 100vh;
    width: 256px;
    box-shadow: 0 10px 15px -3px rgba(17, 24, 39, 0.7), 0 4px 6px -4px rgba(17, 24, 39, 0.7);
    will-change: transform;
    transition: transform 0.3s ease-in-out;
    overflow: hidden;
    background-color: #1f2937;
}

.sidebar-mobile-dark {
    background: #2d3748;
}

.sidebar-mobile-light {
    background: #fff;
}

.sidebar-mobile-open {
    transform: translateX(0);
}

.sidebar-mobile-closed {
    transform: translateX(-100%);
}

.sidebar-mobile-header {
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.sidebar-mobile-header-row {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
}

.sidebar-mobile-header-org {
    display: flex;
    align-items: center;
    gap: 8px;
}

.sidebar-mobile-org-icon {
    height: 24px;
    width: 24px;
}

.sidebar-mobile-org-icon-dark {
    color: #d1d5db;
}

.sidebar-mobile-org-icon-light {
    color: #374151;
}

.sidebar-mobile-org-name {
    font-size: 1.125rem;
    font-weight: 600;
}

.sidebar-mobile-org-name-dark {
    color: #fff;
}

.sidebar-mobile-org-name-light {
    color: #111827;
}

.sidebar-mobile-close-dark {
    color: #9ca3af;
}

.sidebar-mobile-close-light {
    color: #6b7280;
}

.sidebar-mobile-close-icon {
    height: 24px;
    width: 24px;
}

.sidebar-mobile-nav {
    margin-top: 8px;
    overflow-y: auto;
    max-height: calc(100vh - 8rem);
}

.sidebar-mobile-nav-item {
    display: flex;
    align-items: center;
    padding: 12px 16px;
}

.sidebar-mobile-nav-icon {
    height: 20px;
    width: 20px;
    margin-right: 12px;
}

.sidebar-mobile-nav-icon-dark {
    color: #9ca3af;
}

.sidebar-mobile-nav-icon-light {
    color: #9ca3af;
}

.sidebar-mobile-nav-label {
    font-size: 0.875rem;
    font-weight: 500;
}

.sidebar-mobile-signout-wrapper {
    position: absolute;
    bottom: 16px;
    width: 100%;
    padding-left: 16px;
    padding-right: 16px;
}

.sidebar-mobile-signout {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    padding: 8px 16px;
}

.sidebar-mobile-signout-dark {
    color: #d1d5db;
    background: #374151;
}

.sidebar-mobile-signout-light {
    color: #374151;
    background: #f3f4f6;
}

.sidebar-mobile-signout-icon {
    height: 20px;
    width: 20px;
    margin-right: 8px;
}

@media (max-width: 650px) {
    .sidebar {
        display: none;
    }
    .sidebar-mobile {
        display: block;
    }
}
</style>