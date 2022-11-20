export default async function ({ redirect, $auth, i18n }) {
  // console.warn("context", i18n);
  if ($auth.$state.loggedIn) redirect("/");
}
