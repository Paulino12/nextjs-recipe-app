import React, { useState, useEffect, useContext } from 'react'
import { AnimatePresence } from 'framer-motion'
import { getSession, signIn } from 'next-auth/react'
import CheckIcon from '@mui/icons-material/Check'
import LocalDiningIcon from '@mui/icons-material/LocalDining'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { 
    sanityClient, urlFor, usePreviewSubscription, PortableText
 } from '../../lib/sanity'
 import Preloader from '../../components/Preloader'

//  context
import { LoadingContext } from '../../contexts/LoadingContext'
 

const recipeQuery = `*[_type == "recipes" && slug.current == $slug][0]{
    _id,
    name,
    subscriber,
    category,
    dietary,
    author->{
        name
    },
    time,
    numberOfServes,
    briefDescription,
    slug,
    image,
    ingredients[],
    method,
    allergens,
    nutritionals,
    nutritionalsPer100g,
    slug,
    likes
}`

const OneRecipe = ({ data, preview }) => {
    // initiate context
    const { noSessionLoading, setNoSessionLoading } = useContext(LoadingContext)

    const { data: recipe } = usePreviewSubscription(recipeQuery, {
        params: { slug: data.recipe?.slug.current },
        initialData: data,
        enabled: preview
    })

    // check session and redirect to sign in if not
    useEffect(() => {
        const access = async () => {
            const session = await getSession()
            // check session and user is a subscriber
            if(!session && data?.recipe.subscriber){
                setNoSessionLoading(true)
                return signIn()
            }
        }
        access()
        // Line below removes useeffect warning about adding dependency
        // eslint-disable-next-line
    }, [])

    // const [likes, setLikes] = useState(data?.recipe?.likes)
    // const addLike = async () => {
    //     const res = await fetch('/api/handleLikes', {
    //         method: "POST",
    //         body: JSON.stringify({ _id: recipe._id })
    //     })
    //     .catch((error) => { console.log(error) })

    //     const data = await res.json()
    //     setLikes(data.likes)
    // }

    // Nutritionals component
    const Nutritionals = ({ name, percentage, value }) => {
        return (
            <div>
                <div 
                className={`flex flex-col h-full w-24 
                justify-center items-center gap-1 text-xs font-semibold`}>
                    <div>{name}</div>
                    <div 
                    className={`h-full ${name !== 'Energy' && (
                        percentage > 25 ? 'bg-red-400 text-white' 
                        : 
                        percentage >= 5 && percentage <= 25 ?
                        'bg-yellow-400 text-white'
                        :
                        percentage < 5 && 'bg-green-400 text-white'
                    )}
                    flex items-center text-center px-5`}>
                        {
                            value.other ? (
                                <div className='h-12 flex items-center'>{value.other}</div>
                            ):(
                                <div>
                                    <div>{value.kj} kj</div>
                                    <div>{value.kcal} kcal</div>
                                </div>
                            )
                        }
                    </div>
                    <div>{percentage}%</div>
                </div>
            </div>
        )
    }

    return (
        <article className='min-h-screen bg-stone-100 xl:px-20 py-16 relative'>
            <AnimatePresence>
                {noSessionLoading && <Preloader />}
            </AnimatePresence>
            <div className="flex flex-col items-center justify-center text-center">
                <div className="w-full lg:w-6/12 px-4 relative">
                    <h2 className="text-4xl pb-3 font-semibold capitalize">
                        {data?.recipe.name}
                    </h2>
                    <div className='absolute bottom-0.5 left-0 border-b w-full bg-gray-400'></div>
                    <div className='absolute bottom-0 left-0 right-0 mx-auto h-1.5 w-14 lg:w-16 bg-yellow-400'></div>
                </div>
                <div className="text-sm italic mt-6 mb-8 w-5/6 md:w-1/2 md:mx-auto shadow-lg p-5 rounded-md bg-white">
                    <PortableText value={data?.recipe?.briefDescription} />
                </div>
            </div>
            <main>
                <div className='flex flex-col md:flex-row w-full md:w-3/4 md:mx-auto'>
                    <div className='w-full px-3 md:px-0 md:w-1/4 flex items-center'>
                        <picture>
                            <img 
                            src={urlFor(data?.recipe?.image).url()} 
                            className='mx-auto md:mx-0 md:w-full rounded-sm'
                            alt={data?.recipe.name} />
                        </picture>
                    </div>
                    <div className='w-full px-3 md:px-8 md:w-3/4'>
                        {/* <h1>By {data?.recipe.author?.name}</h1> */}
                        <div className='flex flex-row gap-10 mt-3'>
                            <div className='rounded-2xl bg-yellow-400 font-bold px-3 py-1'>
                                <AccessTimeIcon />
                                <small className='ml-1'>{`${data?.recipe.time?.timeFrame} ${data?.recipe.time?.timeUnit}`}</small>
                            </div>
                            <div className='flex items-center justify-center'>
                                <small className='rounded-2xl bg-yellow-400 px-2 font-bold text-lg'>{data?.recipe.dietary}</small>
                            </div>
                            <div className='rounded-2xl bg-yellow-400 font-bold px-3 py-1'>
                                <LocalDiningIcon />
                                <small className='ml-1'>{`Serves ${data?.recipe.numberOfServes}`}</small>
                            </div>                            
                        </div>
                        <div className='mt-3 flex flex-col md:flex-row md:gap-6'>
                            <h1 className='recipe-inner-heading'>Category:</h1> 
                            <p className='capitalize'>{data?.recipe.category}</p>                            
                        </div>
                        <div className='mt-3 flex flex-col md:flex-row md:gap-6'>
                            {
                                !data?.recipe.allergens?.length ? 
                                <h1 className='recipe-inner-heading'>No Allergens</h1> 
                                :
                                <h1 className='recipe-inner-heading'>Allergens:</h1>
                            }
                            {
                                data?.recipe.allergens?.map((allergen) => (
                                    <div key={allergen._key}>
                                        <span className='mr-1 animate-pulse'><CheckIcon fontSize='sm' color='warning' /></span>
                                        {allergen.allergen}
                                    </div>
                                ))
                            }
                        </div>
                        {
                            data?.recipe?.nutritionals &&
                            <div className='bg-white rounded-md shadow-lg mt-2 py-1'>
                                <p className='text-xs md:text-center font-semibold w-full underline'>Nutrionals per average servings</p>
                                <div className='mt-1 w-full flex flex-row md:justify-center flex-wrap gap-5'>
                                    {
                                        data?.recipe?.nutritionals.map((nutritional, index) => (
                                            <Nutritionals key={index} {...nutritional} />
                                        ))
                                    }
                                </div>
                                <p className='mt-1 text-xs md:text-center font-semibold w-full'>
                                    Typical values per 100g Energy {data?.recipe?.nutritionalsPer100g['kj']} kj /  {data?.recipe?.nutritionalsPer100g['kcal']} kcal
                                </p>
                            </div>
                        }
                    </div>
                </div>
                
                <div className='flex flex-col md:flex-row w-full md:w-3/4 md:mx-auto mt-3'>
                    <div className='w-full px-3 md:px-0 md:w-1/4'>
                        <h1 className='recipe-inner-heading'>Ingredients:</h1>
                        <div>
                            {
                                data?.recipe.ingredients?.map((ingredient, index) => (
                                    <div key={index} className='flex flex-row align-baseline'>
                                        {ingredient.toLowerCase().substring(0,3) !== "for" && (
                                            <span className='mr-1'>
                                                <CheckIcon fontSize='sm' color='success' />
                                            </span>
                                        ) }
                                        <div>
                                            {ingredient}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    
                    <div className='w-full px-3 mt-3 md:mt-0 md:px-8 md:w-3/4'>
                        <h1 className='recipe-inner-heading'>Instructions:</h1>
                        <PortableText value={data?.recipe?.method} />
                    </div>
                </div>
            </main>
        </article>
    )
}

export default OneRecipe

export async function getStaticPaths() {
    const paths = await sanityClient.fetch(
        `*[_type == "recipes" && defined(slug.current)]{
            "params": {
                "slug": slug.current
            }
        }`
    )
    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const { slug } = params
    const recipe = await sanityClient.fetch(recipeQuery, {slug})
    return {
        props: {
            data: { recipe } , preview: true 
        }
    }
}