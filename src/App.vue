<template>
  <div id="app">
    
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="/">WebRTC Samples</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item route to="/">Home</b-nav-item>
          <b-nav-item route to="/about">About</b-nav-item>
        </b-navbar-nav>
      </b-collapse>

    </b-navbar>

    <router-view />

  </div>
</template>

<style></style>
