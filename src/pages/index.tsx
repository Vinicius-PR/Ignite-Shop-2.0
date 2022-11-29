import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'


import { stripe } from '../lib/stripe'
import Stripe from 'stripe'
import { Handbag } from 'phosphor-react'

import { HomeContainer, Product } from '../styles/page/home'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    priceFormated:string
    price: number
    description: string
    defaultPriceId: string
    quantity: number
  }[]
}

export default function Home({products} : HomeProps) {
  const { addProductToCart } = useContext(CartContext)

  function getPerViewNumber() {
    if (window.innerWidth > 768)
      return 3;
    else if (window.innerWidth > 425)
      return 2;
    else
      return 1;
  }

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: getPerViewNumber,
      spacing: 48,
    }
  })
  
  return (
    <HomeContainer ref={sliderRef} className="keen-slider">

      {
        products.map((product) => {
          return (
            <Product key={product.id} className="keen-slider__slide">
              <Link href={`/product/${product.id}`} prefetch={false}>
                <Image src={product.imageUrl} width={520} height={480} alt=''/>
              </Link>
              <footer>
                <div>
                  <strong>{product.name}</strong>
                  <span>{product.priceFormated}</span>
                </div>
                <div>
                  <Handbag onClick={() => addProductToCart(product)} size={32} weight="bold"/>
                </div>
              </footer>
            </Product>
            
          )
        })
      }
    </HomeContainer>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })
  
  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price
    
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount!/100,
      priceFormated: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount! / 100),
      defaultPriceId: price.id,
      quantity: 1,
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2, // 2 hour(s)
  }
}
