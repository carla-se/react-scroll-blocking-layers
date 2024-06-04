import React, { useState } from 'react'

import LayerContext from './LayerContext'
import toggleScrolling from './toggleScrolling'

function update(newLayers, layer, callback) {
  if (callback) {
    callback(layer)
  }

  // TODO: only toggle if block changes
  toggleScrolling(newLayers.length > 0)

  return newLayers
}

export default function LayerContextProvider({
  children,
  onLayerAdded,
  onLayerRemoved,
}) {
  const [layers, setLayers] = useState([])

  function addLayer(layer) {
    setLayers((prevLayers) => {
      const filteredLayers = prevLayers.filter((id) => id !== layer)
      const newLayers = [...filteredLayers, layer]

      return update(newLayers, layer, onLayerAdded)
    })
  }

  function removeLayer(layer) {
    setLayers((prevLayers) => {
      const newLayers = prevLayers.filter((id) => id !== layer)

      return update(newLayers, layer, onLayerRemoved)
    })
  }

  function hasLayer(layer) {
    return layers.find((id) => id === layer) !== undefined
  }

  return (
    <LayerContext.Provider
      value={{
        addLayer,
        removeLayer,
        hasLayer,
        layers,
        layerCount: layers.length,
      }}>
      {children}
    </LayerContext.Provider>
  )
}
