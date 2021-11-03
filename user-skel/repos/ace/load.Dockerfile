FROM ubuntu

apt update && sudo apt upgrade
install curl
COPY helpers/gen_load.sh ./gen_load.sh

CMD ["./gen_load.sh", "$SERVICE_ENDPOINT", "$STAGE"]