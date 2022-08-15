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
