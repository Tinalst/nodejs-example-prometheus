## Getting started
Navigate into the project directory:
```bash
cd nodejs-monitoring-with-prometheus-and-grafana
```

Start the Docker containers in the backend:
```bash
docker-compose up -d
```

start nodejs application
```bash
cd nodejs-monitoring-with-prometheus-and-grafana/example-nodejs-app
npm  i
node  nodejs-monitoring-with-prometheus-and-grafana/example-nodejs-app index.js
```

## Test containers
- Prometheus should be accessible via [http://localhost:9090](http://localhost:9090)
- Grafana should be accessible via [http://localhost:3000](http://localhost:3000)
- Example Node.js server metrics for RED monitoring should be accessible via [http://localhost:8080/metrics](http://localhost:8080/metrics)

## Open monitoring dashboards
Open in your web browser the monitoring dashboards:
- Monitoring dashboard for the Node.js app can be found on[http://localhost:3000/d/1DYaynomMk/example-service-dashboard](http://localhost:3000/d/cYyJzluGz/my-balance?orgId=1)
