import { FunctionComponent, useContext } from 'react'
import CredentialProvider from './provider'
import DetailTemplate from '../links/templates/details'
import LinkTemplate from './templates/link'
import UsernameTemplate from './templates/username'
import PasswordTemplate from './templates/password'
import type { CredentialProps } from './templates/types'

const Link: FunctionComponent<CredentialProps> = () => {
  const { vscodeserver } = useContext(CredentialProvider)
  const { href, label } = vscodeserver

  return (
    <LinkTemplate href={href || '#'} label={label || 'Vscodeserver'} />
  )
}

const Username: FunctionComponent<CredentialProps> = ({ variant }) => {
  const { vscodeserver } = useContext(CredentialProvider)
  const { username } = vscodeserver

  return (
    <UsernameTemplate username={username} variant={variant} />
  )
}

const Password: FunctionComponent<CredentialProps> = ({ variant }) => {
  const { vscodeserver } = useContext(CredentialProvider)
  const { password } = vscodeserver

  return (
    <PasswordTemplate password={password} variant={variant} />
  )
}

const VscodeserverLink = Link

const VscodeserverUsername = Username

const VscodeserverPassword = Password

const DetailedLink = () => {
  const { vscodeserver } = useContext(CredentialProvider)
  const { isEnabled, label, href } = vscodeserver

  return isEnabled
    ? <DetailTemplate
        title={label || 'Vscodeserver'}
        href={href || '#'}
        credentials={[VscodeserverUsername, VscodeserverPassword]}
      />
    : null
}

export { DetailedLink as default, Link, VscodeserverLink, Username, VscodeserverUsername, Password, VscodeserverPassword }