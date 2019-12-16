<template>
  <div class="popup" ref="popup">
    <div v-if="open">
      <a href="#" class="popup__choice" v-on:click.prevent="edit"
        >Редактировать</a
      >
      <a href="#" class="popup__choice" v-on:click.prevent="choice('delete')"
        >Удалить</a
      >
    </div>
    <div v-else>
      <div class="popup__choice">
        <b>Удаление комментария</b>
      </div>
      <div class="popup__choice">
        <a href="#" class="btn btn_danger" v-on:click.prevent="remove">Удалить</a>
        <a href="#" class="btn action-buttons__cancel" v-on:click.prevent="open = true">Отмена</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Popup",
  mounted() {
    this.$refs.popup.style.top = this.pos.y + 'px';
    this.$refs.popup.style.left = this.pos.x + "px";
  },
  data: () => ({
    open: true
  }),
  methods: {
    choice(param) {
      if (param === "delete") {
        this.open = false;
      }
    }
  },
  props: ["pos", "edit", "remove"]
};
</script>
