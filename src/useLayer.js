import { useState, useEffect, useContext } from 'react'

import LayerContext from './LayerContext'

export default function useLayer(initialVisible = false) {
  const [visible, setVisible] = useState(initialVisible)
  const { addLayer, removeLayer } = useContext(LayerContext)

  function setLayerVisible(isVisible) {
    if (isVisible !== visible) {
      if (isVisible) {
        addLayer()
      } else {
        removeLayer()
      }

      setVisible(isVisible)
    }
  }

  // layers that are visible by default need to be added to the layer context on initial render
  useEffect(() => {
    if (initialVisible) {
      addLayer()
    }
  }, [])

  return [visible, setLayerVisible]
}
