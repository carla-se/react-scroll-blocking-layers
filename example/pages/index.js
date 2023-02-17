import {
  useLayer,
  useLayerWithSizeConstraints,
  LayerContextProvider,
} from 'react-scroll-blocking-layers'

import lorem from '../lorem'

function Modal({ onClose, width = 800, children }) {
  return (
    <div className="modal-container">
      <div className="modal" style={{ maxWidth: width }}>
        <div className="modal-content">{children}</div>
        <div className="modal-actions">
          <button onClick={onClose}>Close Modal</button>
        </div>
      </div>
    </div>
  )
}

function Content() {
  const [modal1Visible, setModal1Visible] = useLayer()
  const [modal2Visible, setModal2Visible] = useLayer()
  const [modal3Visible, setModal3Visible] = useLayerWithSizeConstraints(800)

  const isBlocked = modal1Visible || modal2Visible || modal3Visible
  return (
    <>
      <div className="stats">
        Scroll Blocking:{' '}
        <span style={{ color: isBlocked ? 'red' : 'green' }}>
          {isBlocked ? 'On' : 'Off'}
        </span>
      </div>
      {modal1Visible && (
        <Modal onClose={() => setModal1Visible(false)}>
          {lorem}
          {lorem}
          {lorem}
          <br />
          <br />
          <br />
          <div>
            <button onClick={() => setModal2Visible(true)}>Open Modal 2</button>
          </div>
        </Modal>
      )}
      {modal2Visible && (
        <Modal width={400} onClose={() => setModal2Visible(false)}>
          Nested Layers!
        </Modal>
      )}
      {modal3Visible && (
        <Modal onClose={() => setModal3Visible(false)}>{lorem}</Modal>
      )}
      <div>
        <button onClick={() => setModal1Visible(true)}>Open Modal 1</button>
        <button onClick={() => setModal3Visible(true)}>
          Open Modal 3 on Mobile
        </button>
        <p>
          {lorem}
          {lorem}
          {lorem}
          {lorem}
        </p>
      </div>
    </>
  )
}

export default function Page() {
  return (
    <>
      <link rel="stylesheet" href="style.css" />
      <LayerContextProvider>
        <Content />
      </LayerContextProvider>
    </>
  )
}
