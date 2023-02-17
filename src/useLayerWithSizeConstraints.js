import { useEffect } from 'react'

import useLayer from './useLayer'
import debounce from './debounce'

export default function useLayerWithSizeConstraints(
  maxWidth,
  initialVisible = false,
  debounceTime = 150
) {
  const [visible, setVisible] = useLayer(initialVisible)

  function setLayerVisible(isVisible) {
    if (isVisible && (!maxWidth || window.innerWidth <= maxWidth)) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }

  function hideLayerOnMaxWidth() {
    if (window.innerWidth > maxWidth) {
      setVisible(false)
    }
  }

  // in case the layer is visible by default but the window size is out of our boundaries
  useEffect(hideLayerOnMaxWidth, [])
  useEffect(() => {
    if (visible && maxWidth !== undefined) {
      const handleResize = debounce(hideLayerOnMaxWidth, debounceTime)

      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [visible])

  return [visible, setLayerVisible]
}
