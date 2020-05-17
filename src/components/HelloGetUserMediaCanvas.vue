<template>
  <b-container>
    <h2>Hello getUserMedia + Canvas</h2>

    <video ref="video" autoplay playsinline></video>
    <b-btn class="my-2" @click="takeSnapshot">Take snapshot</b-btn>
    <canvas ref="canvas"></canvas>

    <ul>
      <li v-for="(msg, key) of errorMsgs" :key="key">
        {{ msg }}
      </li>
    </ul>
  </b-container>
</template>

<script>
const constraints = (window.constraints = {
  audio: false,
  video: true,
});

export default {
  name: "HelloGetUserMediaCanvas",
  components: {},
  data() {
    return {
      errorMsgs: [],
    };
  },
  methods: {
    async init() {
      const canvas = this.$refs["canvas"];
      console.log("canvas", canvas);
      canvas.width = 480;
      canvas.height = 360;
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        console.log("stream", stream);
        this.handleSuccess(stream);
      } catch (error) {
        this.handleError(error);
      }
    },

    handleSuccess(stream) {
      const video = this.$refs["video"];
      console.log("video", this.$refs["video"]);
      const videoTracks = stream.getVideoTracks();
      console.log("Got stream with constraints:", constraints);
      console.log(`Using video device: ${videoTracks[0].label}`);
      window.stream = stream; // make variable available to browser console
      video.srcObject = stream;
    },

    handleError(error) {
      if (error.name === "ConstraintNotSatisfiedError") {
        const v = constraints.video;
        this.errorMsg(
          `The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`
        );
      } else if (error.name === "PermissionDeniedError") {
        this.errorMsg(
          "Permissions have not been granted to use your camera and " +
            "microphone, you need to allow the page access to your devices in " +
            "order for the demo to work."
        );
      }
      this.errorMsg(`getUserMedia error: ${error.name}`, error);
    },

    errorMsg(msg, error) {
      const errorItem = msg;
      this.errorMsgs.push(errorItem);
      if (typeof error !== "undefined") {
        console.error(error);
      }
    },

    takeSnapshot() {
      const video = this.$refs["video"];
      const canvas = this.$refs["canvas"];
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas
        .getContext("2d")
        .drawImage(video, 0, 0, canvas.width, canvas.height);
    },
  },
  mounted() {
    console.log("mounted");
    this.init();
  },
};
</script>

<style></style>
