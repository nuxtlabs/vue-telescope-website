export default function ({ $strapi, redirect }) {
  console.log($strapi.user)
  if ($strapi.user) {
    return redirect('/explore')
  }
}
