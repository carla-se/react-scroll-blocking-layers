import React, { useState, useEffect, useContext } from 'react'

import LayerContext from './LayerContext'

export default function useLayer(defaultVisible = false) {
  const [visible, setVisible] = useState(defaultVisible)
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

  useEffect(() => {
    if (defaultVisible) {
      addLayer()
    }
  }, [])

  return [visible, setLayerVisible]
}
