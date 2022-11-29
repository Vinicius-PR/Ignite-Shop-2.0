import { styled } from '..';

export const HomeContainer = styled('main', {
  display: 'flex',
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px)/2))',
  marginLeft: 'auto',
})

export const Product = styled('div', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  img: {
    objectFit: 'cover',
    width: 'auto',
  },

  footer: {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    padding: '2rem 1rem',

    borderRadius: 6,

    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: 'rgba(32, 32, 36, 0.9)',

    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all 0.2s ease-in-out',

    'div:first-child': {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.25rem',
    },

    'div:last-child' : {
      padding: '0.75rem',
      backgroundColor: '$green300',
      borderRadius: 6,
      'svg': {
        color: '$white'
      },
    },

    'strong': {
      fontSize: '$lg',
      color: '$gray100'
    },

    span: {
      fontSice: 'xl',
      fontWeight: 'bold',
      color: '$green300',
    }

  },

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1,
    }
  },

  '@bp1': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1,
    }
  }
})