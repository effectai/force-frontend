<template>
     <aside class="sidebar">
        <TheLogo/>
        <nav class="main-menu">
          <h4>Main menu</h4>
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
</template>

<style>

h4{
  margin-bottom: 5px;
  font-weight: bold !important;
  color: black;
}

.sidebar {
    display:none;
}

.sidebar .main-menu {
  display: flex;
  flex-direction: column;
  margin-top:25px;  
}

.sidebar .main-menu ul {
  padding: 0;
  margin:0;
  list-style: none;
}


.sidebar .main-menu ul li {
  margin-top: 25px;
}

.sidebar .main-menu ul li a {
  padding: 10px 20px;
  color: black;
  text-decoration: none;
}

.sidebar .main-menu .router-link-active.router-link-exact-active{
  color:white;
  background:black;
  border-radius: 4px;
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
}</style>
