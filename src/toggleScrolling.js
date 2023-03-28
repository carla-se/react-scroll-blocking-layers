let scrollTop

function blockScrolling(scrollElement) {
  scrollTop = window.pageYOffset

  scrollElement.style.overflow = 'hidden'
  scrollElement.style.position = 'fixed'
  scrollElement.style.width = '100%'
  scrollElement.style.top = -scrollTop + 'px'
}

function enableScrolling(scrollElement) {
  scrollElement.style.removeProperty('position')
  scrollElement.style.removeProperty('overflow')
  scrollElement.style.removeProperty('top')
  scrollElement.style.removeProperty('width')

  window.scrollTo(0, scrollTop)
}

export default function toggleScrolling(isBlocked) {
  const scrollElement = document.scrollingElement

  if (isBlocked) {
    blockScrolling(scrollElement)
  } else {
    enableScrolling(scrollElement)
  }
}
