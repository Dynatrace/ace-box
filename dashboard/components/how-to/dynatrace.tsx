import { FunctionComponent } from 'react'
import { useExtRefs } from '../ext-refs/lib'
import LinkTemplate from '../ext-refs/templates/LinkTemplate'

type DynatraceProps = {}

const Dynatrace: FunctionComponent<DynatraceProps> = () => {
  const { findUrl } = useExtRefs()

  const url = findUrl('DYNATRACE')

	return (
		<div>
			<p>Your <LinkTemplate href={url} label='Dynatrace' /> has been specified when the ACE Box was launched.</p>
		</div>
	)
}

export { Dynatrace as default }
