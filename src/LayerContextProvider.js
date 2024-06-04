import React, { useState } from 'react'

import LayerContext from './LayerContext'
import toggleScrolling from './toggleScrolling'

export default function LayerContextProvider({
  children,
  onLayerAdded,
  onLayerRemoved,
}) {
  const [layerCount, setLayerCount] = useState(0)

  function updateLayerCount(getNextState, listener) {
    setLayerCount((prevLayerCount) => {
      const nextLayerCount = getNextState(prevLayerCount)

      if (listener) {
        listener(nextLayerCount)
      }

      // TODO: only toggle if block changes
      toggleScrolling(nextLayerCount > 0)

      return nextLayerCount
    })
  }

  function addLayer() {
    updateLayerCount((prevLayerCount) => prevLayerCount + 1, onLayerAdded)
  }

  function removeLayer() {
    updateLayerCount(
      (prevLayerCount) => Math.max(0, prevLayerCount - 1),
      onLayerRemoved
    )
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
