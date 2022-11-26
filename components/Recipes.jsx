import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { urlFor } from '../lib/sanity'
import Label from './forms/Label'
import Input from './forms/Input'
import Select from './forms/Select'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import Preloader from './Preloader'
import useDebounce from '../customs hooks/useDebounce'
import usePagination from '../customs hooks/usePagination'
import Pagination from '@mui/material/Pagination'
import Button from './forms/Button'


const Recipes = ({ recipes }) => {

  const [recipeId, setRecipeId] = useState(null)
  const [recipe, setRecipe] = useState('')
  const [recipeCategory, setRecipeCategory] = useState("All")
  const [searchIsLoading, setSearchIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const searchRecipe = useDebounce(recipe, 500)
  const [filteredRecipes, setFilteredRecipes] = useState(recipes)

  // Pagination Constants
  const [page, setPage] = useState(1)
  const perPage = 10
  const count = Math.ceil(filteredRecipes.length / perPage)
  const paginatedRecipes = usePagination(filteredRecipes, perPage)

  useEffect(() => {
    // when results (groceriesList) changes due to search
    // either through suppliers name or inputing product description
    // reset pagination to page 1 and show data of page 1
    setPage(1)
    paginatedRecipes.jump(1)
    // Line below removes useeffect warning about adding dependency
    // eslint-disable-next-line
  }, [filteredRecipes])

  const handlePaginationChange = (e, page) => {
    setPage(page)
    paginatedRecipes.jump(page)
  }


  useEffect(() => {
    setSearchIsLoading(true)
    if(recipeCategory === "All" && !searchRecipe){
      setFilteredRecipes(recipes)
      return
    }else if(recipeCategory === "All"){
      return setFilteredRecipes(recipes.filter(recipe => recipe.name.includes(searchRecipe)))
    }else{
      return setFilteredRecipes(recipes.filter(
        recipe => recipe.category === recipeCategory && recipe.name.includes(searchRecipe)
      ))
    }

  }, [recipeCategory, searchRecipe])

  useEffect(() => {
    setSearchIsLoading(false)
    if(!filteredRecipes.length){
      return setMessage(`No recipes match the category and recipe name above`)
    }
  }, [filteredRecipes])

  const loadRecipe = (id) => {
    setRecipeId(id)
    setIsLoading(true)
  }

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
      <div className='py-6 px-3 w-full md:w-2/3 md:mx-auto md:px-0 flex flex-col md:flex-row'>
        <div className='flex flex-col w-full md:w-1/3 md:mr-3'>
          <Label labelFor="categories" text="Categories" />
          <Select 
          value={recipeCategory}
          handleChange={(e) => setRecipeCategory(e.target.value)}
          className="w-full"
          options={['All', 'starter', 'dessert', 'main course', 'side dish', 'bowl food', 'canapes', 'event', 'buffet', 'salad', 'home bake', 'soup']} />
        </div>
        <div className='flex flex-col w-full md:w-2/3'>
          <Label labelFor="recipe" text="Recipe" />
          <Input 
          value={recipe}
          handleChange={(e) => setRecipe(e.target.value)}
          placeholder="Search a recipe" 
          className="w-full" />
        </div>
      </div>

      <div className='w-full min-h-screen relative'>
        <AnimatePresence>
          {searchIsLoading && <Preloader framerOpacity={1} classNameOpacity="" />}
        </AnimatePresence>
        <AnimatePresence mode='wait'>
          <motion.div
          className='w-full md:w-1/2 md:mx-auto flex items-center justify-center mb-3'>
            {
              filteredRecipes.length > 10 &&
              <div className=''>
                <Pagination className='w-full' count={count} page={page} onChange={handlePaginationChange} />
              </div>
            }
          </motion.div>
          <motion.div 
          key={recipeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className='flex flex-wrap gap-6 items-center justify-center'>
            {
              filteredRecipes?.length > 0 ? paginatedRecipes.currentData().map((recipe, index) => (
                <motion.div 
                onClick={() => loadRecipe(recipe._id)}
                className="relative pb-2 rounded-sm recipe-card md:w-52 overflow-hidden shadow-lg hover:shadow-2xl" 
                key={index}>
                  <AnimatePresence>
                    {(isLoading && recipeId === recipe._id) && <Preloader framerOpacity="0.5" classNameOpacity="opacity-20" />}
                  </AnimatePresence>
                  <Link href={`/recipes/${recipe.slug.current}`}>
                    <img className="shadow-md h-44 w-64 mb-1 recipe-card-image transition-all duration-300 ease-in-out" 
                    alt={recipe.name} src={urlFor(recipe.image).url()} />  
                    <p className='flex items-center justify-start capitalize font-semibold ml-1 text-sm'>
                      {recipe.name}
                      <span className='flex items-center justify-center ml-2 bg-yellow-400 rounded-full px-2 font-semibold mr-1'>{recipe.dietary}</span>
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

