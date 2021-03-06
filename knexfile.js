require("dotenv").config();

// Postgres imports
const pg = require("pg");
pg.defaults.ssl = true;

// Production database connection
const dbConnection = process.env.DATABASE_URL || {
  filename: "./database/users.db3"
};

// Postgres configurations
// Command for running postgres locally:
// knex migrate:latest --env production
// knex seed:run --env production
module.exports = {
  development: {
    client: "pg",
    connection: dbConnection,
    migrations: {
      directory: "./database/migrations",
      tablename: "knex_migrations"
    },
    seeds: {
      directory: "./database/seeds"
    },
    pool: {
      min: 2,
      max: 10
    },
    useNullAsDefault: true
  },

  testing: {
    client: "sqlite3",
    connection: {
      filename: "./database/test.db3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    },
    useNullAsDefault: true
  },

  production: {
    client: "pg",
    connection: dbConnection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./database/migrations",
      tableName: "knex_migrations"
    },
    seeds: {
      directory: "./database/seeds"
    },
    useNullAsDefault: true
  }
};

// // SQLite3 Ccnfigurations
// module.exports = {
//   development: {
//     client: "sqlite3",
//     connection: {
//       filename: "./database/users.db3"
//     },
//     pool: {
//       min: 2,
//       max: 10
//     },
//     migrations: {
//       directory: "./database/migrations"
//     },
//     seeds: {
//       directory: "./database/seeds"
//     },
//     useNullAsDefault: true
//   },
//   testing: {
//     client: "sqlite3",
//     connection: {
//       filename: "./database/test.db3"
//     },
//     pool: {
//       min: 2,
//       max: 10
//     },
//     useNullAsDefault: true,
//     migrations: {
//       directory: "./database/migrations"
//     },
//     seeds: {
//       directory: "./database/seeds"
//     },
//     useNullAsDefault: true
//   },
//   production: {
//     client: "sqlite3",
//     useNullAsDefault: true,
//     connection: process.env.DATABASE_URL,
//     pool: {
//       min: 2,
//       max: 10
//     },
//     migrations: {
//       directory: "./database/migrations",
//       tableName: "knex_migrations"
//     },
//     seeds: {
//       directory: "./database/seeds"
//     }
//   }
// };
