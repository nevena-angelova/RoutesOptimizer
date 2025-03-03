#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["RoutesOptimizer/RoutesOptimizer.csproj", "RoutesOptimizer/"]
COPY ["RoutesOptimizer.Data/RoutesOptimizer.Data.csproj", "RoutesOptimizer.Data/"]
RUN dotnet restore "./RoutesOptimizer/RoutesOptimizer.csproj"
COPY . .
WORKDIR "/src/RoutesOptimizer"
RUN dotnet build "./RoutesOptimizer.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./RoutesOptimizer.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "RoutesOptimizer.dll"]