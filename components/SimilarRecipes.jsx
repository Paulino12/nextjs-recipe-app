import React, { useEffect, useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import { urlFor } from "../lib/sanity";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LockIcon from "@mui/icons-material/Lock";

// context
import { MainContext } from "../contexts/MainContext";

const SimilarRecipes = ({ recipes, currentRecipeName, inSession }) => {
  // initiate context
  const { setShowPricing } = useContext(MainContext);

  const [randomSimilarRecipes, setRandomSimilarRecipes] = useState([]);

  useEffect(() => {
    console.log(inSession);
    function getRandomItems(arr, num = 3) {
      if (arr.length <= num) {
        return arr.slice(); // If array length is less than or equal to the required number, return a copy of the array
      }

      let result = [];
      let usedIndices = new Set(); // To keep track of indices that have been used

      while (result.length < num) {
        let randomIndex = Math.floor(Math.random() * arr.length);
        if (!usedIndices.has(randomIndex)) {
          result.push(arr[randomIndex]);
          usedIndices.add(randomIndex);
        }
      }

      return result;
    }

    setRandomSimilarRecipes(
      getRandomItems(
        recipes.filter((recipe) => recipe.name !== currentRecipeName)
      )
    );
  }, [recipes]);

  return (
    <div className="flex flex-wrap gap-4 items-center justify-center">
      {randomSimilarRecipes.map((recipe, index) => (
        <motion.div
          className="relative pb-2 w-full md:w-72 overflow-hidden shadow-lg hover:shadow-2xl rounded-md"
          key={index}
        >
          <Link href={`/recipes/${recipe.slug.current}`}>
            <div className="relative h-48 w-full mb-2">
              <Image
                src={urlFor(recipe?.image).url()}
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                priority
                className="shadow-md recipe-card recipe-card-image transition-all duration-300 ease-in-out"
                alt={recipe.name}
              />
            </div>
            <p className="flex items-center justify-start capitalize font-semibold ml-1 text-sm">
              {recipe.name}
              <span className="flex items-center justify-center ml-2 bg-yellow-400 rounded-full px-2 font-semibold mr-1">
                {recipe.dietary}
              </span>
            </p>
            <span
              className="absolute rounded-2xl bg-yellow-400 opacity-80 font-bold top-1 left-1 
                    w-28 px-2 py-2 text-sm flex flex-row justify-start space-x-1 recipe-card-time"
            >
              <AccessTimeIcon fontSize="small" />
              <small>{`${recipe.time?.timeFrame} ${recipe.time?.timeUnit}`}</small>
            </span>
          </Link>
          {!inSession && recipe.subscriber && (
            <motion.div
              initial={{ opacity: 0.3, zIndex: 10, backgroundColor: "#fff" }}
              animate={{
                opacity: 0.7,
                zIndex: 10,
                backgroundColor: "rgb(55, 65, 81)",
              }}
              transition={{
                duration: 1,
                ease: "easeInOut",
              }}
              onClick={() => setShowPricing(true)}
              className="absolute top-0 left-0 h-full w-full cursor-pointer"
            >
              <span className="absolute rounded-full flex items-center justify-center p-1 bg-red-100 top-1 right-1">
                <LockIcon fontSize="extra-small" color="error" />
              </span>
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default SimilarRecipes;
