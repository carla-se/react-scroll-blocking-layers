import React, { useState } from 'react'

import LayerContext from './LayerContext'
import toggleScrolling from './toggleScrolling'

export default function LayerContextProvider({ children }) {
  const [layerCount, setLayerCount] = useState(0)

  function updateLayerCount(getNextState) {
    setLayerCount((prevLayerCount) => {
      const nextLayerCount = getNextState(prevLayerCount)

      // TODO: only toggle if block changes
      toggleScrolling(nextLayerCount > 0)

      return nextLayerCount
    })
  }

  function addLayer() {
    updateLayerCount((prevLayerCount) => prevLayerCount + 1)
  }

  function removeLayer() {
    updateLayerCount((prevLayerCount) => Math.max(0, prevLayerCount - 1))
  }

  return (
    <LayerContext.Provider
      value={{
        addLayer,
        removeLayer,
        layerCount,
      }}>
      {children}
    </LayerContext.Provider>
  )
}
