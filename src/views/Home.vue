<template>
  <b-container>
    <ul>
      <li><router-link to="/HelloGetUserMedia">Hello GetUserMedia</router-link></li>
      <li><router-link to="/HelloGetUserMediaCanvas">Hello GetUserMedia + Canvas</router-link></li>
      <li><router-link to="/HelloGetUserMediaCanvasFilter">HelloGetUserMedia + Canvas + Filter</router-link></li>
    </ul>
  </b-container>
</template>

<script>
export default {
  name: 'Home',
}
</script>

