pm2 stop "sap-challenge-backend"
git pull
npm install
npm run build
pm2 restart "sap-challenge-backend"