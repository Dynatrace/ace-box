import { FunctionComponent } from 'react'
import Link from 'next/link'

import { useExtRefs } from '../ext-refs/lib'
import LinkTemplate from '../ext-refs/templates/LinkTemplate'
import AceBoxCredentialInline from '../ext-refs/templates/CredentialInlineTemplate'

type AwxProps = {}

const Awx: FunctionComponent<AwxProps> = () => {
  const { findUrl, findCreds } = useExtRefs()

  const url = findUrl('AWX')
  const username = findCreds('AWX', 'USERNAME')
  const password = findCreds('AWX', 'PASSWORD')

  return (
    <div>
      <p><LinkTemplate href={url} label='AWX' /> is the open-source version of Ansible Tower. It provides a graphical user interface to create inventories and manage playbooks. You can log in using username <AceBoxCredentialInline value={username?.value} /> and password <AceBoxCredentialInline type='password' value={password?.value} /> (You can find all 
      credentials under <Link href="/links">Links</Link>). Please find more info about use cases below.</p>
    </div>
  )
}

export { Awx as default }
