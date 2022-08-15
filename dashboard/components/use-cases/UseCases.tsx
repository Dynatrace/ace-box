import React, { Fragment } from 'react'
import { useUseCases } from './lib'

const UseCases = () => {
  const { guides } = useUseCases()
  const areGuidesDefined = guides.length > 0

  return areGuidesDefined
    ? <>
        <h2>Use Cases</h2>
        <p>
          The following list shows use cases currently supported by ACE Box. Please follow links for step-by-step instructions.
        </p>
        <dl className="definition-list">
          {
            guides.map((guide, key) =>
              <Fragment
                key={key}
              >
                <dt>{guide.description}</dt>
                <dd><a href={guide.url} target="_blank" rel="noreferrer">Step-by-step instructions</a></dd>
              </Fragment>
            )
          }
        </dl>
      </>
    : null
}

export { UseCases as default }
