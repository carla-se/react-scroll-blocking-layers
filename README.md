# react-scroll-blocking-layers

<img alt="npm version" src="https://badge.fury.io/js/react-scroll-blocking-layers.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/react-scroll-blocking-layers.svg"> <a href="https://bundlephobia.com/result?p=react-scroll-blocking-layers@latest"><img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/react-scroll-blocking-layers.svg"></a>

This packages helps managing UI layers that block body scrolling. It is primarily used for modals and overlays, but can also come in handy with multi-layer layouts.

It supports nested layers and viewport size boundaries which can be useful for layers that are only visible at a certain screen size.

It works with all major browsers and devices, including iOS.

## Background

Overlays and Modals are very components that can be found in almost every modern web application However, implementing them in a user-friendly, accessible way is not at all straightforward.<br />
When it comes to scrolling, most users expect to focus only on the actual layer, but the browser will still scroll the main scrolling element, usually the `body`, once the end of the layer content is reached.<br />
To prevent that, we usually block that background scrolling as soon as an additional layer becomes visible. One might think a simple `overflow: hidden` might be enough here, but it turns out that it is not that simple.<br />
There are a lot of solutions and packages out there that aim to block scrolling, but most of them either don't work in every environment or are too complex and too much overhead for modern browsers. That's why we built our own solution and eventually extracted it from our codebase to open source it.

> Check out [Robin Weser's blog post](https://weser.io/scroll-blocking-overlays) for a full deep-dive into the background and problems.

## Example

We have a tiny example application that you can use to test it. <br />
You can find it under https://react-scroll-blocking-layers.vercel.app

## Installation

```sh
# pnpm
pnpm add react-scroll-blocking-layers

# yarn
yarn add react-scroll-blocking-layers

# npm
npm i --save react-scroll-blocking-layers
```

## Documentation

The package exposes three hooks and a context provider component.<br />
All the scroll blocking and counting logic is build into a combination of those.

### LayerContextProvider

The context provider accepts no props apart from `children`.
It is used to keep track of the number of active layers in order to apply scroll blocking correctly for multiple layers.

It needs to wrap your whole application to reliably work.

> Tip for Next.js users: You want this component to be part of your `_app.js` ideally.

#### Example

```jsx
import { LayerContextProvider } from 'react-scroll-blocking-layers'

import App from './App'

export default function Page() {
  return (
    <LayerContextProvider>
      <App />
    </LayerContextProvider>
  )
}
```

### useLayer

This hook provides the basic mechanics of toggling a scroll blocking layer.
The API interfcae is identical to React's useState. It takes an initial boolean visible state and returns an array with a pair of state and an updater

#### Parameters

| Parameter      |  Type     | Default |  Description                                          |
| -------------- | --------- | ------- | ----------------------------------------------------- |
| initialVisible | `boolean` | `false` | Whether the layer is visible on initial render or not |

#### Example

```jsx
import { useLayer } from 'react-scroll-blocking-layers'

import Modal from './Modal'

function Info() {
  const [modalVisible, setModalVisible] = useLayer()

  return (
    <>
      {modalVisible && <Modal onClose={() => setModalVisible(false)} />}
      <button onClick={() => setModalVisible(true)}>Open Modal</button>
    </>
  )
}
```

### useLayerWithSizeConstraints

This hook is very similar to useLayer. In fact, it uses useLayer under the hood.<br />
The only difference is that it adds support for viewport constraints. It accepts a `maxWidth` prop that is used to decide if the layer is shown or not. It adds a `resize` event listener to track the viewport size.

> If you wonder why there is no `maxHeight` respectively: We figured that from a UX perspective there is no such use case in modern web applications.

#### Parameters

| Parameter      |  Type     | Default |  Description                                            |
| -------------- | --------- | ------- | ------------------------------------------------------- |
| maxWidth       | `number`  |         | The maxixum width at which the layer can be visible     |
| initialVisible | `boolean` | `false` | Whether the layer is visible on initial render or not   |
| debounceTime   | `number`  | `150`   | The debounce interval for the `resize` event listener   |

#### Example

```jsx
import { useLayerWithSizeConstraints } from 'react-scroll-blocking-layers'

import Modal from './Modal'

function Info() {
  // the modal will only show if the viewport width is <= 800px
  const [modalVisible, setModalVisible] = useLayerWithSizeConstraints(800)

  return (
    <>
      {modalVisible && <Modal onClose={() => setModalVisible(false)} />}
      <button onClick={() => setModalVisible(true)}>Open Modal</button>
    </>
  )
}
```

### useLayerCount

The last hook is only useful if you want information on how many layers are active. It takes no arguments and returns a single integer.

#### Example

```jsx
import { useLayerCount } from 'react-scroll-blocking-layers'

function Info() {
  const layerCount = useLayerCount()

  const isActive = layerCount > 0

  return (
    <p>
      {layerCount} active layers.
      <br />
      Scroll blocking is {isActive ? 'active' : 'inactive'}
    </p>
  )
}
```

## License

Fela is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br />
Created with ♥ by [engineers at Carla](http://carla.se).
