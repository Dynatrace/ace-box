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
import Link from 'next/link'
import { useExtRefs } from '../ext-refs/lib'
import LinkTemplate from '../ext-refs/templates/LinkTemplate'
import AceBoxCredentialInline from '../ext-refs/templates/CredentialInlineTemplate'

type GitlabProps = {}

const Gitlab: FunctionComponent<GitlabProps> = () => {
  const { findUrl, findCreds } = useExtRefs()

  const url = findUrl('GITLAB')
  const username = findCreds('GITLAB', 'USERNAME')
  const password = findCreds('GITLAB', 'PASSWORD')

  return (
    <div>
      <p><LinkTemplate href={url} label='Gitlab' /> is a local Git installation. As an alternative to Gitea it is not enabled by default. 
      It&apos;s main purpose is to host source code for the applications which will be deployed as part of some ACE box use cases.
      Additionally, Gitea is the place to go for step-by-step instructions for each use case. Some repositories require authentication. 
      You can log in using username <AceBoxCredentialInline value={username?.value} /> and password <AceBoxCredentialInline type='password' value={password?.value} /> (You 
      can find all credentials under <Link href="/links">Links</Link>). Please find more info about use cases below.</p>
    </div>
  )
}

export { Gitlab as default }
