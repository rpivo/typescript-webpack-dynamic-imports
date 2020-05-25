depth=$1
num=${depth//[!0-9]/}
for i in $(seq ${num:-1})
do
lighthouse http://localhost:3000/br/index.html --emulated-form-factor=none --only-categories=performance --output=json --output-path=./reports/br-$(date +"%Y-%m-%d-%I-%M-%S-%p").json
lighthouse http://localhost:3000/gz/index.html --emulated-form-factor=none --only-categories=performance --output=json --output-path=./reports/gz-$(date +"%Y-%m-%d-%I-%M-%S-%p").json
done
printf "\n\nAveraged Metrics\n"
node report.js
printf "\n"