import { FunctionComponent } from 'react'
import { useExtRefs } from '../ext-refs/lib'
import AceBoxCredentialInline from '../ext-refs/templates/CredentialInlineTemplate'
import LinkTemplate from '../ext-refs/templates/LinkTemplate'

type CloudAutomationProps = {}

const CloudAutomation: FunctionComponent<CloudAutomationProps> = () => {
  const { findUrl, findCreds } = useExtRefs()

  const url = findUrl('CLOUD AUTOMATION')
  const username = findCreds('CLOUD AUTOMATION', 'USERNAME')
  const password = findCreds('CLOUD AUTOMATION', 'PASSWORD')
	
	return (
		<div>
			<p><LinkTemplate href={url} label='Cloud Automation' /> will play a central role in most of the use cases. Cloud Automation is a control-plane for DevOps automation of cloud-native applications. 
      {
				!!username && !!password &&
				<>
					It&apos;s <LinkTemplate href={url} label='Bridge' /> can be accessed using <AceBoxCredentialInline value={username?.value} /> and password <AceBoxCredentialInline type='password' value={password?.value} />.
				</>
			}
			</p>
      <p>More infos can be found on <a href="https://keptn.sh" target="_blank" rel="noreferrer">keptn.sh</a>.</p>
		</div>
	)
}

export { CloudAutomation as default }
