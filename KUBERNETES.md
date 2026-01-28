# Kubernetes Deployment - Pet Manager

Este documento descreve como fazer deploy da aplicação Pet Manager em um cluster Kubernetes.

## Pré-requisitos

- Cluster Kubernetes (minikube, EKS, GKE, AKS, ou outro)
- kubectl configurado e conectado ao cluster
- Docker image construída e disponível no registry

## Estrutura de Arquivos

```
k8s/
├── deployment.yaml     # Deployment, Service e HPA
├── ingress.yaml       # Ingress para acesso externo
└── configmap.yaml     # Configuração do Nginx
```

## Build da Imagem Docker

Antes de fazer deploy no Kubernetes, construa a imagem Docker:

```bash
# Build local
docker build -t pet-manager:latest .

# Tag para registry (exemplo Docker Hub)
docker tag pet-manager:latest seu-usuario/pet-manager:latest

# Push para registry
docker push seu-usuario/pet-manager:latest
```

## Deploy no Kubernetes

### 1. Criar ConfigMap

```bash
kubectl apply -f k8s/configmap.yaml
```

### 2. Criar Deployment e Service

```bash
kubectl apply -f k8s/deployment.yaml
```

Este comando criará:
- **Deployment**: 3 réplicas do frontend
- **Service**: LoadBalancer para acesso externo
- **HorizontalPodAutoscaler**: Auto-scaling de 3 a 10 pods

### 3. Criar Ingress (Opcional)

Se você tiver um Ingress Controller instalado:

```bash
kubectl apply -f k8s/ingress.yaml
```

**Nota:** Edite `ingress.yaml` e substitua `pet-manager.example.com` pelo seu domínio.

## Verificar Deployment

### Verificar Pods

```bash
kubectl get pods -l app=pet-manager
```

Saída esperada:
```
NAME                                    READY   STATUS    RESTARTS   AGE
pet-manager-frontend-xxxxxxxxxx-xxxxx   1/1     Running   0          30s
pet-manager-frontend-xxxxxxxxxx-xxxxx   1/1     Running   0          30s
pet-manager-frontend-xxxxxxxxxx-xxxxx   1/1     Running   0          30s
```

### Verificar Service

```bash
kubectl get service pet-manager-frontend-service
```

### Verificar HPA

```bash
kubectl get hpa pet-manager-hpa
```

### Verificar Logs

```bash
# Logs de um pod específico
kubectl logs -f <pod-name>

# Logs de todos os pods
kubectl logs -f -l app=pet-manager
```

## Acessar a Aplicação

### LoadBalancer

Se estiver usando um provider de cloud:

```bash
kubectl get service pet-manager-frontend-service
```

Acesse o EXTERNAL-IP mostrado no output.

### Minikube

Se estiver usando Minikube:

```bash
minikube service pet-manager-frontend-service
```

### Port Forward (Desenvolvimento)

Para acessar localmente sem LoadBalancer:

```bash
kubectl port-forward service/pet-manager-frontend-service 8080:80
```

Acesse: http://localhost:8080

## Health Checks

A aplicação expõe 3 endpoints de health check:

- `/health` - Liveness probe
- `/healthz` - Health check alternativo
- `/ready` - Readiness probe

Testar:

```bash
POD_NAME=$(kubectl get pods -l app=pet-manager -o jsonpath='{.items[0].metadata.name}')
kubectl exec $POD_NAME -- curl http://localhost/health
```

## Scaling Manual

### Escalar Deployment

```bash
# Aumentar para 5 réplicas
kubectl scale deployment pet-manager-frontend --replicas=5

# Verificar
kubectl get pods -l app=pet-manager
```

### Auto-scaling (HPA)

O HPA já está configurado para escalar automaticamente:
- Mínimo: 3 réplicas
- Máximo: 10 réplicas
- Trigger: CPU > 70% ou Memória > 80%

## Atualizar Aplicação

### Rolling Update

```bash
# Build nova versão
docker build -t seu-usuario/pet-manager:v2.0 .
docker push seu-usuario/pet-manager:v2.0

# Atualizar deployment
kubectl set image deployment/pet-manager-frontend pet-manager=seu-usuario/pet-manager:v2.0

# Verificar rollout
kubectl rollout status deployment/pet-manager-frontend
```

### Rollback

Se algo der errado:

```bash
kubectl rollout undo deployment/pet-manager-frontend
```

## Troubleshooting

### Pod não inicia

```bash
kubectl describe pod <pod-name>
kubectl logs <pod-name>
```

### Service não responde

```bash
kubectl describe service pet-manager-frontend-service
kubectl get endpoints pet-manager-frontend-service
```

### HPA não funciona

```bash
# Verificar se metrics-server está instalado
kubectl get deployment metrics-server -n kube-system

# Instalar metrics-server se necessário
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```

## Remover Deployment

```bash
kubectl delete -f k8s/deployment.yaml
kubectl delete -f k8s/ingress.yaml
kubectl delete -f k8s/configmap.yaml
```

## Recursos do Deployment

### Recursos por Pod

- **Requests**: 64Mi RAM, 100m CPU
- **Limits**: 128Mi RAM, 200m CPU

### Total para 3 réplicas

- **RAM**: 192Mi (requests) - 384Mi (limits)
- **CPU**: 300m (requests) - 600m (limits)

## Monitoramento

### Prometheus (se instalado)

```yaml
apiVersion: v1
kind: Service
metadata:
  name: pet-manager-frontend-service
  annotations:
    prometheus.io/scrape: "true"
    prometheus.io/port: "80"
    prometheus.io/path: "/metrics"
```

### Logs Centralizados

Use ferramentas como:
- Fluentd
- Elasticsearch + Kibana (ELK)
- Grafana Loki

## Boas Práticas Implementadas

1. **Health Checks**: Liveness e Readiness probes configurados
2. **Resource Limits**: Requests e limits definidos
3. **Auto-scaling**: HPA configurado
4. **Multiple Replicas**: 3 réplicas por padrão para alta disponibilidade
5. **Security**: Headers de segurança no Nginx
6. **Compression**: Gzip habilitado
7. **Cache**: Cache de assets estáticos
8. **Rolling Updates**: Zero-downtime deployments

## Ambientes

### Desenvolvimento (Minikube)

```bash
minikube start
kubectl apply -f k8s/
minikube service pet-manager-frontend-service
```

### Produção (Cloud)

Ajuste conforme seu provider:

**AWS EKS:**
```bash
aws eks update-kubeconfig --name seu-cluster
kubectl apply -f k8s/
```

**Google GKE:**
```bash
gcloud container clusters get-credentials seu-cluster
kubectl apply -f k8s/
```

**Azure AKS:**
```bash
az aks get-credentials --resource-group seu-rg --name seu-cluster
kubectl apply -f k8s/
```

## Segurança

### Network Policies (Exemplo)

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: pet-manager-network-policy
spec:
  podSelector:
    matchLabels:
      app: pet-manager
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          role: frontend
    ports:
    - protocol: TCP
      port: 80
```

### Secrets (se necessário)

```bash
kubectl create secret generic pet-manager-secrets \
  --from-literal=api-key=sua-chave-aqui
```

## Performance

### Cache de Imagem

Certifique-se de que o `imagePullPolicy` está configurado corretamente:
- `Always`: Sempre baixa a imagem
- `IfNotPresent`: Usa cache local se disponível
- `Never`: Nunca baixa, apenas usa local

### Persistent Volumes (se necessário)

Para dados persistentes, adicione PVC ao deployment.

## Custos

Estimativa de custos para 3 réplicas:

**AWS EKS:**
- t3.small nodes: ~$0.02/hora por pod
- LoadBalancer: ~$0.025/hora
- **Total**: ~$60-100/mês

**Google GKE:**
- e2-small nodes: ~$0.02/hora por pod
- LoadBalancer: ~$0.025/hora
- **Total**: ~$60-100/mês

**Azure AKS:**
- B2s nodes: ~$0.02/hora por pod
- LoadBalancer: ~$0.025/hora
- **Total**: ~$60-100/mês
