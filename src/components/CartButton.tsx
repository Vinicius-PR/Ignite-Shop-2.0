import { Handbag } from 'phosphor-react';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { CartBtn, CartCount } from '../styles/components/CartButton';

interface CartButtonProps {
  handleOpenCart: () => void
}

export default function CartButton({ handleOpenCart }: CartButtonProps) {
  const { cart } = useContext(CartContext)

  return (
    <CartBtn onClick={handleOpenCart}>
      <Handbag size={24} weight='bold'/>
      {
        cart.length > 0
        ? (
            <CartCount>{cart.length}</CartCount>
        ): (
          ""
        )
      }
    </CartBtn>
  )
}