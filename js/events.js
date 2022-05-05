import { handleClicks } from './handleClicks'

export const events = () => {
  console.log('events file works')
  document.addEventListener('click', handleClicks)
}

export default { events }
