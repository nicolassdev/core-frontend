import { store } from "quasar/wrappers";
import { createStore } from "vuex";
import Core from "./../core/bootstrap";
import Resources from "./../resources/bootstrap";

const modules = {
  ...Core.store,
  ...Resources.store,
};

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  return createStore({
    modules: modules,

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,
  });
});
