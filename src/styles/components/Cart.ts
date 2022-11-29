import { styled } from '..';

export const CartContainer = styled('div', {
  height: '100vh',
  backgroundColor: '$gray800',
  position: 'fixed',
  top: 0,
  bottom: 0,
  right: 0,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  transition: 'width 0.2s',
  zIndex: 2,
  maxWidth: '90vw',

  svg: {
    color: '$gray300',
    display: 'block',
    marginTop: '1.5rem',
    marginRight: '1.5rem',
    marginLeft: 'auto',
    cursor: 'pointer',
    minHeight: 24,
  },
  
  '&[data-iscartopen="open"]':{
    width: '30rem'
  },

  '&[data-iscartopen="closed"]':{
    width: 0,
  }
})

export const CartContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  bottom: 0,
  padding: '1rem 3rem 3rem',
  maxHeight: '100vh',
  h2: {
    fontSize: '$lg',
  },

  button: {
    marginTop: 'auto',
    backgroundColor: '$green500',
    color: '$white',
    borderRadius: 8,
    border: 'none',
    padding: '1.25rem 0',

    fontWeight: 'bold',
    fontSize: '$md',
    cursor: 'pointer',
  }
})

export const CartProducts = styled('div', {
  marginTop: '2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  overflowX: 'hidden',
  overflowY: 'auto',
  maxHeight: 'calc(100vh - 300px)',
})

export const CartItem = styled('div', {
  display: 'flex',
  gap: '1.25rem',
})

export const ItemDetails = styled('div', {
  lineHeight: 1.6,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '0.5rem',

  'p, strong': {
    fontSize: '1.125rem',
  },

  p: {
    color: '$gray300',
  },

  strong: {
    color: '$gray100'
  },

  span: {
    fontSize: '1rem',
    color: '$green500',
    fontWeight: 'bold',
    cursor: 'pointer',
  },

  div: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '9rem',
    svg: {
      margin : 0,
      color: '$gray100',
    }

  }
})

export const ImageItem = styled('div', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  width: '6.25rem',
  height: '6.25rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  }
})

export const CartSummary = styled('div', {
  marginTop: 'auto',
  lineHeight: 1.6,

  p: {
    'span:last-child': {
      fontSize: '$md',
      color: '$gray300'
    }
  },

  strong: {
    fontSize: '$md',
    'span:last-child': {
      fontSize: '$xl',
    }
  },

  'p, strong': {
    display: 'flex',
    justifyContent: 'space-between'
  }
})

export const EmptyCart = styled('div', {
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
})