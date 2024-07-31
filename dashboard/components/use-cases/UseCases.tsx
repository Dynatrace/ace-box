/**
 * Copyright 2024 Dynatrace LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
