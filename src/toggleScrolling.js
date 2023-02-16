const scrollBlockingProperties = {
  touchAction: 'none',
  WebkitOverflowScrolling: 'none',
  overflow: 'hidden',
  overscrollBehavior: 'none',
}

function blockScrolling(scrollElement) {
  for (const property in scrollBlockingProperties) {
    scrollElement.style.setProperty(
      property,
      scrollBlockingProperties[property]
    )
  }
}

function enableScrolling(scrollElement) {
  for (const property in scrollBlockingProperties) {
    scrollElement.style.removeProperty(property)
  }
}

export default function toggleScrolling(isBlocked) {
  const scrollElement = document.scrollingElement

  if (isBlocked) {
    blockScrolling(scrollElement)
  } else {
    enableScrolling(scrollElement)
  }
}
