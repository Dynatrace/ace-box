type CredentialProps = {
	isEnabled: boolean
	href: string
	label: string
	username?: string | undefined
	password?: string | undefined
	token?: string | undefined
}

const getKubernetesCredentials: () => CredentialProps = () => {
	const href = ''
	const label = 'Kubernetes'
	const isEnabled = !!process.env.K8S_PROVIDER
	const username = ''
	const password = '' 

	return {
		isEnabled,
		href,
		label,
		username,
		password
	}
}

const getJenkinsCredentials: () => CredentialProps = () => {
	const href = process.env.JENKINS_URL || ''
	const label = 'Jenkins'
	//const isEnabled = !!process.env.JENKINS_URL
	const isEnabled = !!process.env.JENKINS_URL && process.env.JENKINS_URL.toLowerCase() !== "n/a" && process.env.JENKINS_URL !== ""
		&& !!process.env.JENKINS_USER && process.env.JENKINS_USER.toLowerCase() !== "n/a" && process.env.JENKINS_USER !== ""
		&& !!process.env.JENKINS_PASSWORD && process.env.JENKINS_PASSWORD.toLowerCase() !== "n/a" && process.env.JENKINS_PASSWORD !== ""
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
	//const isEnabled = !!process.env.GITEA_URL
	const isEnabled = !!process.env.GITEA_URL && process.env.GITEA_URL.toLowerCase() !== "n/a" && process.env.GITEA_URL !== ""
		&& !!process.env.GITEA_USER && process.env.GITEA_USER.toLowerCase() !== "n/a" && process.env.GITEA_USER !== ""
		&& !!process.env.GITEA_PASSWORD && process.env.GITEA_PASSWORD.toLowerCase() !== "n/a" && process.env.GITEA_PASSWORD !== ""
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
	const token = process.env.GITLAB_OAUTH || ''

	return {
		isEnabled,
		href,
		label,
		username,
		password,
		token
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

const getKeptnBridgeCredentials: () => CredentialProps = () => {
	const href = process.env.KEPTN_BRIDGE_URL || ''
	const label = 'Keptn Bridge'
	const isEnabled = !!process.env.QUALITY_GATES_PROVIDER && process.env.QUALITY_GATES_PROVIDER.toLowerCase() == "keptn"
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
	const isEnabled = !!process.env.QUALITY_GATES_PROVIDER && process.env.QUALITY_GATES_PROVIDER.toLowerCase() == "keptn"
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
	const isEnabled = !!process.env.DT_TENANT_URL
	
	return {
		isEnabled,
		href,
		label
	}
}

const getCloudAutomationCredentials: ()=> CredentialProps = () => {
	const href = process.env.CLOUD_AUTOMATION_BRIDGE_URL || ''
	const label = 'Dynatrace Cloud Automation Tenant'
	const isEnabled = !!process.env.CLOUD_AUTOMATION_BRIDGE_URL && process.env.CLOUD_AUTOMATION_BRIDGE_URL.toLowerCase() !== "n/a" && process.env.CLOUD_AUTOMATION_BRIDGE_URL !== ""
		&& !!process.env.QUALITY_GATES_PROVIDER && process.env.QUALITY_GATES_PROVIDER.toLowerCase() == "cloud_automation"
	
	return {
		isEnabled,
		href,
		label
	}
}

export {
	getKubernetesCredentials,
	getJenkinsCredentials,
	getGiteaCredentials,
	getGitlabCredentials,
	getAwxCredentials,
	getKeptnBridgeCredentials,
	getKeptnApiCredentials,
	getDynatraceCredentials,
	getCloudAutomationCredentials
}
