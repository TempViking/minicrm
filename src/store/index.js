import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      full_name: "Василий Щерица"
    },
    comments: [
      {
        message: "Взят в работу",
        author: "Ольга Солошенко",
        date: "11 Июля"
      }
    ]
  },
  mutations: {
    addComment(state, comment) {
      state.comments.push(comment);
    },
    editComment(state, comment) {
      state.comments = state.comments.map((el, index) => {
        if (index === comment.index) {
          el.message = comment.message;
        }
        return el;
      });
    },
    deleteComment(state, commentIndex) {
      state.comments.splice(commentIndex, 1);
    }
  },
  actions: {},
  modules: {}
});
