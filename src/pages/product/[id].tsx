import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import Stripe from 'stripe'
import { CartContext } from '../../context/CartContext'
import { stripe } from '../../lib/stripe'
import { ImageContainer, ProductContainer, ProductDetails } from '../../styles/page/product'

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    priceFormated:string
    price: number
    description: string
    defaultPriceId: string
    quantity: number
  }
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter()
  const {addProductToCart} = useContext(CartContext)

  if (isFallback) {
    return (
      <h1>LOADING ...</h1>
    )
  }

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt='' />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.priceFormated}</span>

        <p>{product.description}</p>
        
        <button onClick={() => {addProductToCart(product)}}>
          Colocar na sacola
        </button>
      </ProductDetails>
    </ProductContainer>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: {id: 'prod_MqdqgG4Mhkgduv'}}
    ],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params!.id;
  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })
  const price = product.default_price as Stripe.Price;

  return{
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount!/100,
        priceFormated: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(price.unit_amount! / 100),
        description: product.description,
        defaultPriceId: price.id,
        quantity: 1
      }
    },
    revalidate: 60 * 60 * 1, //1 hour
  }
}