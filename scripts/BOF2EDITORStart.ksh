echo "Please see the logs @ /var/opt/bof2editor/logs for any information"
echo "I will not complain here any further"
cd /opt/bof2editor/bin
./BOF2EDITORStartFront.ksh >> /var/opt/bof2editor/logs/BOF2EDITORStartFront.log &
./BOF2EDITORStartBack.ksh >> /var/opt/bof2editor/logs/BOF2EDITORStartBack.log