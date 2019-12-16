<template>
  <div class="card">
    <div class="card__header">
      <div>
        <div class="card__title">{{ title }}</div>
        <div class="card__role">{{ author_role }}</div>
      </div>
      <div>
        <a href="#" class="btn btn_green">Сменить этап подбора</a>
      </div>
    </div>
    <hr />
    <div class="card__write-block">
      <input
        ref="comment"
        class="card__input"
        v-on:focus="action_type = 'comment'"
        v-on:keyup.esc="
          comment_value = '';
          action_type = '';
          $refs.comment.blur();
        "
        v-on:keyup.enter="add"
        v-model.trim="comment_value"
        placeholder="Написать комментарий"
      />
      <div
        class="action-buttons"
        v-if="action_type === 'comment' || comment_value !== ''"
      >
        <a
          href="#"
          class="btn btn_primary"
          v-bind:class="{ btn_active: comment_value !== '' }"
          v-on:click.prevent="add"
          >Сохранить</a
        >
        <a
          href="#"
          class="btn action-buttons__cancel"
          v-on:click.prevent="
            comment_value = '';
            action_type = '';
          "
          >Отмена</a
        >
      </div>
    </div>
    <hr />
    <div v-for="(item, index) in comments" v-bind:key="index">
      <comment v-bind="item" v-bind:commit="commit" v-bind:remove="remove" v-bind:index="index" />
    </div>
  </div>
</template>

<script>
import Comment from "./Comment.vue";
import { mapState, mapMutations } from "vuex";

var months = [
  "Января",
  "Февраля",
  "Марта",
  "Апреля",
  "Мая",
  "Июня",
  "Июля",
  "Августа",
  "Сентября",
  "Октября",
  "Ноября",
  "Декабря"
];

export default {
  name: "CommentsCard",
  data: () => ({
    comment_value: "",
    action_type: "",
    title: "Подумать",
    author_role: "Продавец"
  }),
  methods: {
    add() {
      if (this.comment_value === "") {
        this.$refs.comment.focus();
        return;
      }
      this.addComment({
        message: this.comment_value,
        author: this.user.full_name,
        date: new Date().getDate() + " " + months[new Date().getMonth()]
      });
      this.comment_value = "";
      this.action_type = "";
      this.$refs.comment.blur();
    },
    commit(index, message) {
      this.editComment({
        index,
        message
      });
    },
    remove(index) {
      this.deleteComment(index);
    },
    ...mapMutations(["addComment", "editComment", "deleteComment"])
  },
  components: {
    Comment
  },
  computed: {
    ...mapState(["comments", "user"])
  }
};
</script>
