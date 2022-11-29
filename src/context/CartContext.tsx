import { createContext, ReactNode, useEffect, useState } from 'react'
import { produce } from 'immer'

interface Product {
  id: string
  name: string
  imageUrl: string
  priceFormated: string
  price: number
  description: string
  defaultPriceId: string
  quantity: number
}

interface CartContextData {
  cart: Product[]
  addProductToCart: (product: Product) => void
  removeProductFromCart: (id: string) => void
  removeOneProductFromCart: (id: string) => void
  total: string
}

interface CartProviderProps {
  children: ReactNode
}

export const CartContext = createContext<CartContextData>({} as CartContextData)

export function CartProvider({children}: CartProviderProps) {
  const [cart, setCart] = useState<Product[]>([])
  const [total, setTotal] = useState('')

  useEffect(() => {
    let totalValue = cart.reduce((acc, value) => {
      return acc + (value.price * value.quantity)
    }, 0);
    
    setTotal(
      new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
      }).format(totalValue)
    )
  }, [cart])

  function addProductToCart(newProduct: Product) {
    const indexProduct = cart.findIndex((product) => product.id === newProduct.id)

    if(indexProduct === -1) {
      setCart(produce(cart, draft => {
        draft.push(newProduct)
      }))
    } else {
      setCart(produce(cart, draft => {
        draft[indexProduct].quantity++
      }))
    }
  }

  function removeOneProductFromCart(id: string) {
    const indexProduct = cart.findIndex((product) => product.id === id)

    if (indexProduct > -1) {
      setCart(produce(cart, draft => {
        if (draft[indexProduct].quantity > 1) {
          draft[indexProduct].quantity--
        } else {
          draft.splice(indexProduct, 1)
        }
      }))
    }
  }

  function removeProductFromCart(id: string) {
    const indexProduct = cart.findIndex((product) => product.id === id)

    if (indexProduct > -1) {
      setCart(produce(cart, draft => {
        draft.splice(indexProduct, 1)
      }))
    }
  }

  return (
    <CartContext.Provider value={{cart, addProductToCart, removeProductFromCart, removeOneProductFromCart, total}}>
      {children}
    </CartContext.Provider>
  )
}