<template>
  <div id="app">
    <div class="card-container">
      <comments-card />
    </div>
  </div>
</template>

<script>
import CommentsCard from "./components/CommentsCard.vue";

export default {
  name: "app",
  components: {
    CommentsCard
  }
};
</script>

<style lang="scss">
@import "./sass/base.scss";

.card-container {
  width: 50rem;
  margin: 0 auto;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
