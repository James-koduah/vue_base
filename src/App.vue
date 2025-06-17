<template>
  <main id="main">
    <!-- Mobile Menu Button -->
    <button v-if="isMobile" @click="toggleMobileSidebar" class="mobile-menu-btn">
      <span class="menu-icon"></span>
      <span class="menu-icon"></span>
      <span class="menu-icon"></span>
    </button>
    
    <SideBar ref="sidebar" @sidebar-toggle="handleSidebarToggle" />
    <div id="shell" :class="shellClass">
      <RouterView />
    </div>
  </main>
</template>

<script>
import SideBar from './components/nav/SideBar.vue';

export default {
  name: 'App',
  components: {
    SideBar
  },
  data() {
    return {
      sidebarExpanded: true,
      isMobile: false
    }
  },
  computed: {
    shellClass() {
      return {
        'shell-desktop-expanded': !this.isMobile && this.sidebarExpanded,
        'shell-desktop-collapsed': !this.isMobile && !this.sidebarExpanded,
        'shell-mobile': this.isMobile
      }
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
    handleSidebarToggle(expanded) {
      this.sidebarExpanded = expanded;
    },
    toggleMobileSidebar() {
      this.$refs.sidebar.toggleSidebar();
    },
    checkMobile() {
      this.isMobile = window.innerWidth < 650;
    }
  }
}
</script>

<style>
@font-face {
    font-family: 'Cabin';
    src: url('@/assets/fonts/Cabin-VariableFont_wdth,wght.ttf') format('truetype');
    font-weight: 100 900;
    font-style: normal;
}

*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

:root{
  --cool-white: #fafafc;
  --white: #ffffff;
  --deep-blue: #202531;
  --soft-gray: #e3e8e9;
  --charcoal: #282828;
  --success-green: #27AE60;
  --error-red: #E74C3C;
  --text-normal: #34495E;
  --text-deep: #000;
  --text-light: #666;
  --yellow: #ffc403;
  --bright-red: #cc2131;
  --oynx: #121212;
  --shadow: 0px 2px 2px 2px var(--soft-gray);

}

input:focus, textarea:focus{
    outline: none;
}
input, textarea, button{
	border: none;
	color: inherit;
}
button, a{
    cursor: pointer;
}
button{
  background: inherit
}
a{
    text-decoration: none;
    color: inherit;
}
img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
a{
    text-decoration: none;
}
body{
  width: 100vw;
  height: fit-content;
  font-size: 5px;
  font-family: 'Cabin';
  color: var(--text-normal);
  overflow-x: hidden;
}
#main{
  width: 100%;
  display: flex;
}
#app{
  width: 100vw;
  height: fit-content;
  display: flex;
}

#shell{
  min-height: 100vh;
  background: var(--cool-white);
  padding: 30px;
  transition: margin-left 0.3s ease, width 0.3s ease;
}

/* Desktop - Expanded Sidebar */
.shell-desktop-expanded {
  margin-left: 220px;
  width: calc(100vw - 220px);
}

/* Desktop - Collapsed Sidebar */
.shell-desktop-collapsed {
  margin-left: 60px;
  width: calc(100vw - 60px);
}

/* Mobile - Full width with sidebar overlay */
.shell-mobile {
  margin-left: 0;
  width: 100vw;
}

/* Mobile Responsive */
@media (max-width: 650px) {
  #shell {
    padding: 20px 15px;
  }
  
  .shell-mobile {
    width: 100%;
  }
}

/* Mobile Menu Button */
.mobile-menu-btn {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: calc(var(--z-fixed) + 1);
  background: var(--deep-blue);
  border: none;
  border-radius: 6px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: var(--shadow);
}

.mobile-menu-btn:hover {
  background: var(--charcoal);
}

.menu-icon {
  display: block;
  width: 20px;
  height: 2px;
  background: white;
  border-radius: 1px;
  transition: transform 0.3s ease;
}
</style>