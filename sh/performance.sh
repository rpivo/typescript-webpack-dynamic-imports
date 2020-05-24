for run in {1..10}
do
lighthouse http://localhost:3000/br/index.html --emulated-form-factor=none --only-categories=performance --output=json --output-path=./reports/br-$(date +"%Y-%m-%d-%I-%M-%S-%p").json
lighthouse http://localhost:3000/gz/index.html --emulated-form-factor=none --only-categories=performance --output=json --output-path=./reports/gz-$(date +"%Y-%m-%d-%I-%M-%S-%p").json
done
node report.js