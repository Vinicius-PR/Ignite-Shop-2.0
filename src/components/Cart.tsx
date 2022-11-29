import axios from 'axios'
import { CartContainer, CartContent, CartItem, CartProducts, CartSummary, EmptyCart, ImageItem, ItemDetails } from '../styles/components/Cart'
import { X, Minus, Plus } from 'phosphor-react'
import Image from 'next/image'
import { useContext, useState } from 'react'
import { CartContext } from '../context/CartContext'

interface CartProps {
  iscartopen: string,
  handleCloseCart: () => void,
}

export default function Cart({ iscartopen, handleCloseCart }: CartProps) {
  const { cart, total, addProductToCart, removeOneProductFromCart, removeProductFromCart } = useContext(CartContext)
  const [ isCreatingCheckoutPage, setIsCreatingCheckoutPage ] = useState(false)

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutPage(true)
      const response = await axios.post('/api/checkout', {
        line_items: cart.map((product) =>{
          return {
            price: product.defaultPriceId,
            quantity: product.quantity
          }
        })
      })

      const { checkoutUrl } = response.data
      window.location.href = checkoutUrl
    } catch (error) {
      // Conectar com uma ferramenta de Observabilidade (Datalog / Sentry)
      console.error(error)
      setIsCreatingCheckoutPage(false)
      alert('Falha ao redirecionar ao checkout')
    }
  }

  return (
    <CartContainer data-isCartOpen={iscartopen}>
      <X size={24} weight='bold' onClick={handleCloseCart}/>

      {
        cart.length > 0
        ? (
          <CartContent>
            <h2>Sacola de compras</h2>
            <CartProducts>
              {
                cart.map((product) => {
                  return (
                    <CartItem key={product.id}>
                      <ImageItem>
                        <Image src={product.imageUrl} alt="" width={100} height={100}/>
                      </ImageItem>
                      <ItemDetails>
                        <p>{product.name}</p>
                        <strong>{product.priceFormated} x {product.quantity}</strong>
                        <div>
                          <Minus onClick={() => removeOneProductFromCart(product.id)} size={20} weight="bold"/> 
                          <span onClick={() => removeProductFromCart(product.id)}> Remover </span> 
                          <Plus onClick={() => addProductToCart(product)} size={20} weight="bold"/>
                        </div>
                      </ItemDetails>
                    </CartItem>
                  )
                })
              }
            </CartProducts>

            <CartSummary>
              <p><span>Quantidade</span> <span>{cart.length} items</span></p>
              <strong><span>Valor total</span> <span>{total}</span></strong>
            </CartSummary>

            <button
              disabled={isCreatingCheckoutPage}
              onClick={handleBuyProduct}
            >
              Finalizar compra
            </button>
          </CartContent>
        ) : (
          <EmptyCart>
            <h2>Sacola Vazia :(</h2>
          </EmptyCart>
        )
      }

    </CartContainer>
  )
}