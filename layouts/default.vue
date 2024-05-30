<template>
  <div 
    class="main"
  >
    <div class="layout-container">
      <aside class="sidebar">
        <TheLogo/>

        <nav class="main-menu">
          <h4>Main Menu</h4>
          
          <ul>
            <li>
              <nuxt-link to="/">My Dashboard</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/profile">My Profile</nuxt-link>
            </li>
          </ul>
        </nav>
      </aside>
      <div class="main-content">
        <slot />
      </div>
    </div>
  </div>
</template>


<style scoped>

h4{
  font-weight:bold !important;
  color:black;
}

.sidebar .main-menu {
  display: flex;
  flex-direction: column;
  margin-top:30px;  
}

.sidebar .main-menu ul {
  padding: 0;
  margin:0;
  list-style: none;
}

.sidebar .main-menu ul li {
  margin-top: 30px;
}

.sidebar .main-menu ul li a {
  color: black;
  text-decoration: none;
}

.sidebar .main-menu .router-link-active.router-link-exact-active{
  padding:12px 15px 12px 15px;
  color:white;
  background:black;
  border-radius: 4px;
}


.main {
  padding-top:40px;
}

@media screen and (min-width: 1440px){
  .sidebar {
    position:fixed;
    top:0;
    left:0;
    display:flex;
    flex-direction: column;
    min-width: var(--sidebar-width);
    padding-top:40px;
    padding-left:35px;
    background: var(--secondary);
  }
  .main-content {
    padding-left:var(--sidebar-width);
  }
}
</style>