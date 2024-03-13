import { useContext } from 'react'
import { sanityClient } from '../lib/sanity'
import { AnimatePresence } from 'framer-motion'

import Hero from "../components/Hero"
import Recipes from "../components/Recipes"
import Footer from "../components/layout/nav/Footer"
import Preloader from '../components/Preloader'
// context
import { MainContext } from '../contexts/MainContext'
import Contact from '../components/Contact'



export default function Home({ recipes }) {
  // initiate context
  const { noSessionLoading } = useContext(MainContext)
  
  return (
    <main className="h-screen relative">
      <AnimatePresence>
        {noSessionLoading && <Preloader />}
      </AnimatePresence>
      <Hero />
      <Recipes recipes={recipes} />
      <Contact />
      <Footer />
    </main>
  )
}

const recipeQuery = `*[_type == "recipes"]{
  _id,
  name,
  subscriber,
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
  nutritionals,
  nutritionalsPer100g,
  slug,
  likes,
  "subRecipes": subRecipes[]{
    portion,
    name->{
     name,
     "slug": slug.current
    }
  }
}`

export async function getStaticProps() {
  const recipes = await sanityClient.fetch(recipeQuery)
  return {
    props: { recipes }
  }
}



