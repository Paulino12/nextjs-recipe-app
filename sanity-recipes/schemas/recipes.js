export default {
    name: 'recipes',
    type: 'document',
    title: 'Recipes',
    fields: [
        
        {
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: { type: 'authors' }
        },
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'category',
            title: 'Category',
            validation: Rule => Rule.required(),
            type: 'string',
            options: {
                list: ['starter', 'dessert', 'main course', 'side dish', 'bowl food', 'canapes', 'event', 'buffet', 'salad', 'home bake', 'soup']
            }
        },
        {
            title: 'Slug',
            name: 'slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
        },
        {
            title: 'Dietary',
            name: 'dietary',
            type: 'string',
            validation: Rule => Rule.required(),
            options: {
                list: ["V", "Ve", "F", "M"]
            }
        },
        {
            name: 'briefDescription',
            title: 'Brief Description',
            type: 'array',
            validation: Rule => Rule.required(),
            of: [{ type: 'block' }]
        },
        {
            title: 'Time',
            name: 'time',
            type: 'object',
            validation: Rule => Rule.required(),
            fields: [
                {
                    title: 'Time Frame',
                    name: 'timeFrame',
                    type: 'number'
                },
                {
                    title: 'Time unit',
                    name: 'timeUnit',
                    type: 'string',
                    options: {
                        list: ["min", "mins", "hr", "hrs", "day", "days"]
                    }
                }
            ]
        },
        {
            name: 'numberOfServes',
            title: 'Serves',
            type: 'number',
            validation: Rule => Rule.required(),
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true
            }
        },
        {
            name: 'ingredients',
            title: 'Ingredients',
            type: 'array',
            of: [{ type: 'string' }]
        },
        {
            name: 'method',
            title: 'Method',
            type: 'array',
            of: [{ type: 'block' }]
        },
        {
            name: 'allergens',
            title: 'Allergen(s)',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: "allergen",
                            title: "Allergens",
                            type: "string",
                            options: {
                                list: [
                                    "Sulphites", "Gluten", "Egg", "Milk", "Sesame", "Soya", "Mustard",
                                    "Fish", "Molluscs", "Crustaceans", "Celery", "Nuts", "Peanuts", "Lupin"
                                ]
                            },
                        }
                    ]
                }
            ]
        },
        {
            name: 'likes',
            title: 'Likes',
            type: 'number'
        }
    ],
    initialValue: {
        likes: 0
    }
}