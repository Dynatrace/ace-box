import { FunctionComponent } from 'react'
import { useExtRefs } from '../ext-refs/lib'
import LinkTemplate from '../ext-refs/templates/LinkTemplate'

type CloudAutomationProps = {}

const CloudAutomation: FunctionComponent<CloudAutomationProps> = () => {
  const { findUrl } = useExtRefs()

  const url = findUrl('CLOUD AUTOMATION')
	
	return (
		<div>
			<p>Your <LinkTemplate href={url} label='Cloud Automation' /> has been specified when the ACE Box was launched.</p>
		</div>
	)
}

export { CloudAutomation as default }
