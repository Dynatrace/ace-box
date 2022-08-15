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
