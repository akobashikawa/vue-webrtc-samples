<template>
  <b-container>
    <h2>Hello getUserMedia + Canvas + Filter</h2>

    <b-row>
      <b-col>
        <video ref="video" autoplay playsinline :class="filter"></video>
      </b-col>
      <b-col>
        <canvas ref="canvas"></canvas>
      </b-col>
    </b-row>

    <b-select :options="options" v-model="filter"></b-select>

    <b-btn class="my-2" @click="takeSnapshot">Take snapshot</b-btn>

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
  name: "HelloGetUserMediaCanvasFilter",
  components: {},
  data() {
    return {
      errorMsgs: [],
      options: [
        { value: "none", text: "none" },
        { value: "blur", text: "blur" },
        { value: "grayscale", text: "grayscale" },
        { value: "invert", text: "invert" },
        { value: "sepia", text: "sepia" },
      ],
      filter: "none",
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
      canvas.className = this.filter;
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

<style>
.none {
  -webkit-filter: none;
  filter: none;
}

.blur {
  -webkit-filter: blur(3px);
  filter: blur(3px);
}

.grayscale {
  -webkit-filter: grayscale(1);
  filter: grayscale(1);
}

.invert {
  -webkit-filter: invert(1);
  filter: invert(1);
}

.sepia {
  -webkit-filter: sepia(1);
  filter: sepia(1);
}

video {
  width: 100%;
  object-fit: cover;
}

canvas {
  width: 100%;
}
</style>
