import { useState, useEffect, FunctionComponent } from 'react'
import { useUseCases } from '../use-cases/lib'

type PreviewProps = {
  isAwxEnabled?: boolean
}

const Preview: FunctionComponent<PreviewProps> = ({ isAwxEnabled }) => {
  const { previews } = useUseCases()
  const arePreviewsDefined = previews.length > 0

  const [iframeKey, setIframeKey] = useState(Math.random().toString(36).substring(7))

  useEffect(() => {
    if (arePreviewsDefined) {
      const intervalId = setInterval(() => {
        setIframeKey(Math.random().toString(36).substring(7))
      }, 10000)
  
      return () => clearInterval(intervalId)
    }
  }, [])

  return (
    <div>
      {
        previews.map((previewSection, sectionKey) =>
          <div
            key={sectionKey}
            style={{
              marginBottom: '20px'
            }}
          >
            <h2>{previewSection.section}</h2>
            <div
              className="section"
            >
            {
              previewSection.previews.map((preview, previewKey) =>
                <div
                  key={previewKey}
                  className="column column--1-of-2"
                  style={{
                    marginBottom: '20px'
                  }}
                >
                  <h3>{preview.description}</h3>
                  <iframe title="staging" key={iframeKey} id="iframe1" height="600px" width="100%" src={preview.url} />
                  <div>({preview.url})</div>
                </div>
              )
            }
            </div>
          </div>
        )
      }
    </div>
  )
}

export { Preview as default }
