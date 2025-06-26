This file provides context for the Gemini large language model to understand the Devika project.

## Project Overview

Devika is a software development agent that can understand high-level human instructions and break them down into smaller, manageable steps. It can then use various tools to execute these steps and complete the project.

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express, TypeScript
- **Database:** Turso (SQLite fork)
- **Real-time Sync:** LetSync
- **Build Tool:** Bun

## Key Directories

- `src/`: Contains the main source code for the application.
- `letsync/`: Houses the real-time data synchronization logic.
- `drizzle/`: Manages the database schema and migrations.
- `public/`: Static assets served by the web server.
- `stack/`: Infrastructure and deployment configuration.
