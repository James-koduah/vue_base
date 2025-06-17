<template>
    <div
        id="sidebar"
        :class="['sidebar', expandSideBar ? 'sidebar-expanded' : 'sidebar-collapsed']"
    >
        <!-- Toggle Button -->
        <div class="sidebar-toggle">
            <button @click="expandSideBar = !expandSideBar" class="toggle-btn">
                <SvgIcons :icon="expandSideBar ? 'expandLeft' : 'expandRight'" color="white" />
            </button>
        </div>

        <!-- Navigation -->
        <nav class="sidebar-nav">
            <div class="group">
                <div class="nav-item">
                    <div class="icon-wrap">
                        <SvgIcons icon="dashboard" color="white" />
                    </div>
                    <span v-if="expandSideBar" class="nav-label">Dashboard</span>
                </div>
            </div>

            <div class="group">
                <div class="nav-item">
                    <div class="icon-wrap">
                        <SvgIcons icon="book" color="white" />
                    </div>
                    <span v-if="expandSideBar" class="nav-label">Courses</span>
                </div>
                <div class="nav-item">
                    <div class="icon-wrap">
                        <SvgIcons icon="homework" color="white" />
                    </div>
                    <span v-if="expandSideBar" class="nav-label">Assignments</span>
                </div>
                <div class="nav-item">
                    <div class="icon-wrap">
                        <SvgIcons icon="studentResults" color="white" />
                    </div>
                    <span v-if="expandSideBar" class="nav-label">Results</span>
                </div>
            </div>

            <div class="group">
                <div class="nav-item">
                    <div class="icon-wrap">
                        <SvgIcons icon="calender" color="white" />
                    </div>
                    <span v-if="expandSideBar" class="nav-label">Calendar</span>
                </div>
                <div class="nav-item">
                    <div class="icon-wrap">
                        <SvgIcons icon="calenderEvent" color="white" />
                    </div>
                    <span v-if="expandSideBar" class="nav-label">Events</span>
                </div>
                <div class="nav-item">
                    <div class="icon-wrap">
                        <SvgIcons icon="message" color="white" />
                    </div>
                    <span v-if="expandSideBar" class="nav-label">Messages</span>
                </div>
            </div>

            <div class="group">
                <div class="nav-item">
                    <div class="icon-wrap">
                        <SvgIcons icon="person" color="white" />
                    </div>
                    <span v-if="expandSideBar" class="nav-label">Profile</span>
                </div>
                <div class="nav-item">
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

export default {
    components: {
        SvgIcons
    },
    data() {
        return {
            currentRoute: this.$route.path,
            expandSideBar: true
        }
    },
    watch: {
        $route(to) {
            this.currentRoute = to.path
        }
    }
}
</script>

<style scoped>
.sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    background: var(--oynx);
    color: var(--cool-white);
    z-index: 100;
    display: flex;
    flex-direction: column;
    transition: width 0.3s cubic-bezier(0.4,0,0.2,1);
    overflow: hidden;
}
.sidebar-expanded {
    width: 220px;
}
.sidebar-collapsed {
    width: 50px;
}

.sidebar-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 56px;
    min-height: 56px;
    border-bottom: 1px solid var(--text-light);
    --svg-width: 25px;
    --svg-height: 25px;
    font-size: 3em;
}
.toggle-btn {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    width: 100%;
    padding: 0.5em;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
}
.toggle-btn:hover {
    background: var(--charcoal);
}

.sidebar-nav {
    flex: 1 1 auto;
    overflow-y: auto;
    padding-top: 8px;
}
.group {
    padding: 8px 0;
    border-bottom: 1px var(--text-light) solid;
}
.group:last-of-type {
    border: none;
}
.nav-item {
    display: flex;
    align-items: center;
    height: 44px;
    margin: 4px 0;
    padding: 0 12px;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.2s, padding 0.3s;
    position: relative;
}
.nav-item:hover {
    background: var(--charcoal);
}
.icon-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    width: 32px;
    height: 32px;
    --svg-width: 20px;
    --svg-height: 20px;
    font-size: 3em;
}
.nav-label {
    margin-left: 16px;
    white-space: nowrap;
    font-size: 1rem;
    color: var(--cool-white);
    transition: opacity 0.2s;
}
</style>
