# Monitoring as Code

The Monitoring as Code pipeline applies Dynatrace configuration to the target Dynatrace environment using `monaco`.

It has 4 stages:
1. Dynatrace base config - Validate
2. Dynatrace base config - Deploy
3. Dynatrace ACE project - Validate
4. Dynatrace ACE project - Deploy

The configuration structure can be found in the `mac` folder inside the ace/ace repo.

After it has run, the following config will be created:
- A Private Synthetic Location for the synthetic monitors
- Application definitions and detection rules
- Auto tagging rules
- Calculated Service Metrics
- Dashboards
- Management Zones
- Synthetic tests