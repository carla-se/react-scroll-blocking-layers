type Callback = (id: string) => void
type HookInterface = [boolean, (isVisible: boolean) => void]

declare module 'react-scroll-blocking-layers' {
  import { PropsWithChildren, ReactNode } from 'react'

  type LayerContextProviderProps = {
    onLayerAdded?: Callback
    onLayerRemoved?: Callback
  }

  export function LayerContextProvider(
    props: PropsWithChildren<LayerContextProviderProps>
  ): ReactNode

  export function useLayerCount(): number

  export function useLayer(initialVisible?: boolean): HookInterface
  export function useLayerWithSizeConstraints(
    maxWidth: number,
    initialVisible?: boolean,
    debounceTime?: number
  ): HookInterface
}
