## Technologies

- **Frontend:** Angular
- **Containerization:** Docker
- **Cloud:** Microsoft Azure
- **Container Registry:** Azure Container Registry
- **Deployment:** Azure Container Instances


Настоящият проект представя хостинг на динамичен уеб сайт на Azure. За реализирането му са ползвани технологии Node.js и Angular, а също и JavaScript библиотека за интерактивни карти  Leaflet. По зададени координати приложението показва маршрут на картата.
На посочения github адрес е качен сорс кодът на приложенито: https://github.com/nevena-angelova/RoutesOptimizer/tree/master/RoutesOptimizer.Client

Docker е платформа за разработка, разпространение и стартиране на приложения в изолирани среди, наречени контейнери.
Контейнерите се изолират един от друг и от хост операционната система, като използват ядрото на хоста за да изпълняват приложенията, но без да е необходимо да имат собствена операционна система.
Това прави Docker контейнерите много по-леки и бързи в сравнение с виртуалните машини.

# 1. Създаване на docker container
За целта първо  се създава docker image на базата на Docker файл. В него са описани стъпките по изграждането на контейнера.

За целта първо се създава docker image на базата на Docker файл. В него са
описани стъпките по изграждането на контейнера.

```dockerfile
# Стъпка 1: Изграждане на Angular приложението
FROM node:latest AS build

# Задава работната директория в контейнера
WORKDIR /app

# Инсталира нужните пакети
COPY package.json ./
RUN npm install

# Копира сорс кода на приложението в контейнера
COPY . .

# Изграждане на Angular приложението
RUN npm run build

# Стъпка 2: Стартиране на приложението с NGINX
FROM nginx:alpine

# Копиране на изграденото съдържание в публичната директория на NGINX
COPY --from=build /app/dist/RoutesOptimizer.Client/browser /usr/share/nginx/html

# Показване на порта по подразбиране на Nginx
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

```

Създаването на image става чрез командата docker image build, но в настоящия
проект се ползва docker compose и процесът е автоматизиран.

```yaml
services:
  routesoptimizer:
    image: routesoptimizercr.azurecr.io/routes_optimizer_client
    container_name: web_client
    build:
      context: RoutesOptimizer.Client
      dockerfile: Dockerfile
    ports:
      - "80:80"
```
В docker-compose.yml файла показан по-горе, са описани името на image, името на контейнера, къде се намира Dockerfile, портовете, и свързването на порта на
приложението с това на контейнера. С командата <b>docker-compose up --build –d</b> ползвайки конфигурацията от yml файла, се създава image и на базата на него, контейнер.
С командата <b>docker images</b> може да се провери новосъздадения image.

| REPOSITORY | TAG | IMAGE ID | CREATED | SIZE |
|---|---|---|---|---|
| routesoptimizercr.azurecr.io/routes_optimizer_client | latest | 5ca07c1094fe | 28 minutes ago | 50.2MB |

С <b>docker ps</b> - стартираните контейнери.

| CONTAINER ID | IMAGE | PORTS | COMMAND | CREATED | STATUS | NAMES |
|---|---|---|---|---|---|---|
| 74101dbc110f | routesoptimizercr.azurecr.io/routes_optimizer_client | 0.0.0.0:80->80/tcp, 0.0.0.0:62066->8080/tcp | `/docker-entrypoint.…` | 55 minutes ago | Up 55 minutes | web_client |

# 2. Създаване на ресурс група в Azure

<b>az group create --name RoutesOptimizerRG --location westeurope</b>

# 3. Създаване на Azure Container регистър

Azure Container регистърът съхранява и работи с частни контейнер image-и,
подобно на хранилището Docker Hub. Създаването му става посредством
командата:

<b>az acr create --resource-group RoutesOptimizerRG --name RoutesOptimizerCR
--sku Basic</b>

# 4. Качване на image-те в Azure

Това става чрез командата:

<b>docker-compose push</b>

Важно е да се отбележи, че image-ите предварително трябва да са тагнати. Това
ства в docker –compose.yml файлa. Адресът на ресурс групата трябва да е
посочен в името на image-а. В случая: routesoptimizercr.azurecr.io

Също така трябва предварително да сме логнати в създадения регистър.

<b>az acr login --name routesoptimizercr</b>

# 5. Създаване на контейнер

При конфигурацията на контейнера са нужни потребителското име и паролата от
регистъра. Те може да бъдат видяни чрз командата:

<b>az acr credential show --name routesoptimizercr</b>

Задават се име на контейнер, брой процесорни ядра 1, памет 1 GB, порт: 80,
операционна система Linux и да има публичен ip адрес.

Командата за създаване на контейнер е:

<b>
az container create --resource-group RoutesOptimizerRG `<br/>
--name web-client `<br/>
--image routesoptimizercr.azurecr.io/routes_optimizer_client `<br/>
--registry-username routesoptimizercr `<br/>
--registry-password 979RSkSprPMVQUxYmxlF/mq8Am3Epebh3XPLTaZhK7+ACRCmOtB6 `<br/>
--cpu 1 `<br/>
--memory 1 `<br/>
--ports 80 `<br/>
--os-type Linux `<br/>
--ip-address Public<br/>
</b>
<br/>

След като контейнерът се създаде, приложението може да бъде достъпвано по ip
адрес 20.126.194.209


<img width="643" height="532" alt="image" src="https://github.com/user-attachments/assets/b934e918-c118-42d1-9092-5b1571ecb388" />

Създадените ресурси може да бъдат видяни в Azure портала.

<img width="786" height="558" alt="image" src="https://github.com/user-attachments/assets/9e80ec26-ebc3-456e-bdae-cc6ba0749f6e" />




