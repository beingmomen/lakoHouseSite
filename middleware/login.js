export default async function ({ redirect, $auth }) {
  if ($auth.$state.loggedIn) redirect("/panel");
}
