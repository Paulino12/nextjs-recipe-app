import {
    createClient,
    createPreviewSubscriptionHook,
    // createPortableTextComponent
} from "next-sanity"
import createImageUrlBuilder from '@sanity/image-url'
import { PortableText as PortableTextComponent } from '@portabletext/react'




const config = {
    projectId: "335vkfhh",
    dataset: "production",
    apiVersion: "2022-11-05",
    useCdn: false,
}

export const sanityClient = createClient(config)

export const usePreviewSubscription = createPreviewSubscriptionHook(config)

export const urlFor = (source) => createImageUrlBuilder(config).image(source)

export const PortableText = (props) => <PortableTextComponent components={{}} {...props} />
