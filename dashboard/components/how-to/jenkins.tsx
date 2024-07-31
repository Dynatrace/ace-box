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
import LinkTemplate from '../ext-refs/templates/LinkTemplate'
import AceBoxCredentialInline from '../ext-refs/templates/CredentialInlineTemplate'

type JenkinsProps = {}

const Jenkins: FunctionComponent<JenkinsProps> = () => {
  const { findUrl, findCreds } = useExtRefs()

  const url = findUrl('JENKINS')
  const username = findCreds('JENKINS', 'USERNAME')
  const password = findCreds('JENKINS', 'PASSWORD')

  return (
    <div>
      <p><LinkTemplate href={url} label='Jenkins' /> is our go-to CI/CD tool. You can log in using <AceBoxCredentialInline value={username?.value} /> and password <AceBoxCredentialInline type='password' value={password?.value} />.
      Our installation comes with a couple of pre-installed plugins and projects which allow us to run through use cases without further configuration. 
      Please find more info about use cases below.
      </p>
    </div>
  )
}

export { Jenkins as default }
