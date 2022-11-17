export default function ({ $axios, redirect, store }) {
  $axios.onError((error) => {
    console.warn("error", error.response, error.response.data.errors);
    store.dispatch("handleError", error.response.data.errors);
    if (error.response.status === 500) {
      // console.warn("server error");
      // redirect("/sorry");
    }
  });
}
