<template>
  <div class="home">
    <HelloWorld msg="WebRTC Demo"/>
    <HelloGetUserMedia />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import HelloGetUserMedia from '@/components/HelloGetUserMedia.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    HelloGetUserMedia,
  }
}
</script>
