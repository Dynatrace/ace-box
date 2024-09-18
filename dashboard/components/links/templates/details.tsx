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

import { useState, FunctionComponent } from 'react'

type DetailsProps = {
  title: string
  href: string
  credentials?: any[]
}

const Details: FunctionComponent<DetailsProps> = ({ title, href, credentials }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const isCredentialsPresent = !!credentials && Array.isArray(credentials) && credentials.length > 0 || false

  return (
    <tbody className={`expandable ${isExpanded ? "is-active" : ""}`}>
      <tr>
        <td>{title}</td>
        <td><a href={href} target="_blank" rel="noreferrer">{href}</a></td>
        <td>
          {
            isCredentialsPresent &&
              <button className="expandable__trigger" style={{ backgroundColor: "transparent", border: "none", cursor: "pointer" }} onClick={() => setIsExpanded(isExpanded => !isExpanded)}>more</button>
          }
        </td>
      </tr>
      <tr className="">
        {
          isExpanded &&
            <td colSpan={3}>
              <div style={{ display: "grid", gridTemplateColumns: "auto", rowGap: "10px" }}>
                {
                  isCredentialsPresent && (credentials || []).map((Credential, key) =>
                    Credential
                  )
                }
              </div>
            </td>
        }
      </tr>
    </tbody>
  )
}

export { Details as default }
