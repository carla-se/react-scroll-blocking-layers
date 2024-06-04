import { useEffect, useContext, useId } from 'react'

import LayerContext from './LayerContext'

export default function useLayer(initialVisible = false) {
  const { addLayer, removeLayer, hasLayer } = useContext(LayerContext)
  const id = useId()

  const visible = hasLayer(id)

  function setLayerVisible(isVisible) {
    if (isVisible) {
      addLayer(id)
    } else {
      removeLayer(id)
    }
  }

  // layers that are visible by default need to be added on initial render
  useEffect(() => {
    if (initialVisible) {
      addLayer(id)
    }
  }, [])

  return [visible, setLayerVisible]
}
