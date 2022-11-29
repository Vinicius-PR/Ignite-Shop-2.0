import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import Stripe from 'stripe'
import { stripe } from '../lib/stripe';
import { ImageContainer, SuccessContainer, ImageOuterBox } from '../styles/page/success'

interface SuccessProps {
  customerName: string,
  totalQuantity: number,
  products: {
    name: string,
    id: string,
    imageUrl: string,
  }[]
}

export default function Success({ customerName, products, totalQuantity }: SuccessProps) {

  return (
    <SuccessContainer>
      <Head>
        <title>Ignite Shop 2.0 Parabéns {customerName}</title>
      </Head>
      <h1>Compra efetuada!</h1>
      <ImageOuterBox>
        {
          products.map((product) => {
            return(
              <ImageContainer key={product.id}>
                <Image src={product.imageUrl} width={130} height={130} alt={product.name}/>
              </ImageContainer>
            )
          })
        }        
      </ImageOuterBox>
      <p>
        Uhuul! <strong>{customerName}</strong>, sua compra de {totalQuantity} camisetas já está a caminho da sua casa.
      </p>

      <Link href='/'>
        Voltar ao catalogo
      </Link>
    </SuccessContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const sessionId = String(query.session_id)
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })
  const customerName = session.customer_details?.name
  const line_items = session.line_items?.data
  
  const products = line_items?.map((productItem) => {
    const product = productItem.price?.product as Stripe.Product

    return {
      name: product.name,
      id: product.id,
      imageUrl: product.images[0]
    }
  })

  const totalQuantity = line_items?.reduce((acc, value) => {
    return acc + value.quantity!
  },0)

  return {
    props: {
      customerName,
      products,
      totalQuantity
    }
  }
}