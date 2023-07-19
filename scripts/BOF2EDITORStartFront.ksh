#INSTALL_PATH="/opt/bof2editor"
#CONFIG_PATH="/etc/opt/bof2editor"
#LOG_PATH="/var/opt/bof2editor"

USER=$(whoami)

EXPECTED_USER="bof2editor"

if [ ! $EXPECTED_USER = $USER ]
then
	echo "$(date) This program must be run as $EXPECTED_USER"
	exit 1
fi

cd $INSTALL_PATH/bin
node server.js