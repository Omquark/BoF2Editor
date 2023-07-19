TEMP_PATH="/var/tmp/bof2editor"
EDITOR_PASSWORD="bof2editor"

EXPECTED_USER="root"

echo $USER
#Verify user
if [ ! $USER = $EXPECTED_USER ]
then
        echo "$(date) This program must be run as $EXPECTED_USER"
        exit 1
fi

#Create the user. Do this here so we can chmod later with created folders
useradd -m bof2editor -p $EDITOR_PASSWORD
groupadd bof2editorg
usermod -a -G bof2editorg bof2editor

#Check if install path exists and remove it if it does
if [ -d $INSTALL_PATH ]
then
        echo "$(date) Directory $INSTALL_PATH exists. I will remove this folder without prejudice!"
        rm $INSTALL_PATH -rf
fi

mkdir $INSTALL_PATH
chown -R bof2editor:bof2editorg $INSTALL_PATH

#Check the config path and remove it if it's there
if [ -d $CONFIG_PATH ]
then
        echo "$(date) Directory $CONFIG_PATH exists. I will remove this folder without prejudice!"
        rm $CONFIG_PATH -rf
fi

mkdir $CONFIG_PATH
chown -R bof2editor:bof2editorg $CONFIG_PATH

#Check for the log path and reove it if it's there
if [ -d $LOG_PATH ]
then
        echo "$(date) Directory $LOG_PATH exists. I will remove this folder without prejudice!"
        rm $LOG_PATH -rf
fi

mkdir $LOG_PATH
chown -R bof2editor:bof2editorg $LOG_PATH

echo "$(date) Creating installation binaries @ $INSTALL_PATH/bin"
mkdir "$INSTALL_PATH/bin"
echo "$(date) Copying library directory @ $INSTALL_PATH/lib"
mkdir "$INSTALL_PATH/lib"
echo "$(date) Creating logs directory @ $LOG_PATH/logs"
mkdir "$LOG_PATH/logs"

echo "$(date) Installing NodeJS 18.x latest"
curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
apt-get install nodejs -y
apt-get install npm -y

cd $TEMP_PATH
echo "$(date) Copying configuration"
cp $TEMP_PATH/config/config.prop $CONFIG_PATH/config.prop
echo "$(date) Copying back-end"
cp app.jar $INSTALL_PATH/lib/app.jar
cp scripts/* $INSTALL_PATH/bin/ -r
echo "$(date) Copying front-end"
cp build $INSTALL_PATH/bin -r
cp server.js $INSTALL_PATH/bin/server.js
cp package.json $INSTALL_PATH/bin/package.json
echo "$(date) Running npm install on the server"
cd $INSTALL_PATH/bin/
npm i --omit-dev
cd $TEMP_PATH

echo "$(date) Removing installation files"
rm "/opt/bof2editor/bin/BOF2EDITORinstall.ksh" -f

echo "$(date) Updating security properties"
chmod -R 755 $INSTALL_PATH
chown -R bof2editor:bof2editorg $INSTALL_PATH
chmod -R 755 $CONFIG_PATH
chown -R bof2editor:bof2editorg $CONFIG_PATH
chmod -R 755 $LOG_PATH
chown -R bof2editor:bof2editorg $LOG_PATH
cd /
cp $TEMP_PATH/BOF2EDITORInstall.log /var/opt/bof2editor/logs
#rm $TEMP_PATH -rf