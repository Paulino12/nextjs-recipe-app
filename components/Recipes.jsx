import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { urlFor } from '../lib/sanity'
import Input from './forms/Input'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import Preloader from './Preloader'
import useDebounce from '../customs hooks/useDebounce'
import Button from './forms/Button'


const Recipes = ({ recipes }) => {

  const [recipeId, setRecipeId] = useState(null)
  const [recipe, setRecipe] = useState('')
  const [recipeCategory, setRecipeCategory] = useState(null)
  const [searchIsLoading, setSearchIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const searchRecipe = useDebounce(recipe, 500)
  const [filteredRecipes, setFilteredRecipes] = useState(recipes)

  useEffect(() => {
    setSearchIsLoading(true)
    setRecipeCategory(null)
    if(!searchRecipe) {
      setFilteredRecipes(recipes)
      return
    } 
    // filter recipes based on search
    setFilteredRecipes(recipes.filter(recipe => recipe.name.includes(searchRecipe)))
    if(!recipes.filter(recipe => recipe.name.includes(searchRecipe)).length){
      setMessage(`No recipes match "${searchRecipe}" above`)
    }
  }, [searchRecipe])

  useEffect(() => {
    setSearchIsLoading(false)
    // setTimeout(() => {
    //   setSearchIsLoading(false)
    // }, 500);
  }, [filteredRecipes])

  const loadRecipe = (id) => {
    setRecipeId(id)
    setIsLoading(true)
  }

  // const handleCategory = (category) => {
  //   setRecipeCategory(category)
  //   if(category === "All") {
  //     setFilteredRecipes(recipes)
  //   }else{
  //     setFilteredRecipes(recipes.filter(recipe => recipe.category === category))
  //     if(!recipes.filter(recipe => recipe.category === category).length){
  //       setMessage(`No ${recipeCategory}s available.`)
  //     }
  //   }
  // }

  return (
    <section id='recipes' className='min-h-screen bg-stone-100 xl:px-20 py-16'>
      <div className="flex flex-col items-center justify-center text-center">
        <div className="w-full lg:w-6/12 px-4 relative">
            <h2 className="text-4xl pb-3 font-semibold">Recipes</h2>
            <div className='absolute bottom-0.5 left-0 border-b w-full bg-gray-400'></div>
            <div className='absolute bottom-0 left-0 right-0 mx-auto h-1.5 w-14 lg:w-16 bg-yellow-400'></div>
        </div>
        <span className="text-sm italic mt-2">
            View all our recipes below
        </span>
      </div>
      <div className='py-6 px-3 md:px-0'>
        <Input 
        value={recipe}
        handleChange={(e) => setRecipe(e.target.value)}
        placeholder="Search a recipe" 
        className="w-full md:w-1/2 md:mx-auto" />
      </div>

      {/* <div className='flex flex-row items-center justify-center pb-6 gap-3'>
        <Button btnText="All" handleClick={() => handleCategory("All")} className={`${recipeCategory === "All" ? 'bg-violet-700':''}`} />
        <Button btnText="Starters" handleClick={() => handleCategory("starter")} className={`${recipeCategory === "starter" ? 'bg-violet-700':''}`} />
        <Button btnText="Main Courses" handleClick={() => handleCategory("main course")} className={`${recipeCategory === "main course" ? 'bg-violet-700':''}`} />
        <Button btnText="Desserts" handleClick={() => handleCategory("dessert")} className={`${recipeCategory === "dessert" ? 'bg-violet-700':''}`} />
      </div> */}

      <div className='w-full h-screen relative'>
        <AnimatePresence>
          {searchIsLoading && <Preloader framerOpacity={1} classNameOpacity="" />}
        </AnimatePresence>
        <AnimatePresence mode='wait'>
          <motion.div 
          key={recipeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className='flex flex-wrap gap-6 items-center justify-center'>
            {
              filteredRecipes?.length > 0 ? filteredRecipes.map((recipe, index) => (
                <motion.div 
                onClick={() => loadRecipe(recipe._id)}
                className="relative pb-2 rounded-md recipe-card md:w-52 overflow-hidden shadow-lg hover:shadow-2xl" 
                key={index}>
                  <AnimatePresence>
                    {(isLoading && recipeId === recipe._id) && <Preloader framerOpacity="0.5" classNameOpacity="opacity-20" />}
                  </AnimatePresence>
                  <Link href={`/recipes/${recipe.slug.current}`} className='bg-red-300'>
                    <img className="shadow-md h-44 w-64 mb-1 recipe-card-image transition-all duration-300 ease-in-out" 
                    alt={recipe.name} src={urlFor(recipe.image).url()} />  
                    <p className='flex items-center justify-start capitalize font-semibold ml-1'>
                      {recipe.name}
                      <small className='flex items-center justify-center ml-2 bg-yellow-400 rounded-full px-2 font-semibold'>{recipe.dietary}</small>
                    </p>
                    <p className='text-gray-500 text-xs ml-1'>
                      by {recipe.author.name}
                    </p>
                    
                    <span className='absolute rounded-2xl bg-yellow-400 opacity-70 font-bold top-1 left-1 px-2 py-2 text-sm flex flex-row space-x-1 recipe-card-time'>
                      <AccessTimeIcon fontSize='small' /> 
                      <small>{`${recipe.time?.timeFrame} ${recipe.time?.timeUnit}`}</small>
                    </span>
                  </Link>
                </motion.div>
              ))
              :
              <div className='relative
              p-3 w-full md:w-2/3 my-5 md:mx-auto h-auto bg-red-200
              rounded-sm shadow-md flex items-center justify-between font-semibold'>
                <h1 className='text-sm text-red-500 font-semibold'>
                  {message}
                </h1>
              </div>
            }
            
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Recipes

