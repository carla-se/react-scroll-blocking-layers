import React, { useEffect } from 'react'

import useLayer from './useLayer'
import debounce from './debounce'

export default function useLayerWithMaxWidth(
  defaultVisible = false,
  maxWidth,
  debounceTime = 150
) {
  const [visible, setVisible] = useLayer(defaultVisible)

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
