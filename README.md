# home-cms


### Running CMS locally

Add an .env file vase on .env.example.

Install dependencies:
```
npm ci
```

To successfully run Strapi locally, run the command:
```
docker-compose --profile db-and-minio-s3 up -d
```

minio-s3 interface will be available here: http://localhost:9011 
- `username`: *admin*
- `password`: *rootPassword*

Running Strapi in dev mode [Read here](https://docs.strapi.io/dev-docs/cli#strapi-develop):
```
npm run develop
```

Running Strapi [Read here](https://docs.strapi.io/dev-docs/cli#strapi-start):
```
npm run start
```

Strapi will be available here: http://localhost:1337/admin

## 📚 Learn more

- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.

