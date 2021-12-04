import { createContext } from 'react'

type CredentialProps = {
	isEnabled: boolean
	href: string
	label: string
	username: string
	password: string
	token: string
} | {}

const credential: CredentialProps = {
	isEnabled: false,
	href: '',
	label: '',
	username: '',
	password: '',
	token: ''
}

const CredentialProvider = createContext({
	jenkins: { ...credential },
	gitea: { ...credential },
	gitlab: { ...credential },
	awx: { ...credential },
	keptnBridge: { ...credential },
	keptnApi: { ...credential },
	dynatrace: { ...credential },
	vscodeserver: {...credential}
})

export { CredentialProvider as default }
