import { handleClicks } from './handleClicks'
import { executeOnLoad } from './execute-on-load'
import { throttle } from 'lodash-es'
import slider from './slider'

export const events = () => {

  console.log('events loading')

  document.addEventListener('click', handleClicks)
  window.addEventListener('load', executeOnLoad)
  window.addEventListener('resize', throttle(executeOnLoad, 200))
}

export default { events }

