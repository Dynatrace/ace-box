import { createContext } from 'react'
import _ from 'lodash'

type CredentialProps = {
  description: string
  type?: string
	value: string
}

type ExtRefProps = {
  description: string
  url: string
	creds?: CredentialProps[]
}

type ExtRefsProps = {
	[name:string]:ExtRefProps
}

type ExtRefsContextProps = {
  extRefs: ExtRefsProps
	findUrl: (extRefNameToFind: string) => string|null
	findCreds: (extRefNameToFind: string, credentialDescriptionToFind: string) => CredentialProps|null
}

const ExtRefsContext = createContext({
	extRefs: {},
} as ExtRefsContextProps)

type ExtRefsContextProviderProps = {
  value: ExtRefsContextProps
	children: any
}

const ExtRefsContextProvider = ({ value, children }: ExtRefsContextProviderProps) => {
	const findUrl = (extRefNameToFind: string) => {
		const extRef = _.find(value.extRefs, (extRef, extRefName) => {
			return extRefName.toUpperCase() == extRefNameToFind
		})

		if (!!extRef) {
			return extRef.url
		}

		return null
	}

	const findCreds = (extRefNameToFind: string, credentialDescriptionToFind: string) => {
		const extRef = _.find(value.extRefs, (extRef, extRefName) => {
			return extRefName.toUpperCase() == extRefNameToFind
		})

		if (!!extRef && !!extRef.creds) {
			const extCreds = _.find(extRef.creds, (credentialSet) => {
				return credentialSet.description.toUpperCase() == credentialDescriptionToFind
			})

			if (!!extCreds) {
				return extCreds
			}
		}

		return null
	}

	return (
		<ExtRefsContext.Provider
			value={{
				extRefs: value.extRefs,
				findUrl,
				findCreds
			}}
		>
			{children}
		</ExtRefsContext.Provider>
	)
}

export {
	ExtRefsContext as default,
	ExtRefsContextProvider
}
export type {
	CredentialProps,
	ExtRefProps,
  ExtRefsProps,
}
