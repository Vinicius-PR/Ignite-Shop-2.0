import { styled } from ".."

export const CartBtn = styled('div', {
  position: 'relative',
  backgroundColor: '$gray800',
  padding: '0.75rem',
  borderRadius: 6,
  cursor: 'pointer',

  svg: {
    color: '$gray100',
  }
})

export const CartCount = styled('span', {
  position: 'absolute',
  top: '-0.45rem',
  right: '-0.45rem',
  backgroundColor: '$green500',
  color: '$white',
  width: '1.5rem',
  height: '1.5rem',
  borderRadius: 999,
  outline:'3px solid $gray900',
  textAlign: 'center',
  lineHeight: '1.5rem',
})