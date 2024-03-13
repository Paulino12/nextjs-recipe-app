
import { sanityClient } from "../lib/sanity"

const recipeQuery = `*[_type == "recipes"]{
    name,
  }`

  export default sanityClient.fetch(recipeQuery)