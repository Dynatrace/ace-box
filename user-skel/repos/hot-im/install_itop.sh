#!/bin/bash
IP_ADDRESS=$(curl ifconfig.me)
ITOP_COOKIE=$(curl "http://$IP_ADDRESS:8000/setup/wizard.php" -X 'null' --head | grep -i Set-Cookie -m 1 | awk 'match($0,/:.*?;/) {print substr($0, RSTART+2, RLENGTH-3)}')
AUTHENTICATION_TOKEN=$(curl  "http://$IP_ADDRESS:8000/setup/wizard.php"   -H "Content-Type: application/x-www-form-urlencoded"   -H "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"   -H "Accept-Language: en-GB,en;q=0.9"   -H "Origin: http://$IP_ADDRESS:8000"   -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.2 Safari/605.1.15"   -H "Connection: keep-alive"   -H "Upgrade-Insecure-Requests: 1"   -H "Referer: http://$IP_ADDRESS:8000/setup/wizard.php"   -H "Cookie: $ITOP_COOKIE"   --data-raw "_class=WizStepWelcome&_state=&_params%5Bmisc_options%5D=%5B%5D&_steps=%5B%5D&operation=next"   --compressed | grep -i authent | awk 'match($0,/authent_token.*/) {print substr($0, RSTART+22, 64)}')
sleep 2
curl -v "http://$IP_ADDRESS:8000/setup/ajax.dataloader.php" \
  -H "Content-Type: application/x-www-form-urlencoded; charset=UTF-8" \
  -H "Accept: */*" \
  -H "Accept-Language: en-GB,en;q=0.9" \
  -H "Origin: http://$IP_ADDRESS:8000" \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.2 Safari/605.1.15" \
  -H "Connection: keep-alive" \
  -H "Referer: http://$IP_ADDRESS:8000/setup/wizard.php" \
  -H "Cookie: $ITOP_COOKIE" \
  -H "X-Requested-With: XMLHttpRequest" \
  --data-raw "operation=async_action&step_class=WizStepInstallOrUpgrade&step_state=&code=check_db&authent=$AUTHENTICATION_TOKEN&params%5Bdb_server%5D=&params%5Bdb_user%5D=&params%5Bdb_pwd%5D=&params%5Bdb_name%5D=&params%5Bdb_tls_enabled%5D=0&params%5Bdb_tls_ca%5D=" \
  --compressed ;
sleep 2
curl -v "http://$IP_ADDRESS:8000/setup/wizard.php" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" \
  -H "Accept-Language: en-GB,en;q=0.9" \
  -H "Origin: http://$IP_ADDRESS:8000" \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.2 Safari/605.1.15" \
  -H "Connection: keep-alive" \
  -H "Upgrade-Insecure-Requests: 1" \
  -H "Referer: http://$IP_ADDRESS:8000/setup/wizard.php" \
  -H "Cookie: $ITOP_COOKIE" \
  --data-raw "install_mode=install&previous_version_dir=&db_server=&db_user=&db_pwd=&db_name=&db_prefix=&db_backup=1&db_backup_path=%2Fvar%2Fwww%2Fhtml%2Fdata%2Fbackups%2Fmanual%2Fsetup-2022-02-14_09_52&_class=WizStepInstallOrUpgrade&_state=&_params%5Bmisc_options%5D=%5B%5D&_params%5Bauthent%5D=$AUTHENTICATION_TOKEN&_steps=%5B%7B%22class%22%3A%22WizStepWelcome%22%2C%22state%22%3A%22%22%7D%5D&operation=next" \
  --compressed ;
sleep 2
curl -v "http://$IP_ADDRESS:8000/setup/wizard.php" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" \
  -H "Accept-Language: en-GB,en;q=0.9" \
  -H "Origin: http://$IP_ADDRESS:8000" \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.2 Safari/605.1.15" \
  -H "Connection: keep-alive" \
  -H "Upgrade-Insecure-Requests: 1" \
  -H "Referer: http://$IP_ADDRESS:8000/setup/wizard.php" \
  -H "Cookie: $ITOP_COOKIE" \
  --data-raw "accept_license=yes&_class=WizStepLicense&_state=&_params%5Bmisc_options%5D=%5B%5D&_params%5Bauthent%5D=$AUTHENTICATION_TOKEN&_params%5Bprevious_version_dir%5D=&_params%5Bdb_server%5D=&_params%5Bdb_user%5D=&_params%5Bdb_pwd%5D=&_params%5Bdb_name%5D=&_params%5Bdb_prefix%5D=&_params%5Bdb_backup%5D=1&_params%5Bdb_backup_path%5D=%2Fvar%2Fwww%2Fhtml%2Fdata%2Fbackups%2Fmanual%2Fsetup-2022-02-14_09_52&_params%5Bdb_tls_enabled%5D=&_params%5Bdb_tls_ca%5D=&_params%5Binstall_mode%5D=install&_params%5Bsource_dir%5D=%2Fvar%2Fwww%2Fhtml%2Fdatamodels%2F2.x%2F&_params%5Bdatamodel_version%5D=3.0.0-beta5&_steps=%5B%7B%22class%22%3A%22WizStepWelcome%22%2C%22state%22%3A%22%22%7D%2C%7B%22class%22%3A%22WizStepInstallOrUpgrade%22%2C%22state%22%3A%22%22%7D%5D&operation=next" \
  --compressed ;
sleep 2
curl -v "http://$IP_ADDRESS:8000/setup/ajax.dataloader.php" \
  -H "Content-Type: application/x-www-form-urlencoded; charset=UTF-8" \
  -H "Accept: */*" \
  -H "Accept-Language: en-GB,en;q=0.9" \
  -H "Origin: http://$IP_ADDRESS:8000" \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.2 Safari/605.1.15" \
  -H "Connection: keep-alive" \
  -H "Referer: http://$IP_ADDRESS:8000/setup/wizard.php" \
  -H "Cookie: $ITOP_COOKIE" \
  -H "X-Requested-With: XMLHttpRequest" \
  --data-raw "operation=async_action&step_class=WizStepDBParams&step_state=&code=check_db&authent=$AUTHENTICATION_TOKEN&params%5Bdb_server%5D=&params%5Bdb_user%5D=&params%5Bdb_pwd%5D=&params%5Bdb_name%5D=&params%5Bdb_tls_enabled%5D=0&params%5Bdb_tls_ca%5D=" \
  --compressed ;
sleep 2
curl -v "http://$IP_ADDRESS:8000/setup/ajax.dataloader.php" \
  -H "Content-Type: application/x-www-form-urlencoded; charset=UTF-8" \
  -H "Accept: */*" \
  -H "Accept-Language: en-GB,en;q=0.9" \
  -H "Origin: http://$IP_ADDRESS:8000" \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.2 Safari/605.1.15" \
  -H "Connection: keep-alive" \
  -H "Referer: http://$IP_ADDRESS:8000/setup/wizard.php" \
  -H "Cookie: $ITOP_COOKIE" \
  -H "X-Requested-With: XMLHttpRequest" \
  --data-raw "operation=async_action&step_class=WizStepDBParams&step_state=&code=check_db&authent=$AUTHENTICATION_TOKEN&params%5Bdb_server%5D=&params%5Bdb_user%5D=root&params%5Bdb_pwd%5D=&params%5Bdb_name%5D=&params%5Bdb_tls_enabled%5D=0&params%5Bdb_tls_ca%5D=" \
  --compressed ;
sleep 2
curl -v "http://$IP_ADDRESS:8000/setup/wizard.php" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" \
  -H "Accept-Language: en-GB,en;q=0.9" \
  -H "Origin: http://$IP_ADDRESS:8000" \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.2 Safari/605.1.15" \
  -H "Connection: keep-alive" \
  -H "Upgrade-Insecure-Requests: 1" \
  -H "Referer: http://$IP_ADDRESS:8000/setup/wizard.php" \
  -H "Cookie: $ITOP_COOKIE" \
  --data-raw "db_server=&db_user=root&db_pwd=&db_new_name=&create_db=no&db_name=mysql&db_prefix=&_class=WizStepDBParams&_state=&_params%5Bmisc_options%5D=%5B%5D&_params%5Bauthent%5D=$AUTHENTICATION_TOKEN&_params%5Bprevious_version_dir%5D=&_params%5Bdb_server%5D=&_params%5Bdb_user%5D=&_params%5Bdb_pwd%5D=&_params%5Bdb_name%5D=&_params%5Bdb_prefix%5D=&_params%5Bdb_backup%5D=1&_params%5Bdb_backup_path%5D=%2Fvar%2Fwww%2Fhtml%2Fdata%2Fbackups%2Fmanual%2Fsetup-2022-02-14_09_52&_params%5Bdb_tls_enabled%5D=&_params%5Bdb_tls_ca%5D=&_params%5Binstall_mode%5D=install&_params%5Bsource_dir%5D=%2Fvar%2Fwww%2Fhtml%2Fdatamodels%2F2.x%2F&_params%5Bdatamodel_version%5D=3.0.0-beta5&_params%5Baccept_license%5D=yes&_steps=%5B%7B%22class%22%3A%22WizStepWelcome%22%2C%22state%22%3A%22%22%7D%2C%7B%22class%22%3A%22WizStepInstallOrUpgrade%22%2C%22state%22%3A%22%22%7D%2C%7B%22class%22%3A%22WizStepLicense%22%2C%22state%22%3A%22%22%7D%5D&operation=next" \
  --compressed ;
sleep 2
curl -v "http://$IP_ADDRESS:8000/setup/wizard.php" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" \
  -H "Accept-Language: en-GB,en;q=0.9" \
  -H "Origin: http://$IP_ADDRESS:8000" \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.2 Safari/605.1.15" \
  -H "Connection: keep-alive" \
  -H "Upgrade-Insecure-Requests: 1" \
  -H "Referer: http://$IP_ADDRESS:8000/setup/wizard.php" \
  -H "Cookie: $ITOP_COOKIE" \
  --data-raw "admin_user=admin&admin_pwd=dynatrace&confirm_pwd=dynatrace&admin_language=EN+US&_class=WizStepAdminAccount&_state=&_params%5Bmisc_options%5D=%5B%5D&_params%5Bauthent%5D=$AUTHENTICATION_TOKEN&_params%5Bprevious_version_dir%5D=&_params%5Bdb_server%5D=&_params%5Bdb_user%5D=root&_params%5Bdb_pwd%5D=&_params%5Bdb_name%5D=mysql&_params%5Bdb_prefix%5D=&_params%5Bdb_backup%5D=1&_params%5Bdb_backup_path%5D=%2Fvar%2Fwww%2Fhtml%2Fdata%2Fbackups%2Fmanual%2Fsetup-2022-02-14_09_52&_params%5Bdb_tls_enabled%5D=&_params%5Bdb_tls_ca%5D=&_params%5Binstall_mode%5D=install&_params%5Bsource_dir%5D=%2Fvar%2Fwww%2Fhtml%2Fdatamodels%2F2.x%2F&_params%5Bdatamodel_version%5D=3.0.0-beta5&_params%5Baccept_license%5D=yes&_params%5Bnew_db_name%5D=&_params%5Bcreate_db%5D=no&_params%5Bdb_new_name%5D=&_steps=%5B%7B%22class%22%3A%22WizStepWelcome%22%2C%22state%22%3A%22%22%7D%2C%7B%22class%22%3A%22WizStepInstallOrUpgrade%22%2C%22state%22%3A%22%22%7D%2C%7B%22class%22%3A%22WizStepLicense%22%2C%22state%22%3A%22%22%7D%2C%7B%22class%22%3A%22WizStepDBParams%22%2C%22state%22%3A%22%22%7D%5D&operation=next" \
  --compressed ;
sleep 2
curl -v "http://$IP_ADDRESS:8000/setup/ajax.dataloader.php" \
  -H "Content-Type: application/x-www-form-urlencoded; charset=UTF-8" \
  -H "Accept: */*" \
  -H "Accept-Language: en-GB,en;q=0.9" \
  -H "Origin: http://$IP_ADDRESS:8000" \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.2 Safari/605.1.15" \
  -H "Connection: keep-alive" \
  -H "Referer: http://$IP_ADDRESS:8000/setup/wizard.php" \
  -H "Cookie: $ITOP_COOKIE" \
  -H "X-Requested-With: XMLHttpRequest" \
  --data-raw "operation=async_action&step_class=WizStepInstallMiscParams&step_state=&code=check_graphviz&authent=AUTHENTICATION_TOKEN&params%5Bgraphviz_path%5D=%2Fusr%2Fbin%2Fdot&params%5Bauthent%5D=AUTHENTICATION_TOKEN" \
  --compressed ;
sleep 2
curl -v "http://$IP_ADDRESS:8000/setup/wizard.php" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" \
  -H "Accept-Language: en-GB,en;q=0.9" \
  -H "Origin: http://$IP_ADDRESS:8000" \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.2 Safari/605.1.15" \
  -H "Connection: keep-alive" \
  -H "Upgrade-Insecure-Requests: 1" \
  -H "Referer: http://$IP_ADDRESS:8000/setup/wizard.php" \
  -H "Cookie: $ITOP_COOKIE" \
  --data-raw "default_language=EN+US&application_url=http%3A%2F%2F$IP_ADDRESS%3A8000%2F&graphviz_path=%2Fusr%2Fbin%2Fdot&sample_data=no&_class=WizStepInstallMiscParams&_state=&_params%5Bmisc_options%5D=%5B%5D&_params%5Bauthent%5D=$AUTHENTICATION_TOKEN&_params%5Bprevious_version_dir%5D=&_params%5Bdb_server%5D=&_params%5Bdb_user%5D=root&_params%5Bdb_pwd%5D=&_params%5Bdb_name%5D=mysql&_params%5Bdb_prefix%5D=&_params%5Bdb_backup%5D=1&_params%5Bdb_backup_path%5D=%2Fvar%2Fwww%2Fhtml%2Fdata%2Fbackups%2Fmanual%2Fsetup-2022-02-14_09_52&_params%5Bdb_tls_enabled%5D=&_params%5Bdb_tls_ca%5D=&_params%5Binstall_mode%5D=install&_params%5Bsource_dir%5D=%2Fvar%2Fwww%2Fhtml%2Fdatamodels%2F2.x%2F&_params%5Bdatamodel_version%5D=3.0.0-beta5&_params%5Baccept_license%5D=yes&_params%5Bnew_db_name%5D=&_params%5Bcreate_db%5D=no&_params%5Bdb_new_name%5D=&_params%5Badmin_user%5D=admin&_params%5Badmin_pwd%5D=dynatrace&_params%5Bconfirm_pwd%5D=dynatrace&_params%5Badmin_language%5D=EN+US&_steps=%5B%7B%22class%22%3A%22WizStepWelcome%22%2C%22state%22%3A%22%22%7D%2C%7B%22class%22%3A%22WizStepInstallOrUpgrade%22%2C%22state%22%3A%22%22%7D%2C%7B%22class%22%3A%22WizStepLicense%22%2C%22state%22%3A%22%22%7D%2C%7B%22class%22%3A%22WizStepDBParams%22%2C%22state%22%3A%22%22%7D%2C%7B%22class%22%3A%22WizStepAdminAccount%22%2C%22state%22%3A%22%22%7D%5D&operation=next" \
  --compressed ;
sleep 2
curl -v "http://$IP_ADDRESS:8000/setup/wizard.php" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" \
  -H "Accept-Language: en-GB,en;q=0.9" \
  -H "Origin: http://$IP_ADDRESS:8000" \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.2 Safari/605.1.15" \
  -H "Connection: keep-alive" \
  -H "Upgrade-Insecure-Requests: 1" \
  -H "Referer: http://$IP_ADDRESS:8000/setup/wizard.php" \
  -H "Cookie: $ITOP_COOKIE" \
  --data-raw "choice%5B_0%5D=_0&choice%5B_1%5D=_1&choice%5B_2%5D=_2&choice%5B_3%5D=_3&choice%5B_4%5D=_4&_class=WizStepModulesChoice&_state=start_install&_params%5Bmisc_options%5D=%5B%5D&_params%5Bauthent%5D=$AUTHENTICATION_TOKEN&_params%5Bprevious_version_dir%5D=&_params%5Bdb_server%5D=&_params%5Bdb_user%5D=root&_params%5Bdb_pwd%5D=&_params%5Bdb_name%5D=mysql&_params%5Bdb_prefix%5D=&_params%5Bdb_backup%5D=1&_params%5Bdb_backup_path%5D=%2Fvar%2Fwww%2Fhtml%2Fdata%2Fbackups%2Fmanual%2Fsetup-2022-02-14_09_52&_params%5Bdb_tls_enabled%5D=&_params%5Bdb_tls_ca%5D=&_params%5Binstall_mode%5D=install&_params%5Bsource_dir%5D=%2Fvar%2Fwww%2Fhtml%2Fdatamodels%2F2.x%2F&_params%5Bdatamodel_version%5D=3.0.0-beta5&_params%5Baccept_license%5D=yes&_params%5Bnew_db_name%5D=&_params%5Bcreate_db%5D=no&_params%5Bdb_new_name%5D=&_params%5Badmin_user%5D=admin&_params%5Badmin_pwd%5D=dynatrace&_params%5Bconfirm_pwd%5D=dynatrace&_params%5Badmin_language%5D=EN+US&_params%5Bdefault_language%5D=EN+US&_params%5Bapplication_url%5D=http%3A%2F%2F$IP_ADDRESS%3A8000%2F&_params%5Bgraphviz_path%5D=%2Fusr%2Fbin%2Fdot&_params%5Bsample_data%5D=no&_params%5Badditional_extensions_modules%5D=%5B%5D&_steps=%5B%7B%22class%22%3A%22WizStepWelcome%22%2C%22state%22%3A%22%22%7D%2C%7B%22class%22%3A%22WizStepInstallOrUpgrade%22%2C%22state%22%3A%22%22%7D%2C%7B%22class%22%3A%22WizStepLicense%22%2C%22state%22%3A%22%22%7D%2C%7B%22class%22%3A%22WizStepDBParams%22%2C%22state%22%3A%22%22%7D%2C%7B%22class%22%3A%22WizStepAdminAccount%22%2C%22state%22%3A%22%22%7D%2C%7B%22class%22%3A%22WizStepInstallMiscParams%22%2C%22state%22%3A%22%22%7D%5D&operation=next" \
  --compressed ;
sleep 2
curl -v "http://$IP_ADDRESS:8000/setup/wizard.php" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" \
  -H "Accept-Language: en-GB,en;q=0.9" \
  -H "Origin: http://$IP_ADDRESS:8000" \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.2 Safari/605.1.15" \
  -H "Connection: keep-alive" \
  -H "Upgrade-Insecure-Requests: 1" \
  -H "Referer: http://$IP_ADDRESS:8000/setup/wizard.php" \
  -H "Cookie: $ITOP_COOKIE" \
  --data-raw "choice%5B_0%5D=_1&_class=WizStepModulesChoice&_state=1&_params%5Bmisc_options%5D=%5B%5D&_params%5Bauthent%5D=$AUTHENTICATION_TOKEN&_params%5Bprevious_version_dir%5D=&_params%5Bdb_server%5D=&_params%5Bdb_user%5D=root&_params%5Bdb_pwd%5D=&_params%5Bdb_name%5D=mysql&_params%5Bdb_prefix%5D=&_params%5Bdb_backup%5D=1&_params%5Bdb_backup_path%5D=%2Fvar%2Fwww%2Fhtml%2Fdata%2Fbackups%2Fmanual%2Fsetup-2022-02-14_09_52&_params%5Bdb_tls_enabled%5D=&_params%5Bdb_tls_ca%5D=&_params%5Binstall_mode%5D=install&_params%5Bsource_dir%5D=%2Fvar%2Fwww%2Fhtml%2Fdatamodels%2F2.x%2F&_params%5Bdatamodel_version%5D=3.0.0-beta5&_params%5Baccept_license%5D=yes&_params%5Bnew_db_name%5D=&_params%5Bcreate_db%5D=no&_params%5Bdb_new_name%5D=&_params%5Badmin_user%5D=admin&_params%5Badmin_pwd%5D=dynatrace&_params%5Bconfirm_pwd%5D=dynatrace&_params%5Badmin_language%5D=EN+US&_params%5Bdefault_language%5D=EN+US&_params%5Bapplication_url%5D=http%3A%2F%2F$IP_ADDRESS%3A8000%2F&_params%5Bgraphviz_path%5D=%2Fusr%2Fbin%2Fdot&_params%5Bsample_data%5D=no&_params%5Badditional_extensions_modules%5D=%5B%5D&_params%5Bselected_components%5D=%5B%7B%22_0%22%3A%22_0%22%2C%22_1%22%3A%22_1%22%2C%22_2%22%3A%22_2%22%2C%22_3%22%3A%22_3%22%2C%22_4%22%3A%22_4%22%7D%5D&_steps=%5B%7B%22class%22%3A%22WizStepWelcome%22%2C%22state%22%3A%22%22%7D%2C%7B%22class%22%3A%22WizStepInstallOrUpgrade%22%2C%22state%22%3A%22%22%7D%2C%7B%22class%22%3A%22WizStepLicense%22%2C%22state%22%3A%22%22%7D%2C%7B%22class%22%3A%22WizStepDBParams%22%2C%22state%22%3A%22%22%7D%2C%7B%22class%22%3A%22WizStepAdminAccount%22%2C%22state%22%3A%22%22%7D%2C%7B%22class%22%3A%22WizStepInstallMiscParams%22%2C%22state%22%3A%22%22%7D%2C%7B%22class%22%3A%22WizStepModulesChoice%22%2C%22state%22%3A%22start_install%22%7D%5D&operation=next" \
  --compressed ;
sleep 2
curl -v "http://$IP_ADDRESS:8000/setup/wizard.php" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" \
  -H "Accept-Language: en-GB,en;q=0.9" \
  -H "Origin: http://$IP_ADDRESS:8000" \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.2 Safari/605.1.15" \
  -H "Connection: keep-alive" \
  -H "Upgrade-Insecure-Requests: 1" \
  -H "Referer: http://$IP_ADDRESS:8000/setup/wizard.php" \
  -H "Cookie: $ITOP_COOKIE" \
  --data-raw "choice%5B_0%5D=_1&choice%5B_1_1%5D=_1_1&_class=WizStepModulesChoice&_state=2&_params%5Bmisc_options%5D=%5B%5D&_params%5Bauthent%5D=$AUTHENTICATION_TOKEN&_params%5Bprevious_version_dir%5D=&_params%5Bdb_server%5D=&_params%5Bdb_user%5D=root&_params%5Bdb_pwd%5D=&_params%5Bdb_name%5D=mysql&_params%5Bdb_prefix%5D=&_params%5Bdb_backup%5D=1&_params%5Bdb_backup_path%5D=%2Fvar%2Fwww%2Fhtml%2Fdata%2Fbackups%2Fmanual%2Fsetup-2022-02-14_09_52&_params%5Bdb_tls_enabled%5D=&_params%5Bdb_tls_ca%5D=&_params%5Binstall_mode%5D=install&_params%5Bsource_dir%5D=%2Fvar%2Fwww%2Fhtml%2Fdatamodels%2F2.x%2F&_params%5Bdatamodel_version%5D=3.0.0-beta5&_params%5Baccept_license%5D=yes&_params%5Bnew_db_name%5D=&_params%5Bcreate_db%5D=no&_params%5Bdb_new_name%5D=&_params%5Badmin_user%5D=admin&_params%5Badmin_pwd%5D=dynatrace&_params%5Bconfirm_pwd%5D=dynatrace&_params%5Badmin_language%5D=EN+US&_params%5Bdefault_language%5D=EN+US&_params%5Bapplication_url%5D=http%3A%2F%2F$IP_ADDRESS%3A8000%2F&_params%5Bgraphviz_path%5D=%2Fusr%2Fbin%2Fdot&_params%5Bsample_data%5D=no&_params%5Badditional_extensions_modules%5D=%5B%5D&_params%5Bselected_components%5D=%5B%7B%22_0%22%3A%22_0%22%2C%22_1%22%3A%22_1%22%2C%22_2%22%3A%22_2%22%2C%22_3%22%3A%22_3%22%2C%22_4%22%3A%22_4%22%7D%2C%7B%22_0%22%3A%22_1%22%7D%5D&_steps=%5B%7B%22class%22%3A%22WizStepWelcome%22%2C%22state%22%3A%22%22%7D%2C%7B%22class%22%3A%22WizStepInstallOrUpgrade%22%2C%22state%22%3A%22%22%7D%2C%7B%22class%22%3A%22WizStepLicense%22%2C%22state%22%3A%22%22%7D%2C%7B%22class%22%3A%22WizStepDBParams%22%2C%22state%22%3A%22%22%7D%2C%7B%22class%22%3A%22WizStepAdminAccount%22%2C%22state%22%3A%22%22%7D%2C%7B%22class%22%3A%22WizStepInstallMiscParams%22%2C%22state%22%3A%22%22%7D%2C%7B%22class%22%3A%22WizStepModulesChoice%22%2C%22state%22%3A%22start_install%22%7D%2C%7B%22class%22%3A%22WizStepModulesChoice%22%2C%22state%22%3A%221%22%7D%5D&operation=next" \
  --compressed ;
sleep 2
curl -v "http://$IP_ADDRESS:8000/setup/wizard.php" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" \
  -H "Accept-Language: en-GB,en;q=0.9" \
  -H "Origin: http://$IP_ADDRESS:8000" \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.2 Safari/605.1.15" \
  -H "Connection: keep-alive" \
  -H "Upgrade-Insecure-Requests: 1" \
  -H "Referer: http://$IP_ADDRESS:8000/setup/wizard.php" \
  -H "Cookie: $ITOP_COOKIE" \
  --data-raw "choice%5B_0%5D=_1&_class=WizStepModulesChoice&_state=3&_params%5Bmisc_options%5D=%5B%5D&_params%5Bauthent%5D=$AUTHENTICATION_TOKEN&_params%5Bprevious_version_dir%5D=&_params%5Bdb_server%5D=&_params%5Bdb_user%5D=root&_params%5Bdb_pwd%5D=&_params%5Bdb_name%5D=mysql&_params%5Bdb_prefix%5D=&_params%5Bdb_backup%5D=1&_params%5Bdb_backup_path%5D=%2Fvar%2Fwww%2Fhtml%2Fdata%2Fbackups%2Fmanual%2Fsetup-2022-02-14_09_52&_params%5Bdb_tls_enabled%5D=&_params%5Bdb_tls_ca%5D=&_params%5Binstall_mode%5D=install&_params%5Bsource_dir%5D=%2Fvar%2Fwww%2Fhtml%2Fdatamodels%2F2.x%2F&_params%5Bdatamodel_version%5D=3.0.0-beta5&_params%5Baccept_license%5D=yes&_params%5Bnew_db_name%5D=&_params%5Bcreate_db%5D=no&_params%5Bdb_new_name%5D=&_params%5Badmin_user%5D=admin&_params%5Badmin_pwd%5D=dynatrace&_params%5Bconfirm_pwd%5D=dynatrace&_params%5Badmin_language%5D=EN+US&_params%5Bdefault_language%5D=EN+US&_params%5Bapplication_url%5D=http%3A%2F%2F$IP_ADDRESS%3A8000%2F&_params%5Bgraphviz_path%5D=%2Fusr%2Fbin%2Fdot&_params%5Bsample_data%5D=no&_params%5Badditional_extensions_modules%5D=%5B%5D&_params%5Bselected_components%5D=%5B%7B%22_0%22%3A%22_0%22%2C%22_1%22%3A%22_1%22%2C%22_2%22%3A%22_2%22%2C%22_3%22%3A%22_3%22%2C%22_4%22%3A%22_4%22%7D%2C%7B%22_0%22%3A%22_1%22%7D%2C%7B%22_0%22%3A%22_1%22%2C%22_1_1%22%3A%22_1_1%22%7D%5D&_steps=%5B%7B%22class%22%3A%22WizStepWelcome%22%2C%22state%22%3A%22%22%7D%2C%7B%22class%22%3A%22WizStepInstallOrUpgrade%22%2C%22state%22%3A%22%22%7D%2C%7B%22class%22%3A%22WizStepLicense%22%2C%22state%22%3A%22%22%7D%2C%7B%22class%22%3A%22WizStepDBParams%22%2C%22state%22%3A%22%22%7D%2C%7B%22class%22%3A%22WizStepAdminAccount%22%2C%22state%22%3A%22%22%7D%2C%7B%22class%22%3A%22WizStepInstallMiscParams%22%2C%22state%22%3A%22%22%7D%2C%7B%22class%22%3A%22WizStepModulesChoice%22%2C%22state%22%3A%22start_install%22%7D%2C%7B%22class%22%3A%22WizStepModulesChoice%22%2C%22state%22%3A%221%22%7D%2C%7B%22class%22%3A%22WizStepModulesChoice%22%2C%22state%22%3A%222%22%7D%5D&operation=next" \
  --compressed ;
sleep 2
curl -v "http://$IP_ADDRESS:8000/setup/wizard.php" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" \
  -H "Accept-Language: en-GB,en;q=0.9" \
  -H "Origin: http://$IP_ADDRESS:8000" \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.2 Safari/605.1.15" \
  -H "Connection: keep-alive" \
  -H "Upgrade-Insecure-Requests: 1" \
  -H "Referer: http://$IP_ADDRESS:8000/setup/wizard.php" \
  -H "Cookie: $ITOP_COOKIE" \
  --data-raw "_class=WizStepModulesChoice&_state=4&_params%5Bmisc_options%5D=%5B%5D&_params%5Bauthent%5D=$AUTHENTICATION_TOKEN&_params%5Bprevious_version_dir%5D=&_params%5Bdb_server%5D=&_params%5Bdb_user%5D=root&_params%5Bdb_pwd%5D=&_params%5Bdb_name%5D=mysql&_params%5Bdb_prefix%5D=&_params%5Bdb_backup%5D=1&_params%5Bdb_backup_path%5D=%2Fvar%2Fwww%2Fhtml%2Fdata%2Fbackups%2Fmanual%2Fsetup-2022-02-14_09_52&_params%5Bdb_tls_enabled%5D=&_params%5Bdb_tls_ca%5D=&_params%5Binstall_mode%5D=install&_params%5Bsource_dir%5D=%2Fvar%2Fwww%2Fhtml%2Fdatamodels%2F2.x%2F&_params%5Bdatamodel_version%5D=3.0.0-beta5&_params%5Baccept_license%5D=yes&_params%5Bnew_db_name%5D=&_params%5Bcreate_db%5D=no&_params%5Bdb_new_name%5D=&_params%5Badmin_user%5D=admin&_params%5Badmin_pwd%5D=dynatrace&_params%5Bconfirm_pwd%5D=dynatrace&_params%5Badmin_language%5D=EN+US&_params%5Bdefault_language%5D=EN+US&_params%5Bapplication_url%5D=http%3A%2F%2F$IP_ADDRESS%3A8000%2F&_params%5Bgraphviz_path%5D=%2Fusr%2Fbin%2Fdot&_params%5Bsample_data%5D=no&_params%5Badditional_extensions_modules%5D=%5B%5D&_params%5Bselected_components%5D=%5B%7B%22_0%22%3A%22_0%22%2C%22_1%22%3A%22_1%22%2C%22_2%22%3A%22_2%22%2C%22_3%22%3A%22_3%22%2C%22_4%22%3A%22_4%22%7D%2C%7B%22_0%22%3A%22_1%22%7D%2C%7B%22_0%22%3A%22_1%22%2C%22_1_1%22%3A%22_1_1%22%7D%2C%7B%22_0%22%3A%22_1%22%7D%5D&_steps=%5B%7B%22class%22%3A%22WizStepWelcome%22%2C%22state%22%3A%22%22%7D%2C%7B%22class%22%3A%22WizStepInstallOrUpgrade%22%2C%22state%22%3A%22%22%7D%2C%7B%22class%22%3A%22WizStepLicense%22%2C%22state%22%3A%22%22%7D%2C%7B%22class%22%3A%22WizStepDBParams%22%2C%22state%22%3A%22%22%7D%2C%7B%22class%22%3A%22WizStepAdminAccount%22%2C%22state%22%3A%22%22%7D%2C%7B%22class%22%3A%22WizStepInstallMiscParams%22%2C%22state%22%3A%22%22%7D%2C%7B%22class%22%3A%22WizStepModulesChoice%22%2C%22state%22%3A%22start_install%22%7D%2C%7B%22class%22%3A%22WizStepModulesChoice%22%2C%22state%22%3A%221%22%7D%2C%7B%22class%22%3A%22WizStepModulesChoice%22%2C%22state%22%3A%222%22%7D%2C%7B%22class%22%3A%22WizStepModulesChoice%22%2C%22state%22%3A%223%22%7D%5D&operation=next" \
  --compressed ;
sleep 2
curl -v "http://$IP_ADDRESS:8000/setup/ajax.dataloader.php" \
  -H "Content-Type: application/x-www-form-urlencoded; charset=UTF-8" \
  -H "Accept: */*" \
  -H "Accept-Language: en-GB,en;q=0.9" \
  -H "Origin: http://$IP_ADDRESS:8000" \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.2 Safari/605.1.15" \
  -H "Connection: keep-alive" \
  -H "Referer: http://$IP_ADDRESS:8000/setup/wizard.php" \
  -H "Cookie: $ITOP_COOKIE" \
  -H "X-Requested-With: XMLHttpRequest" \
  --data-raw "operation=async_action&step_class=WizStepSummary&step_state=&code=execute_step&authent=$AUTHENTICATION_TOKEN&params%5Binstaller_step%5D=&params%5Binstaller_config%5D=%7B%22mode%22%3A%22install%22%2C%22preinstall%22%3A%7B%22copies%22%3A%5B%5D%7D%2C%22source_dir%22%3A%22datamodels%5C%2F2.x%5C%2F%22%2C%22datamodel_version%22%3A%223.0.0-beta5%22%2C%22previous_configuration_file%22%3A%22%22%2C%22extensions_dir%22%3A%22extensions%22%2C%22target_env%22%3A%22production%22%2C%22workspace_dir%22%3A%22%22%2C%22database%22%3A%7B%22server%22%3A%22%22%2C%22user%22%3A%22root%22%2C%22pwd%22%3A%22%22%2C%22name%22%3A%22mysql%22%2C%22db_tls_enabled%22%3A%22%22%2C%22db_tls_ca%22%3A%22%22%2C%22prefix%22%3A%22%22%7D%2C%22url%22%3A%22http%3A%5C%2F%5C%2F$IP_ADDRESS%3A8000%5C%2F%22%2C%22graphviz_path%22%3A%22%5C%2Fusr%5C%2Fbin%5C%2Fdot%22%2C%22admin_account%22%3A%7B%22user%22%3A%22admin%22%2C%22pwd%22%3A%22dynatrace%22%2C%22language%22%3A%22EN+US%22%7D%2C%22language%22%3A%22EN+US%22%2C%22selected_modules%22%3A%5B%22authent-cas%22%2C%22authent-external%22%2C%22authent-ldap%22%2C%22authent-local%22%2C%22itop-backup%22%2C%22itop-config%22%2C%22itop-files-information%22%2C%22itop-portal-base%22%2C%22itop-profiles-itil%22%2C%22itop-sla-computation%22%2C%22itop-structure%22%2C%22itop-welcome-itil%22%2C%22itop-config-mgmt%22%2C%22itop-attachments%22%2C%22itop-tickets%22%2C%22combodo-db-tools%22%2C%22itop-core-update%22%2C%22itop-hub-connector%22%2C%22itop-datacenter-mgmt%22%2C%22itop-endusers-devices%22%2C%22itop-storage-mgmt%22%2C%22itop-virtualization-mgmt%22%2C%22itop-bridge-virtualization-storage%22%2C%22itop-service-mgmt-provider%22%2C%22itop-bridge-cmdb-ticket%22%2C%22itop-incident-mgmt-itil%22%2C%22itop-change-mgmt-itil%22%5D%2C%22selected_extensions%22%3A%5B%22itop-config-mgmt-core%22%2C%22itop-config-mgmt-datacenter%22%2C%22itop-config-mgmt-end-user%22%2C%22itop-config-mgmt-storage%22%2C%22itop-config-mgmt-virtualization%22%2C%22itop-service-mgmt-service-provider%22%2C%22itop-ticket-mgmt-itil%22%2C%22itop-ticket-mgmt-itil-incident%22%2C%22itop-change-mgmt-itil%22%5D%2C%22sample_data%22%3Afalse%2C%22old_addon%22%3Afalse%2C%22options%22%3A%5B%5D%2C%22mysql_bindir%22%3A%22%22%7D" \
  --compressed ;
sleep 2
curl -v "http://$IP_ADDRESS:8000/setup/ajax.dataloader.php" \
  -H "Content-Type: application/x-www-form-urlencoded; charset=UTF-8" \
  -H "Accept: */*" \
  -H "Accept-Language: en-GB,en;q=0.9" \
  -H "Origin: http://$IP_ADDRESS:8000" \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.2 Safari/605.1.15" \
  -H "Connection: keep-alive" \
  -H "Referer: http://$IP_ADDRESS:8000/setup/wizard.php" \
  -H "Cookie: $ITOP_COOKIE" \
  -H "X-Requested-With: XMLHttpRequest" \
  --data-raw "operation=async_action&step_class=WizStepSummary&step_state=&code=execute_step&authent=$AUTHENTICATION_TOKEN&params%5Binstaller_step%5D=copy&params%5Binstaller_config%5D=%7B%22mode%22%3A%22install%22%2C%22preinstall%22%3A%7B%22copies%22%3A%5B%5D%7D%2C%22source_dir%22%3A%22datamodels%5C%2F2.x%5C%2F%22%2C%22datamodel_version%22%3A%223.0.0-beta5%22%2C%22previous_configuration_file%22%3A%22%22%2C%22extensions_dir%22%3A%22extensions%22%2C%22target_env%22%3A%22production%22%2C%22workspace_dir%22%3A%22%22%2C%22database%22%3A%7B%22server%22%3A%22%22%2C%22user%22%3A%22root%22%2C%22pwd%22%3A%22%22%2C%22name%22%3A%22mysql%22%2C%22db_tls_enabled%22%3A%22%22%2C%22db_tls_ca%22%3A%22%22%2C%22prefix%22%3A%22%22%7D%2C%22url%22%3A%22http%3A%5C%2F%5C%2F$IP_ADDRESS%3A8000%5C%2F%22%2C%22graphviz_path%22%3A%22%5C%2Fusr%5C%2Fbin%5C%2Fdot%22%2C%22admin_account%22%3A%7B%22user%22%3A%22admin%22%2C%22pwd%22%3A%22dynatrace%22%2C%22language%22%3A%22EN+US%22%7D%2C%22language%22%3A%22EN+US%22%2C%22selected_modules%22%3A%5B%22authent-cas%22%2C%22authent-external%22%2C%22authent-ldap%22%2C%22authent-local%22%2C%22itop-backup%22%2C%22itop-config%22%2C%22itop-files-information%22%2C%22itop-portal-base%22%2C%22itop-profiles-itil%22%2C%22itop-sla-computation%22%2C%22itop-structure%22%2C%22itop-welcome-itil%22%2C%22itop-config-mgmt%22%2C%22itop-attachments%22%2C%22itop-tickets%22%2C%22combodo-db-tools%22%2C%22itop-core-update%22%2C%22itop-hub-connector%22%2C%22itop-datacenter-mgmt%22%2C%22itop-endusers-devices%22%2C%22itop-storage-mgmt%22%2C%22itop-virtualization-mgmt%22%2C%22itop-bridge-virtualization-storage%22%2C%22itop-service-mgmt-provider%22%2C%22itop-bridge-cmdb-ticket%22%2C%22itop-incident-mgmt-itil%22%2C%22itop-change-mgmt-itil%22%5D%2C%22selected_extensions%22%3A%5B%22itop-config-mgmt-core%22%2C%22itop-config-mgmt-datacenter%22%2C%22itop-config-mgmt-end-user%22%2C%22itop-config-mgmt-storage%22%2C%22itop-config-mgmt-virtualization%22%2C%22itop-service-mgmt-service-provider%22%2C%22itop-ticket-mgmt-itil%22%2C%22itop-ticket-mgmt-itil-incident%22%2C%22itop-change-mgmt-itil%22%5D%2C%22sample_data%22%3Afalse%2C%22old_addon%22%3Afalse%2C%22options%22%3A%5B%5D%2C%22mysql_bindir%22%3A%22%22%7D" \
  --compressed ;
sleep 2
curl -v "http://$IP_ADDRESS:8000/setup/ajax.dataloader.php" \
  -H "Content-Type: application/x-www-form-urlencoded; charset=UTF-8" \
  -H "Accept: */*" \
  -H "Accept-Language: en-GB,en;q=0.9" \
  -H "Origin: http://$IP_ADDRESS:8000" \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.2 Safari/605.1.15" \
  -H "Connection: keep-alive" \
  -H "Referer: http://$IP_ADDRESS:8000/setup/wizard.php" \
  -H "Cookie: $ITOP_COOKIE" \
  -H "X-Requested-With: XMLHttpRequest" \
  --data-raw "operation=async_action&step_class=WizStepSummary&step_state=&code=execute_step&authent=$AUTHENTICATION_TOKEN&params%5Binstaller_step%5D=compile&params%5Binstaller_config%5D=%7B%22mode%22%3A%22install%22%2C%22preinstall%22%3A%7B%22copies%22%3A%5B%5D%7D%2C%22source_dir%22%3A%22datamodels%5C%2F2.x%5C%2F%22%2C%22datamodel_version%22%3A%223.0.0-beta5%22%2C%22previous_configuration_file%22%3A%22%22%2C%22extensions_dir%22%3A%22extensions%22%2C%22target_env%22%3A%22production%22%2C%22workspace_dir%22%3A%22%22%2C%22database%22%3A%7B%22server%22%3A%22%22%2C%22user%22%3A%22root%22%2C%22pwd%22%3A%22%22%2C%22name%22%3A%22mysql%22%2C%22db_tls_enabled%22%3A%22%22%2C%22db_tls_ca%22%3A%22%22%2C%22prefix%22%3A%22%22%7D%2C%22url%22%3A%22http%3A%5C%2F%5C%2F$IP_ADDRESS%3A8000%5C%2F%22%2C%22graphviz_path%22%3A%22%5C%2Fusr%5C%2Fbin%5C%2Fdot%22%2C%22admin_account%22%3A%7B%22user%22%3A%22admin%22%2C%22pwd%22%3A%22dynatrace%22%2C%22language%22%3A%22EN+US%22%7D%2C%22language%22%3A%22EN+US%22%2C%22selected_modules%22%3A%5B%22authent-cas%22%2C%22authent-external%22%2C%22authent-ldap%22%2C%22authent-local%22%2C%22itop-backup%22%2C%22itop-config%22%2C%22itop-files-information%22%2C%22itop-portal-base%22%2C%22itop-profiles-itil%22%2C%22itop-sla-computation%22%2C%22itop-structure%22%2C%22itop-welcome-itil%22%2C%22itop-config-mgmt%22%2C%22itop-attachments%22%2C%22itop-tickets%22%2C%22combodo-db-tools%22%2C%22itop-core-update%22%2C%22itop-hub-connector%22%2C%22itop-datacenter-mgmt%22%2C%22itop-endusers-devices%22%2C%22itop-storage-mgmt%22%2C%22itop-virtualization-mgmt%22%2C%22itop-bridge-virtualization-storage%22%2C%22itop-service-mgmt-provider%22%2C%22itop-bridge-cmdb-ticket%22%2C%22itop-incident-mgmt-itil%22%2C%22itop-change-mgmt-itil%22%5D%2C%22selected_extensions%22%3A%5B%22itop-config-mgmt-core%22%2C%22itop-config-mgmt-datacenter%22%2C%22itop-config-mgmt-end-user%22%2C%22itop-config-mgmt-storage%22%2C%22itop-config-mgmt-virtualization%22%2C%22itop-service-mgmt-service-provider%22%2C%22itop-ticket-mgmt-itil%22%2C%22itop-ticket-mgmt-itil-incident%22%2C%22itop-change-mgmt-itil%22%5D%2C%22sample_data%22%3Afalse%2C%22old_addon%22%3Afalse%2C%22options%22%3A%5B%5D%2C%22mysql_bindir%22%3A%22%22%7D" \
  --compressed ;
sleep 2
curl -v "http://$IP_ADDRESS:8000/setup/ajax.dataloader.php" \
  -H "Content-Type: application/x-www-form-urlencoded; charset=UTF-8" \
  -H "Accept: */*" \
  -H "Accept-Language: en-GB,en;q=0.9" \
  -H "Origin: http://$IP_ADDRESS:8000" \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.2 Safari/605.1.15" \
  -H "Connection: keep-alive" \
  -H "Referer: http://$IP_ADDRESS:8000/setup/wizard.php" \
  -H "Cookie: $ITOP_COOKIE" \
  -H "X-Requested-With: XMLHttpRequest" \
  --data-raw "operation=async_action&step_class=WizStepSummary&step_state=&code=execute_step&authent=$AUTHENTICATION_TOKEN&params%5Binstaller_step%5D=db-schema&params%5Binstaller_config%5D=%7B%22mode%22%3A%22install%22%2C%22preinstall%22%3A%7B%22copies%22%3A%5B%5D%7D%2C%22source_dir%22%3A%22datamodels%5C%2F2.x%5C%2F%22%2C%22datamodel_version%22%3A%223.0.0-beta5%22%2C%22previous_configuration_file%22%3A%22%22%2C%22extensions_dir%22%3A%22extensions%22%2C%22target_env%22%3A%22production%22%2C%22workspace_dir%22%3A%22%22%2C%22database%22%3A%7B%22server%22%3A%22%22%2C%22user%22%3A%22root%22%2C%22pwd%22%3A%22%22%2C%22name%22%3A%22mysql%22%2C%22db_tls_enabled%22%3A%22%22%2C%22db_tls_ca%22%3A%22%22%2C%22prefix%22%3A%22%22%7D%2C%22url%22%3A%22http%3A%5C%2F%5C%2F$IP_ADDRESS%3A8000%5C%2F%22%2C%22graphviz_path%22%3A%22%5C%2Fusr%5C%2Fbin%5C%2Fdot%22%2C%22admin_account%22%3A%7B%22user%22%3A%22admin%22%2C%22pwd%22%3A%22dynatrace%22%2C%22language%22%3A%22EN+US%22%7D%2C%22language%22%3A%22EN+US%22%2C%22selected_modules%22%3A%5B%22authent-cas%22%2C%22authent-external%22%2C%22authent-ldap%22%2C%22authent-local%22%2C%22itop-backup%22%2C%22itop-config%22%2C%22itop-files-information%22%2C%22itop-portal-base%22%2C%22itop-profiles-itil%22%2C%22itop-sla-computation%22%2C%22itop-structure%22%2C%22itop-welcome-itil%22%2C%22itop-config-mgmt%22%2C%22itop-attachments%22%2C%22itop-tickets%22%2C%22combodo-db-tools%22%2C%22itop-core-update%22%2C%22itop-hub-connector%22%2C%22itop-datacenter-mgmt%22%2C%22itop-endusers-devices%22%2C%22itop-storage-mgmt%22%2C%22itop-virtualization-mgmt%22%2C%22itop-bridge-virtualization-storage%22%2C%22itop-service-mgmt-provider%22%2C%22itop-bridge-cmdb-ticket%22%2C%22itop-incident-mgmt-itil%22%2C%22itop-change-mgmt-itil%22%5D%2C%22selected_extensions%22%3A%5B%22itop-config-mgmt-core%22%2C%22itop-config-mgmt-datacenter%22%2C%22itop-config-mgmt-end-user%22%2C%22itop-config-mgmt-storage%22%2C%22itop-config-mgmt-virtualization%22%2C%22itop-service-mgmt-service-provider%22%2C%22itop-ticket-mgmt-itil%22%2C%22itop-ticket-mgmt-itil-incident%22%2C%22itop-change-mgmt-itil%22%5D%2C%22sample_data%22%3Afalse%2C%22old_addon%22%3Afalse%2C%22options%22%3A%5B%5D%2C%22mysql_bindir%22%3A%22%22%7D" \
  --compressed ;
sleep 2
curl -v "http://$IP_ADDRESS:8000/setup/ajax.dataloader.php" \
  -H "Content-Type: application/x-www-form-urlencoded; charset=UTF-8" \
  -H "Accept: */*" \
  -H "Accept-Language: en-GB,en;q=0.9" \
  -H "Origin: http://$IP_ADDRESS:8000" \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.2 Safari/605.1.15" \
  -H "Connection: keep-alive" \
  -H "Referer: http://$IP_ADDRESS:8000/setup/wizard.php" \
  -H "Cookie: $ITOP_COOKIE" \
  -H "X-Requested-With: XMLHttpRequest" \
  --data-raw "operation=async_action&step_class=WizStepSummary&step_state=&code=execute_step&authent=$AUTHENTICATION_TOKEN&params%5Binstaller_step%5D=after-db-create&params%5Binstaller_config%5D=%7B%22mode%22%3A%22install%22%2C%22preinstall%22%3A%7B%22copies%22%3A%5B%5D%7D%2C%22source_dir%22%3A%22datamodels%5C%2F2.x%5C%2F%22%2C%22datamodel_version%22%3A%223.0.0-beta5%22%2C%22previous_configuration_file%22%3A%22%22%2C%22extensions_dir%22%3A%22extensions%22%2C%22target_env%22%3A%22production%22%2C%22workspace_dir%22%3A%22%22%2C%22database%22%3A%7B%22server%22%3A%22%22%2C%22user%22%3A%22root%22%2C%22pwd%22%3A%22%22%2C%22name%22%3A%22mysql%22%2C%22db_tls_enabled%22%3A%22%22%2C%22db_tls_ca%22%3A%22%22%2C%22prefix%22%3A%22%22%7D%2C%22url%22%3A%22http%3A%5C%2F%5C%2F$IP_ADDRESS%3A8000%5C%2F%22%2C%22graphviz_path%22%3A%22%5C%2Fusr%5C%2Fbin%5C%2Fdot%22%2C%22admin_account%22%3A%7B%22user%22%3A%22admin%22%2C%22pwd%22%3A%22dynatrace%22%2C%22language%22%3A%22EN+US%22%7D%2C%22language%22%3A%22EN+US%22%2C%22selected_modules%22%3A%5B%22authent-cas%22%2C%22authent-external%22%2C%22authent-ldap%22%2C%22authent-local%22%2C%22itop-backup%22%2C%22itop-config%22%2C%22itop-files-information%22%2C%22itop-portal-base%22%2C%22itop-profiles-itil%22%2C%22itop-sla-computation%22%2C%22itop-structure%22%2C%22itop-welcome-itil%22%2C%22itop-config-mgmt%22%2C%22itop-attachments%22%2C%22itop-tickets%22%2C%22combodo-db-tools%22%2C%22itop-core-update%22%2C%22itop-hub-connector%22%2C%22itop-datacenter-mgmt%22%2C%22itop-endusers-devices%22%2C%22itop-storage-mgmt%22%2C%22itop-virtualization-mgmt%22%2C%22itop-bridge-virtualization-storage%22%2C%22itop-service-mgmt-provider%22%2C%22itop-bridge-cmdb-ticket%22%2C%22itop-incident-mgmt-itil%22%2C%22itop-change-mgmt-itil%22%5D%2C%22selected_extensions%22%3A%5B%22itop-config-mgmt-core%22%2C%22itop-config-mgmt-datacenter%22%2C%22itop-config-mgmt-end-user%22%2C%22itop-config-mgmt-storage%22%2C%22itop-config-mgmt-virtualization%22%2C%22itop-service-mgmt-service-provider%22%2C%22itop-ticket-mgmt-itil%22%2C%22itop-ticket-mgmt-itil-incident%22%2C%22itop-change-mgmt-itil%22%5D%2C%22sample_data%22%3Afalse%2C%22old_addon%22%3Afalse%2C%22options%22%3A%5B%5D%2C%22mysql_bindir%22%3A%22%22%7D" \
  --compressed ;
sleep 2
curl -v "http://$IP_ADDRESS:8000/setup/ajax.dataloader.php" \
  -H "Content-Type: application/x-www-form-urlencoded; charset=UTF-8" \
  -H "Accept: */*" \
  -H "Accept-Language: en-GB,en;q=0.9" \
  -H "Origin: http://$IP_ADDRESS:8000" \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.2 Safari/605.1.15" \
  -H "Connection: keep-alive" \
  -H "Referer: http://$IP_ADDRESS:8000/setup/wizard.php" \
  -H "Cookie: $ITOP_COOKIE" \
  -H "X-Requested-With: XMLHttpRequest" \
  --data-raw "operation=async_action&step_class=WizStepSummary&step_state=&code=execute_step&authent=$AUTHENTICATION_TOKEN&params%5Binstaller_step%5D=load-data&params%5Binstaller_config%5D=%7B%22mode%22%3A%22install%22%2C%22preinstall%22%3A%7B%22copies%22%3A%5B%5D%7D%2C%22source_dir%22%3A%22datamodels%5C%2F2.x%5C%2F%22%2C%22datamodel_version%22%3A%223.0.0-beta5%22%2C%22previous_configuration_file%22%3A%22%22%2C%22extensions_dir%22%3A%22extensions%22%2C%22target_env%22%3A%22production%22%2C%22workspace_dir%22%3A%22%22%2C%22database%22%3A%7B%22server%22%3A%22%22%2C%22user%22%3A%22root%22%2C%22pwd%22%3A%22%22%2C%22name%22%3A%22mysql%22%2C%22db_tls_enabled%22%3A%22%22%2C%22db_tls_ca%22%3A%22%22%2C%22prefix%22%3A%22%22%7D%2C%22url%22%3A%22http%3A%5C%2F%5C%2F$IP_ADDRESS%3A8000%5C%2F%22%2C%22graphviz_path%22%3A%22%5C%2Fusr%5C%2Fbin%5C%2Fdot%22%2C%22admin_account%22%3A%7B%22user%22%3A%22admin%22%2C%22pwd%22%3A%22dynatrace%22%2C%22language%22%3A%22EN+US%22%7D%2C%22language%22%3A%22EN+US%22%2C%22selected_modules%22%3A%5B%22authent-cas%22%2C%22authent-external%22%2C%22authent-ldap%22%2C%22authent-local%22%2C%22itop-backup%22%2C%22itop-config%22%2C%22itop-files-information%22%2C%22itop-portal-base%22%2C%22itop-profiles-itil%22%2C%22itop-sla-computation%22%2C%22itop-structure%22%2C%22itop-welcome-itil%22%2C%22itop-config-mgmt%22%2C%22itop-attachments%22%2C%22itop-tickets%22%2C%22combodo-db-tools%22%2C%22itop-core-update%22%2C%22itop-hub-connector%22%2C%22itop-datacenter-mgmt%22%2C%22itop-endusers-devices%22%2C%22itop-storage-mgmt%22%2C%22itop-virtualization-mgmt%22%2C%22itop-bridge-virtualization-storage%22%2C%22itop-service-mgmt-provider%22%2C%22itop-bridge-cmdb-ticket%22%2C%22itop-incident-mgmt-itil%22%2C%22itop-change-mgmt-itil%22%5D%2C%22selected_extensions%22%3A%5B%22itop-config-mgmt-core%22%2C%22itop-config-mgmt-datacenter%22%2C%22itop-config-mgmt-end-user%22%2C%22itop-config-mgmt-storage%22%2C%22itop-config-mgmt-virtualization%22%2C%22itop-service-mgmt-service-provider%22%2C%22itop-ticket-mgmt-itil%22%2C%22itop-ticket-mgmt-itil-incident%22%2C%22itop-change-mgmt-itil%22%5D%2C%22sample_data%22%3Afalse%2C%22old_addon%22%3Afalse%2C%22options%22%3A%5B%5D%2C%22mysql_bindir%22%3A%22%22%7D" \
  --compressed ;
sleep 2
curl -v "http://$IP_ADDRESS:8000/setup/ajax.dataloader.php" \
  -H "Content-Type: application/x-www-form-urlencoded; charset=UTF-8" \
  -H "Accept: */*" \
  -H "Accept-Language: en-GB,en;q=0.9" \
  -H "Origin: http://$IP_ADDRESS:8000" \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.2 Safari/605.1.15" \
  -H "Connection: keep-alive" \
  -H "Referer: http://$IP_ADDRESS:8000/setup/wizard.php" \
  -H "Cookie: $ITOP_COOKIE" \
  -H "X-Requested-With: XMLHttpRequest" \
  --data-raw "operation=async_action&step_class=WizStepSummary&step_state=&code=execute_step&authent=$AUTHENTICATION_TOKEN&params%5Binstaller_step%5D=create-config&params%5Binstaller_config%5D=%7B%22mode%22%3A%22install%22%2C%22preinstall%22%3A%7B%22copies%22%3A%5B%5D%7D%2C%22source_dir%22%3A%22datamodels%5C%2F2.x%5C%2F%22%2C%22datamodel_version%22%3A%223.0.0-beta5%22%2C%22previous_configuration_file%22%3A%22%22%2C%22extensions_dir%22%3A%22extensions%22%2C%22target_env%22%3A%22production%22%2C%22workspace_dir%22%3A%22%22%2C%22database%22%3A%7B%22server%22%3A%22%22%2C%22user%22%3A%22root%22%2C%22pwd%22%3A%22%22%2C%22name%22%3A%22mysql%22%2C%22db_tls_enabled%22%3A%22%22%2C%22db_tls_ca%22%3A%22%22%2C%22prefix%22%3A%22%22%7D%2C%22url%22%3A%22http%3A%5C%2F%5C%2F$IP_ADDRESS%3A8000%5C%2F%22%2C%22graphviz_path%22%3A%22%5C%2Fusr%5C%2Fbin%5C%2Fdot%22%2C%22admin_account%22%3A%7B%22user%22%3A%22admin%22%2C%22pwd%22%3A%22dynatrace%22%2C%22language%22%3A%22EN+US%22%7D%2C%22language%22%3A%22EN+US%22%2C%22selected_modules%22%3A%5B%22authent-cas%22%2C%22authent-external%22%2C%22authent-ldap%22%2C%22authent-local%22%2C%22itop-backup%22%2C%22itop-config%22%2C%22itop-files-information%22%2C%22itop-portal-base%22%2C%22itop-profiles-itil%22%2C%22itop-sla-computation%22%2C%22itop-structure%22%2C%22itop-welcome-itil%22%2C%22itop-config-mgmt%22%2C%22itop-attachments%22%2C%22itop-tickets%22%2C%22combodo-db-tools%22%2C%22itop-core-update%22%2C%22itop-hub-connector%22%2C%22itop-datacenter-mgmt%22%2C%22itop-endusers-devices%22%2C%22itop-storage-mgmt%22%2C%22itop-virtualization-mgmt%22%2C%22itop-bridge-virtualization-storage%22%2C%22itop-service-mgmt-provider%22%2C%22itop-bridge-cmdb-ticket%22%2C%22itop-incident-mgmt-itil%22%2C%22itop-change-mgmt-itil%22%5D%2C%22selected_extensions%22%3A%5B%22itop-config-mgmt-core%22%2C%22itop-config-mgmt-datacenter%22%2C%22itop-config-mgmt-end-user%22%2C%22itop-config-mgmt-storage%22%2C%22itop-config-mgmt-virtualization%22%2C%22itop-service-mgmt-service-provider%22%2C%22itop-ticket-mgmt-itil%22%2C%22itop-ticket-mgmt-itil-incident%22%2C%22itop-change-mgmt-itil%22%5D%2C%22sample_data%22%3Afalse%2C%22old_addon%22%3Afalse%2C%22options%22%3A%5B%5D%2C%22mysql_bindir%22%3A%22%22%7D" \
  --compressed ;
sleep 2
curl -v "http://$IP_ADDRESS:8000/setup/wizard.php" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" \
  -H "Accept-Language: en-GB,en;q=0.9" \
  -H "Origin: http://$IP_ADDRESS:8000" \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.2 Safari/605.1.15" \
  -H "Connection: keep-alive" \
  -H "Upgrade-Insecure-Requests: 1" \
  -H "Referer: http://$IP_ADDRESS:8000/setup/wizard.php" \
  -H "Cookie: $ITOP_COOKIE" \
  --data-raw "_class=WizStepSummary&_state=&_params%5Bmisc_options%5D=%5B%5D&_params%5Bauthent%5D=$AUTHENTICATION_TOKEN&_params%5Bprevious_version_dir%5D=&_params%5Bdb_server%5D=&_params%5Bdb_user%5D=root&_params%5Bdb_pwd%5D=&_params%5Bdb_name%5D=mysql&_params%5Bdb_prefix%5D=&_params%5Bdb_backup%5D=1&_params%5Bdb_backup_path%5D=%2Fvar%2Fwww%2Fhtml%2Fdata%2Fbackups%2Fmanual%2Fsetup-2022-02-14_09_52&_params%5Bdb_tls_enabled%5D=&_params%5Bdb_tls_ca%5D=&_params%5Binstall_mode%5D=install&_params%5Bsource_dir%5D=%2Fvar%2Fwww%2Fhtml%2Fdatamodels%2F2.x%2F&_params%5Bdatamodel_version%5D=3.0.0-beta5&_params%5Baccept_license%5D=yes&_params%5Bnew_db_name%5D=&_params%5Bcreate_db%5D=no&_params%5Bdb_new_name%5D=&_params%5Badmin_user%5D=admin&_params%5Badmin_pwd%5D=dynatrace&_params%5Bconfirm_pwd%5D=dynatrace&_params%5Badmin_language%5D=EN+US&_params%5Bdefault_language%5D=EN+US&_params%5Bapplication_url%5D=http%3A%2F%2F$IP_ADDRESS%3A8000%2F&_params%5Bgraphviz_path%5D=%2Fusr%2Fbin%2Fdot&_params%5Bsample_data%5D=no&_params%5Badditional_extensions_modules%5D=%5B%5D&_params%5Bselected_components%5D=%5B%7B%22_0%22%3A%22_0%22%2C%22_1%22%3A%22_1%22%2C%22_2%22%3A%22_2%22%2C%22_3%22%3A%22_3%22%2C%22_4%22%3A%22_4%22%7D%2C%7B%22_0%22%3A%22_1%22%7D%2C%7B%22_0%22%3A%22_1%22%2C%22_1_1%22%3A%22_1_1%22%7D%2C%7B%22_0%22%3A%22_1%22%7D%2C%5B%5D%5D&_params%5Bselected_modules%5D=%5B%22authent-cas%22%2C%22authent-external%22%2C%22authent-ldap%22%2C%22authent-local%22%2C%22itop-backup%22%2C%22itop-config%22%2C%22itop-files-information%22%2C%22itop-portal-base%22%2C%22itop-profiles-itil%22%2C%22itop-sla-computation%22%2C%22itop-structure%22%2C%22itop-welcome-itil%22%2C%22itop-config-mgmt%22%2C%22itop-attachments%22%2C%22itop-tickets%22%2C%22combodo-db-tools%22%2C%22itop-core-update%22%2C%22itop-hub-connector%22%2C%22itop-datacenter-mgmt%22%2C%22itop-endusers-devices%22%2C%22itop-storage-mgmt%22%2C%22itop-virtualization-mgmt%22%2C%22itop-bridge-virtualization-storage%22%2C%22itop-service-mgmt-provider%22%2C%22itop-bridge-cmdb-ticket%22%2C%22itop-incident-mgmt-itil%22%2C%22itop-change-mgmt-itil%22%5D&_params%5Bselected_extensions%5D=%5B%22itop-config-mgmt-core%22%2C%22itop-config-mgmt-datacenter%22%2C%22itop-config-mgmt-end-user%22%2C%22itop-config-mgmt-storage%22%2C%22itop-config-mgmt-virtualization%22%2C%22itop-service-mgmt-service-provider%22%2C%22itop-ticket-mgmt-itil%22%2C%22itop-ticket-mgmt-itil-incident%22%2C%22itop-change-mgmt-itil%22%5D&_params%5Bdisplay_choices%5D=%3Cul%3E%3Cli%3E%3Ci%3ECAS+SSO+%28hidden%29%3C%2Fi%3E%3C%2Fli%3E%3Cli%3E%3Ci%3EExternal+user+authentication+%28hidden%29%3C%2Fi%3E%3C%2Fli%3E%3Cli%3E%3Ci%3EUser+authentication+based+on+LDAP+%28hidden%29%3C%2Fi%3E%3C%2Fli%3E%3Cli%3E%3Ci%3EUser+authentication+based+on+the+local+DB+%28hidden%29%3C%2Fi%3E%3C%2Fli%3E%3Cli%3E%3Ci%3EBackup+utilities+%28hidden%29%3C%2Fi%3E%3C%2Fli%3E%3Cli%3E%3Ci%3EConfiguration+editor+%28hidden%29%3C%2Fi%3E%3C%2Fli%3E%3Cli%3E%3Ci%3EiTop+files+information+%28hidden%29%3C%2Fi%3E%3C%2Fli%3E%3Cli%3E%3Ci%3EPortal+Development+Library+%28hidden%29%3C%2Fi%3E%3C%2Fli%3E%3Cli%3E%3Ci%3ECreate+standard+ITIL+profiles+%28hidden%29%3C%2Fi%3E%3C%2Fli%3E%3Cli%3E%3Ci%3ESLA+Computation+%28hidden%29%3C%2Fi%3E%3C%2Fli%3E%3Cli%3E%3Ci%3ECore+iTop+Structure+%28hidden%29%3C%2Fi%3E%3C%2Fli%3E%3Cli%3E%3Ci%3EITIL+skin+%28hidden%29%3C%2Fi%3E%3C%2Fli%3E%3Cli%3EConfiguration+Management+Core%3C%2Fli%3E%3C%2Fli%3E%3Cli%3EData+Center+Devices%3C%2Fli%3E%3C%2Fli%3E%3Cli%3EEnd-User+Devices%3C%2Fli%3E%3C%2Fli%3E%3Cli%3EStorage+Devices%3C%2Fli%3E%3C%2Fli%3E%3Cli%3EVirtualization%3C%2Fli%3E%3C%2Fli%3E%3Cli%3ELinks+between+virtualization+and+storage+%28auto_select%29%3C%2Fli%3E%3Cli%3EService+Management+for+Service+Providers%3C%2Fli%3E%3C%2Fli%3E%3Cli%3EBridge+for+CMDB+and+Ticket+%28auto_select%29%3C%2Fli%3E%3Cli%3EITIL+Compliant+Tickets+Management%3C%2Fli%3E%3Cul%3E%3Cli%3EIncident+Management%3C%2Fli%3E%3C%2Fli%3E%3C%2Ful%3E%3C%2Fli%3E%3Cli%3EITIL+Change+Management%3C%2Fli%3E%3C%2Fli%3E%3C%2Ful%3E&_steps=%5B%7B%22class%22%3A%22WizStepWelcome%22%2C%22state%22%3A%22%22%7D%2C%7B%22class%22%3A%22WizStepInstallOrUpgrade%22%2C%22state%22%3A%22%22%7D%2C%7B%22class%22%3A%22WizStepLicense%22%2C%22state%22%3A%22%22%7D%2C%7B%22class%22%3A%22WizStepDBParams%22%2C%22state%22%3A%22%22%7D%2C%7B%22class%22%3A%22WizStepAdminAccount%22%2C%22state%22%3A%22%22%7D%2C%7B%22class%22%3A%22WizStepInstallMiscParams%22%2C%22state%22%3A%22%22%7D%2C%7B%22class%22%3A%22WizStepModulesChoice%22%2C%22state%22%3A%22start_install%22%7D%2C%7B%22class%22%3A%22WizStepModulesChoice%22%2C%22state%22%3A%221%22%7D%2C%7B%22class%22%3A%22WizStepModulesChoice%22%2C%22state%22%3A%222%22%7D%2C%7B%22class%22%3A%22WizStepModulesChoice%22%2C%22state%22%3A%223%22%7D%2C%7B%22class%22%3A%22WizStepModulesChoice%22%2C%22state%22%3A%224%22%7D%5D&operation=next" \
  --compressed ;
sleep 2
curl -v "http://$IP_ADDRESS:8000/pages/ajax.document.php?operation=dict&s=EN%20US-7b610d406f5b5712d359e6ea1dfb388a&t=1644828891.4239" \
  -H "Cookie: $ITOP_COOKIE" \
  -H "Accept: */*" \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.2 Safari/605.1.15" \
  -H "Accept-Language: en-GB,en;q=0.9" \
  -H "Referer: http://$IP_ADDRESS:8000/setup/wizard.php" \
  -H "Connection: keep-alive" \
  --compressed ;
sleep 2
curl -v "http://$IP_ADDRESS:8000/pages/exec.php?exec_module=itop-hub-connector&exec_page=launch.php&target=inform_after_setup" \
  -H "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" \
  -H "Cookie: $ITOP_COOKIE" \
  -H "Upgrade-Insecure-Requests: 1" \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.2 Safari/605.1.15" \
  -H "Referer: http://$IP_ADDRESS:8000/setup/wizard.php" \
  -H "Accept-Language: en-GB,en;q=0.9" \
  -H "Connection: keep-alive" \
  --compressed ;
sleep 2
curl -v "http://$IP_ADDRESS:8000/pages/exec.php?exec_module=itop-hub-connector&exec_page=launch.php&target=inform_after_setup" \
  -H "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" \
  -H "Cookie: $ITOP_COOKIE" \
  -H "Upgrade-Insecure-Requests: 1" \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.2 Safari/605.1.15" \
  -H "Referer: http://$IP_ADDRESS:8000/setup/wizard.php" \
  -H "Accept-Language: en-GB,en;q=0.9" \
  -H "Connection: keep-alive" \
  --compressed ;
sleep 2
curl -v "http://$IP_ADDRESS:8000/pages/ajax.document.php?operation=dict&s=EN%20US-7b610d406f5b5712d359e6ea1dfb388a&t=1644828891.4239" --compressed ;
sleep 2
curl -v "http://$IP_ADDRESS:8000/pages/UI.php" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" \
  -H "Accept-Language: en-GB,en;q=0.9" \
  -H "Origin: http://$IP_ADDRESS:8000" \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.2 Safari/605.1.15" \
  -H "Connection: keep-alive" \
  -H "Upgrade-Insecure-Requests: 1" \
  -H "Referer: http://$IP_ADDRESS:8000/setup/wizard.php" \
  -H "Cookie: $ITOP_COOKIE" \
  --data-raw "auth_user=admin&auth_pwd=dynatrace" \
  --compressed ;
sleep 2
curl -v "http://$IP_ADDRESS:8000/pages/ajax.document.php?operation=dict&s=EN%20US-33bf9e9a0701df21bf40d246db4fd531&t=1644828891.4239" \
  -H "Cookie: $ITOP_COOKIE" \
  -H "Accept: */*" \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.2 Safari/605.1.15" \
  -H "Accept-Language: en-GB,en;q=0.9" \
  -H "Referer: http://$IP_ADDRESS:8000/pages/UI.php" \
  -H "Connection: keep-alive" \
  --compressed ;
sleep 2
curl -v "http://$IP_ADDRESS:8000/pages/ajax.render.php" \
  -H "Content-Type: application/x-www-form-urlencoded; charset=UTF-8" \
  -H "Accept: application/json, text/javascript, */*; q=0.01" \
  -H "Accept-Language: en-GB,en;q=0.9" \
  -H "Origin: http://$IP_ADDRESS:8000" \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.2 Safari/605.1.15" \
  -H "Referer: http://$IP_ADDRESS:8000/pages/UI.php" \
  -H "Connection: keep-alive" \
  -H "Cookie: $ITOP_COOKIE" \
  -H "X-Combodo-Ajax: true" \
  -H "X-Requested-With: XMLHttpRequest" \
  --data-raw "operation=get_menus_count&c%5Borg_id%5D=" \
  --compressed ;
sleep 2
curl -v "http://$IP_ADDRESS:8000/pages/ajax.render.php" \
  -H "Content-Type: application/x-www-form-urlencoded; charset=UTF-8" \
  -H "Accept: */*" \
  -H "Accept-Language: en-GB,en;q=0.9" \
  -H "Origin: http://$IP_ADDRESS:8000" \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.2 Safari/605.1.15" \
  -H "Referer: http://$IP_ADDRESS:8000/pages/UI.php" \
  -H "Connection: keep-alive" \
  -H "Cookie: $ITOP_COOKIE" \
  -H "X-Combodo-Ajax: true" \
  -H "X-Requested-With: XMLHttpRequest" \
  --data-raw "operation=set_pref&code=welcome_popup&value=1" \
  --compressed ;
sleep 2

