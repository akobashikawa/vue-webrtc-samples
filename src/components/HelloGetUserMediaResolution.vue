<template>
  <b-container>
    <h2>Hello getUserMedia Resolution</h2>

    <b-button-group>
      <b-btn variant="outline-primary" @click="getMedia('qvga')">QVGA</b-btn>
      <b-btn variant="outline-primary" @click="getMedia('vga')">VGA</b-btn>
      <b-btn variant="outline-primary" @click="getMedia('hd')">HD</b-btn>
      <b-btn variant="outline-primary" @click="getMedia('fullHd')">Full HD</b-btn>
      <b-btn variant="outline-primary" @click="getMedia('fourK')">4K</b-btn>
      <b-btn variant="outline-primary" @click="getMedia('eightK')">8K</b-btn>
    </b-button-group>

    <div class="video-box" v-show="showVideo">
      <b-form-input
        type="range"
        v-model="width"
        min="0"
        max="7680"
      ></b-form-input>
      {{ width }}px

      <p v-if="currentWidth">{{ currentWidth }}px x {{ currentHeight }}px</p>
      <p v-else>
        Video not ready
      </p>
      <p>
        <b-form-checkbox v-model="fullWidth">Full width</b-form-checkbox>
        <b-form-checkbox v-model="aspectLock">Lock Aspect</b-form-checkbox>
      </p>
      <video ref="video" autoplay playsinline></video>
    </div>

    <ul>
      <li v-for="(msg, key) of errorMsgs" :key="key">
        {{ msg }}
      </li>
    </ul>
  </b-container>
</template>

<script>
export default {
  name: "HelloGetUserMediaResolution",
  components: {},
  data() {
    return {
      errorMsgs: [],

      showVideo: true,
      stream: null,
      video: null,
      currentWidth: 0,
      currentHeight: 0,
      width: 0,
      fullWidth: false,
      aspectLock: false,
    };
  },

  computed: {},

  watch: {
    width(newValue) {
      const track = window.stream.getVideoTracks()[0];
      let constraints;
      if (this.aspectLock) {
        constraints = {
          width: {exact: newValue},
          aspectRatio: {
            exact: this.video.videoWidth / this.video.videoHeight
          }
        };
      } else {
        constraints = { width: { exact: newValue } };
      }
      console.log("applying " + JSON.stringify(constraints));

      track
        .applyConstraints(constraints)
        .then(() => {
          console.log("applyConstraint success");
          this.updateDimensions();
        })
        .catch((error) => {
          this.errorMsg("applyConstraints", error);
        });
    },

    fullWidth(newValue) {
      if (newValue) {
        this.video.style.width = '100%';
      } else {
        this.video.style.width = 'auto';
      }
    },
  },

  methods: {
    init() {
      this.video = this.$refs["video"];

      this.video.onloadmetadata = () => {
        console.log("onloadmetadata");
        this.updateDimensions();
      };

      this.video.onresize = () => {
        console.log("onresize");
        this.updateDimensions();
      };
    },

    updateDimensions() {
      if (this.video.videoWidth) {
        if (
          this.currentWidth !== this.video.videoWidth ||
          this.currentHeight !== this.video.videoHeight
        ) {
          this.currentWidth = this.video.videoWidth;
          this.currentHeight = this.video.videoHeight;
        }
      }
    },

    async getMedia(ctype) {
      const constraintsOptions = {
        qvga: {
          video: { width: { exact: 320 }, height: { exact: 240 } },
        },

        vga: {
          video: { width: { exact: 640 }, height: { exact: 480 } },
        },

        hd: {
          video: { width: { exact: 1280 }, height: { exact: 720 } },
        },

        fullHd: {
          video: { width: { exact: 1920 }, height: { exact: 1080 } },
        },

        fourK: {
          video: { width: { exact: 4096 }, height: { exact: 2160 } },
        },

        eightK: {
          video: { width: { exact: 7680 }, height: { exact: 4320 } },
        },
      };

      const constraints = constraintsOptions[ctype];

      console.log("constraints", ctype, constraints);

      if (this.stream) {
        this.stream.getTracks().forEach((track) => {
          track.stop();
        });
      }

      this.clearError();
      this.showVideo = false;
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        console.log("stream", stream);
        this.width = constraints.video.width.exact;
        this.handleSuccess(stream);
      } catch (error) {
        this.handleError(error);
      }
    },

    handleSuccess(stream) {
      window.stream = stream; // important! make variable available to browser console

      this.video.srcObject = stream;
      this.showVideo = true;
      console.log("Tracks: ", stream.getVideoTracks());
      const track = stream.getVideoTracks()[0];
      const constrains = track.getConstraints();
      console.log("Result constraints: " + JSON.stringify(constraints));
      console.log(`Using video device: ${track.label}`);
    },

    handleError(error) {
      this.errorMsgs = [];
      if (error.name === "ConstraintNotSatisfiedError") {
        this.errorMsg(`The resolution is not supported by your device.`);
      } else if (error.name === "PermissionDeniedError") {
        this.errorMsg(
          "Permissions have not been granted to use your camera and " +
            "microphone, you need to allow the page access to your devices in " +
            "order for the demo to work."
        );
      }
      this.errorMsg(`error: ${error.name}`, error);
    },

    clearError() {
      this.errorMsgs = [];
    },

    errorMsg(msg, error) {
      const errorItem = msg;
      this.errorMsgs.push(errorItem);
      if (typeof error !== "undefined") {
        console.error(error);
      }
    },
  },
  mounted() {
    console.log("mounted");
    this.init();
  },
};
</script>

<style></style>
