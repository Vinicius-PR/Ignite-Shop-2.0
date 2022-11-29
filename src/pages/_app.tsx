import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'
import { Container, Header } from '../styles/page/app'
import logoImg from '../assets/logo.svg'
import Image from 'next/image'
import Cart from '../components/Cart'
import { useState } from 'react'
import { CartProvider } from '../context/CartContext'
import CartButton from '../components/CartButton'
import Link from 'next/link'

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  const [ isCartOpen, setIsCartOpen ] = useState('closed')
  
  function handleCloseCart() {
    setIsCartOpen('closed')
  }

  function handleOpenCart() {
    setIsCartOpen('open')
  }

  return (
    <CartProvider>
      <Container>
        <Header>
          <Link href={'/'}>
            <Image src={logoImg} alt="" />
          </Link>
          <CartButton handleOpenCart={handleOpenCart}/>
          <Cart iscartopen={isCartOpen} handleCloseCart={handleCloseCart}/>
        </Header>
        <Component {...pageProps} />  
      </Container>
    </CartProvider>
  )
}
