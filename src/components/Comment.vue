<template>
  <div class="comment">
    <div v-if="!edit">
      <div class="comment__message">{{ message }}</div>
      <div class="comment__info">
        <img src="../assets/avatar.png" class="comment__avatar" alt="Аватар" />
        <b class="comment__author">{{ author }}</b
        >,
        <span class="comment__date">{{ date }}</span>
        <!-------------------------------------------/
          *
          * Должен пояснить, что такой подход к вставке SVG
          * не является правильным. Хороший вариант предложен
          * на одном из сайтов Vue документации, но для демо проекта нет
          * смысла создавать Компонент-Контейнер
          *
        /--------------------------------------------->
        <div
          class="comment__arrow-container"
          v-on:click="openPopup()"
          ref="open"
        >
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="10px"
            height="10px"
            viewBox="0 0 284.929 284.929"
            xml:space="preserve"
          >
            <path
              fill="#6b7376"
              d="M282.082,76.511l-14.274-14.273c-1.902-1.906-4.093-2.856-6.57-2.856c-2.471,0-4.661,0.95-6.563,2.856L142.466,174.441
                  L30.262,62.241c-1.903-1.906-4.093-2.856-6.567-2.856c-2.475,0-4.665,0.95-6.567,2.856L2.856,76.515C0.95,78.417,0,80.607,0,83.082
                  c0,2.473,0.953,4.663,2.856,6.565l133.043,133.046c1.902,1.903,4.093,2.854,6.567,2.854s4.661-0.951,6.562-2.854L282.082,89.647
                  c1.902-1.903,2.847-4.093,2.847-6.565C284.929,80.607,283.984,78.417,282.082,76.511z"
            />
          </svg>
        </div>
      </div>
      <!-------------------------------------------/
        *
        * Подход не совсем правильный.
        * Скорее popup должен находиться в корне сайта,
        * и получая данные из vuex. Затем, чтобы
        * не было проблем с position: relative
        * родительских элементов и излишней нагрузкой
        * на компоненты.
        *
      /--------------------------------------------->
      <div v-if="popup">
        <popup v-bind:pos="popup_pos" v-bind:remove="deleteComment" v-bind:edit="openEdit" />
      </div>
    </div>
    <div v-else>
      <input
        ref="comment"
        class="card__input"
        v-on:keyup.esc="
          comment_value = message;
          edit = false;
        "
        v-on:keyup.enter="save"
        v-model.trim="comment_value"
        placeholder="Редактировать комментарий"
      />
      <div class="action-buttons">
        <a
          href="#"
          class="btn btn_primary"
          v-bind:class="{ btn_active: comment_value !== '' }"
          v-on:click.prevent="save"
          >Сохранить</a
        >
        <a
          href="#"
          class="btn action-buttons__cancel"
          v-on:click.prevent="
            comment_value = message;
            edit = false;
          "
          >Отмена</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import Popup from "./Popup.vue";

export default {
  name: "Comment",
  props: ["message", "author", "date", "commit", "index", "remove"],
  created() {
    this.comment_value = this.message;
  },
  data: () => ({
    popup: false,
    popup_pos: {
      x: 0,
      y: 0
    },
    edit: false,
    comment_value: ""
  }),
  methods: {
    openPopup() {
      this.popup_pos.x = this.$refs.open.offsetLeft;
      this.popup_pos.y =
        this.$refs.open.offsetTop + this.$refs.open.offsetHeight;
      this.popup = !this.popup;
    },
    openEdit() {
      this.popup = false;
      this.edit = true;
      setTimeout(() => {
        this.$refs.comment.focus();
      }, 0);
    },
    deleteComment() {
      this.popup = false;
      this.remove(this.index);
    },
    save() {
      if (this.comment_value !== "") {
        this.commit(this.index, this.comment_value);
        this.edit = false;
      }
    }
  },
  components: {
    Popup
  }
};
</script>
