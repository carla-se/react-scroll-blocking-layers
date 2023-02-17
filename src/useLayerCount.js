import { useContext } from 'react'

import LayerContext from './LayerContext'

export default function useLayerCount() {
  const { layerCount } = useContext(LayerContext)

  return layoutCount
}
