import { FunctionComponent } from 'react'

type LinkTemplateProps = {
  href: string|null
  label: string
}

const LinkTemplate: FunctionComponent<LinkTemplateProps> = ({ href, label }) =>
	<a
		href={href || '#'}
		target="_blank"
		rel="noreferrer"
	>
		{label}
	</a>

export { LinkTemplate as default }
