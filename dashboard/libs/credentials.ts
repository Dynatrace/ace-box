type CredentialProps = {
	isEnabled: boolean
	href: string
	label: string
	username?: string | undefined
	password?: string | undefined
	token?: string | undefined
}

const getJenkinsCredentials: () => CredentialProps = () => {
	const href = process.env.JENKINS_URL || ''
	const label = 'Jenkins'
	const isEnabled = true
	const username = process.env.JENKINS_USER || ''
	const password = process.env.JENKINS_PASSWORD || '' 

	return {
		isEnabled,
		href,
		label,
		username,
		password
	}
}

const getGiteaCredentials: () => CredentialProps = () => {
	const href = process.env.GITEA_URL || ''
	const label = 'Gitea'
	const isEnabled = true
	const username = process.env.GITEA_USER || ''
	const password = process.env.GITEA_PASSWORD || ''
	const token = process.env.GITEA_PAT || ''

	return {
		isEnabled,
		href,
		label,
		username,
		password,
		token
	}
}

const getGitlabCredentials: () => CredentialProps = () => {
	const href = process.env.GITLAB_URL || ''
	const label = 'Gitlab'
	const isEnabled = !!process.env.GITLAB_URL && process.env.GITLAB_URL.toLowerCase() !== "n/a" && process.env.GITLAB_URL !== ""
		&& !!process.env.GITLAB_USER && process.env.GITLAB_USER.toLowerCase() !== "n/a" && process.env.GITLAB_USER !== ""
		&& !!process.env.GITLAB_PASSWORD && process.env.GITLAB_PASSWORD.toLowerCase() !== "n/a" && process.env.GITLAB_PASSWORD !== ""
	const username = process.env.GITLAB_USER || ''
	const password = process.env.GITLAB_PASSWORD || ''

	return {
		isEnabled,
		href,
		label,
		username,
		password
	}
}

const getAwxCredentials: () => CredentialProps = () => {
	const href = process.env.AWX_URL || ''
	const label = 'AWX'
	const isEnabled = !!process.env.AWX_URL && process.env.AWX_URL.toLowerCase() !== "n/a" && process.env.AWX_URL !== ""
		&& !!process.env.AWX_USER && process.env.AWX_USER.toLowerCase() !== "n/a" && process.env.AWX_USER !== ""
		&& !!process.env.AWX_PASSWORD && process.env.AWX_PASSWORD.toLowerCase() !== "n/a" && process.env.AWX_PASSWORD !== ""
	const username = process.env.AWX_USER || ''
	const password = process.env.AWX_PASSWORD || ''

	return {
		isEnabled,
		href,
		label,
		username,
		password
	}
}
const getVsCodeCredentials: () => CredentialProps = () => {
	const href = process.env.VS_CODE_URL || ''
	const label = 'Vscodeserver'
	const isEnabled = true
	const password = process.env.VS_CODE_PASSWORD || ''

	return {
		isEnabled,
		href,
		label,
	    password
	}
}
const getKeptnBridgeCredentials: () => CredentialProps = () => {
	const href = process.env.KEPTN_BRIDGE_URL || ''
	const label = 'Keptn Bridge'
	const isEnabled = true
	const username = process.env.KEPTN_BRIDGE_USER || ''
	const password = process.env.KEPTN_BRIDGE_PASSWORD || ''

	return {
		isEnabled,
		href,
		label,
		username,
		password
	}
}

const getKeptnApiCredentials: () => CredentialProps = () => {
	const href = process.env.KEPTN_API_URL || ''
	const label = 'Keptn API'
	const isEnabled = true
	const token = process.env.KEPTN_API_TOKEN || ''

	return {
		isEnabled,
		href,
		label,
		token
	}
}

const getDynatraceCredentials: () => CredentialProps = () => {
	const href = process.env.DT_TENANT_URL || ''
	const label = 'Dynatrace Tenant'
	const isEnabled = true
	
	return {
		isEnabled,
		href,
		label
	}
}

export {
	getJenkinsCredentials,
	getGiteaCredentials,
	getGitlabCredentials,
	getAwxCredentials,
	getKeptnBridgeCredentials,
	getKeptnApiCredentials,
	getDynatraceCredentials,
	getVsCodeCredentials
}
