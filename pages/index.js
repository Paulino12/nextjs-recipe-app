import Head from "next/head"
import { sanityClient } from '../lib/sanity'

import Hero from "../components/Hero"
import Recipes from "../components/Recipes"
import Footer from "../components/layout/nav/Footer"


export default function Home({ recipes }) {
  
  return (
    <main className="h-screen relative">
      <Hero />
      <Recipes recipes={recipes} />
      <Footer />
    </main>
  )
}

const recipeQuery = `*[_type == "recipes"]{
  _id,
  name,
  category,
  author->{
    name
  },
  time,
  dietary,
  image,
  method,
  ingredients,
  allergens,
  slug,
  likes
}`

export async function getStaticProps() {
  const recipes = await sanityClient.fetch(recipeQuery)
  return {
    props: { recipes },
    revalidate: 30
  }
}



