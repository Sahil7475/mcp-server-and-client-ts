# MCP Server & Client in TypeScript (Gemini Integration)

This repository demonstrates how to set up a full **Model Context Protocol (MCP)** server and client using **TypeScript**, along with interaction capabilities for Google's **Gemini 2.0 Flash model** during sampling. It covers the complete flow — from tools and queries to resource templates, prompt definitions, and user input.

---

## ✨ Features

- ✅ **MCP Server Setup** (via `@modelcontextprotocol/sdk`)
- ✅ **MCP Client** with interactive CLI (`@inquirer/prompts`)
- ✅ **Google Gemini 2.0 Flash model** integration
- ✅ **Tool Implementation**: Create and store user data in a local JSON file
- ✅ **Prompt & Sampling** capabilities
- ✅ **Query & Resource management** using MCP APIs
- ✅ **Inspector Support** via `@modelcontextprotocol/inspector`
- ✅ **Terminal Input** for tool parameters
- ✅ Easy debugging with Postman-like UI for MCP

---

## 📂 Project Structure

```plaintext
├── .vscode/
│   └── mcp.json               # MCP Inspector config
├── src/
│   ├── client.ts              # CLI client code
│   ├── server.ts              # MCP server code
│   └── data/
│       └── users.json         # User storage (via tool)
├── .gitignore
├── README.md
├── tsconfig.json
├── package.json
└── package-lock.json
```

## 🧠 Technologies Used

| Technology                      | Purpose                             |
|---------------------------------|-------------------------------------|
| `@modelcontextprotocol/sdk`     | Core SDK to build MCP server/client |
| `@modelcontextprotocol/inspector` | GUI inspector for MCP API testing   |
| `@inquirer/prompts`             | Terminal input prompts               |
| `Google Gemini 2.0 Flash`       | AI model used for generation/sampling |
| `Zod`                           | Schema validation                    |
| `Node.js`, `TypeScript`         | Runtime and language                 |


## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Sahil7475/mcp-server-and-client-ts.git
cd mcp-server-and-client-ts
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the MCP Server
```bash
npm run server:dev
```
 ### Inspect MCP Server
``` bash
npm run server:inspect
```

### Build and Run MCP Server with Watch Mode
``` bash
npm run server:build:watch
```

### 4. Start the MCP Client
```bash
npm run client:dev
```

### Use Cases

- Learning how to integrate MCP with real-world tools  
- Creating and managing resources through MCP APIs  
- Using Gemini 2.0 Flash for sampling/generation via prompt templates  
- CLI interactions that simulate real users calling tools  
- Testing & debugging with a MCP Inspector

### Future Enhancements

- Add more tools (e.g., update/delete user)  
- Enable Gemini streaming support  
- Replace local JSON storage with a database  
- Add authentication to secure client-server interaction  
 

