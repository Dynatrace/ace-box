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

import { FunctionComponent } from 'react'
import { useExtRefs } from '../ext-refs/lib'
import AceBoxCredential from '../ext-refs/templates/CredentialTemplate'
import Details from './templates/details'

const AceBoxLinks: FunctionComponent<any> = () => {
  const { extRefs } = useExtRefs()

  return (
    <div>
      <h2>Links</h2>
      <div className="section">
        <table className="table table--expandable">
          <thead>
            <tr>
              <th></th>
              <th>URL</th>
              <th>Details</th>
            </tr>
          </thead>
          {
            Object.keys(extRefs).map((extRefName, key) => {
              const extRef = extRefs[extRefName]

              const credentials = extRef.creds?.map((credentialSet, credentialSetKey) => {
                return (
                  <AceBoxCredential
                    key={`${key}-${credentialSetKey}`}
                    name={credentialSet.description}
                    type={credentialSet.type}
                    value={credentialSet.value}
                  />
                )
              })

              return (
                <Details
                  key={key}
                  title={extRefName}
                  href={extRef.url}
                  credentials={credentials}
                />
              )
            })
          }
        </table>
      </div>
    </div>
  )
}

export { AceBoxLinks as default }
