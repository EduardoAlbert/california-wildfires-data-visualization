**README.md**

# California Wildfires - Data Visualization

Este repositório contém visualizações interativas dos incidentes de incêndio na Califórnia entre 2013 e 2020. Os dados foram obtidos a partir do conjunto de dados disponível no Kaggle [California Wildfire Incidents (2013-2020)](https://www.kaggle.com/ananthu017/california-wildfire-incidents-20132020).

## Sobre o Conjunto de Dados

O conjunto de dados abrange informações detalhadas sobre incêndios florestais, incluindo a área queimada, número de pessoas feridas, classificação de grandes incidentes, data de início e data de extinção. Algumas colunas adicionais foram criadas durante o processamento dos dados, como a coluna 'TimeToExtinguish', que representa o tempo necessário para extinguir o incêndio em minutos.

## Como Utilizar as Visualizações

Para visualizar as interativas visualizações dos dados, siga os passos abaixo:

1. **Requisitos:**
   - Certifique-se de ter o [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) instalado em seu ambiente de desenvolvimento.

2. **Clonagem do Repositório:**
   ```bash
   git clone https://github.com/eduardoalbert/california-wildfires-data-visualization.git
   cd california-wildfires-data-visualization
   ```

3. **Executando o Live Server:**
   - Abra o arquivo `index.html` utilizando o Live Server para garantir o correto funcionamento das visualizações.

4. **Explorando as Visualizações:**
   - Uma vez que o Live Server estiver em execução, acesse o endereço fornecido (geralmente http://127.0.0.1:5500) no seu navegador.

   - Interaja com os quatro gráficos interativos, explorando diferentes aspectos dos incidentes de incêndio na Califórnia.

## Visualizações Disponíveis

1. **Histograma Anual de Incêndios**
   - Explore o número de incêndios ao longo dos anos.

2. **Relação Área Queimada X Pessoas Feridas (Gráfico Scatter)**
   - Analise a relação entre a área queimada e o número de pessoas feridas.

3. **Relação Área Queimada X Tempo para Extinguir**
   - Examine como a área queimada se relaciona com o tempo necessário para extinguir o incêndio.

4. **Relação Tempo para Extinguir X Pessoas Feridas**
   - Observe como o tempo necessário para extinguir o incêndio está relacionado ao número de pessoas feridas.

## Tecnologias Utilizadas

As visualizações foram criadas utilizando a biblioteca JavaScript [d3.js](https://d3js.org/), que proporciona um ambiente flexível para a criação de gráficos interativos.

## Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para propor melhorias nas visualizações ou fornecer insights adicionais com base nos dados.

## Referências
- [California Wildfire Incidents (2013-2020) Kaggle Dataset](https://www.kaggle.com/datasets/ananthu017/california-wildfire-incidents-20132020)
- [d3.js - Data-Driven Documents](https://d3js.org/)