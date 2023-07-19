EXEC_PATH="$INSTALL_PATH/lib/app.jar"

EXPECTED_USER="bof2editor"

if [ ! $USER = $EXPECTED_USER ]
then
    echo "This program must be run as $EXPECTED_USER"
    exit 1
fi

java -jar $EXEC_PATH