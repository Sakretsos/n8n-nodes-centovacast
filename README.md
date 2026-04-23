# n8n-nodes-centovacast

This is an [n8n](https://n8n.io/) community node that lets you manage [Centova Cast](https://centova.com/) streaming servers directly from your n8n workflows.

Centova Cast is a web-based control panel for internet radio stations that supports SHOUTcast, Icecast, and other streaming server software.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Table of Contents

- [Installation](#installation)
  - [Community Nodes (Recommended)](#community-nodes-recommended)
  - [Docker Installation](#docker-installation)
  - [Building from Source](#building-from-source)
- [Credentials](#credentials)
- [Operations](#operations)
  - [Server Operations](#server-operations)
  - [System Operations](#system-operations)
- [Usage Examples](#usage-examples)
- [API Reference](#api-reference)
- [License](#license)

## Installation

### Community Nodes (Recommended)

1. Open your n8n instance
2. Go to **Settings** > **Community Nodes**
3. Click **Install a community node**
4. Enter `n8n-nodes-centovacast` and click **Install**
5. The node will be available immediately — no restart required

> **Note:** Community Nodes is available from n8n version 0.187.0 and above.

### Docker Installation

If you are running n8n in Docker, follow these steps:

**1. Build the package (if not already built)**

```bash
git clone https://github.com/Sakretsos/n8n-nodes-centovacast.git
cd n8n-nodes-centovacast
npm install
npm run build
npm pack
```

This will create a `n8n-nodes-centovacast-0.2.0.tgz` file.

**2. Install into your n8n Docker container**

```bash
# Create the target directory (first time only)
docker exec -it n8n sh -c "mkdir -p /home/node/.n8n/custom/node_modules/n8n-nodes-centovacast"

# Copy the tgz into the container
docker cp n8n-nodes-centovacast-0.2.0.tgz n8n:/tmp/

# Extract and install
docker exec -it n8n sh -c "cd /tmp && tar xzf n8n-nodes-centovacast-0.2.0.tgz && cp -r package/* /home/node/.n8n/custom/node_modules/n8n-nodes-centovacast/"

# Restart n8n to load the new node
docker restart n8n
```

> **Note:** Replace `n8n` with your actual n8n container name. You can find it with `docker ps`.

**3. Updating to a new version**

```bash
# Clear the old version
docker exec -it n8n sh -c "rm -rf /home/node/.n8n/custom/node_modules/n8n-nodes-centovacast/*"

# Copy and extract the new tgz
docker cp n8n-nodes-centovacast-0.2.0.tgz n8n:/tmp/
docker exec -it n8n sh -c "cd /tmp && tar xzf n8n-nodes-centovacast-0.2.0.tgz && cp -r package/* /home/node/.n8n/custom/node_modules/n8n-nodes-centovacast/"

# Restart n8n
docker restart n8n
```

### Building from Source

```bash
# Clone the repository
git clone https://github.com/Sakretsos/n8n-nodes-centovacast.git
cd n8n-nodes-centovacast

# Install dependencies
npm install

# Build the project
npm run build

# Create the tgz package
npm pack
```

### Development

To watch for changes during development:

```bash
npm run dev
```

## Credentials

To use this node, you need to configure the **Centova Cast API** credentials in n8n:

| Field | Description | Example |
|-------|-------------|---------|
| **Base URL** | The URL of your Centova Cast panel | `https://panel.example.com:2199` |
| **Username** | Your admin or account username | `admin` |
| **Password** | Your admin or account password | `yourpassword` |

> **Tip:** For **Server** operations, the credentials password is used to authenticate against the target account. For **System** operations, the admin password is required.

## Operations

### Server Operations

Operations for managing individual streaming server accounts.

| Operation | Description |
|-----------|-------------|
| **Get Account** | Retrieve account configuration and autoDJ settings |
| **Get Status** | Get streaming server status (listeners, bitrate, state) |
| **Get Songs** | Get recently played tracks |
| **Get Listeners** | Get currently connected listeners |
| **Get Logs** | Retrieve error, access, or source logs |
| **Start** | Start the streaming server and autoDJ |
| **Stop** | Stop the streaming server |
| **Restart** | Restart the server (disconnects all listeners) |
| **Reload** | Reload config without disconnecting listeners |
| **Switch Source** | Activate or deactivate the autoDJ |
| **Next Song** | Skip to the next song in the autoDJ playlist |
| **Reconfigure** | Update account settings (title, bitrate, limits, etc.) |
| **Reindex** | Update the autoDJ media library |
| **Playlist** | Manage playlists (activate, deactivate, add/remove tracks, list) |
| **Manage DJ** | Create, update, remove, or list DJ accounts |
| **Copy File** | Copy a file into the account's spool directory |
| **Refresh Disk Usage** | Update disk usage statistics |
| **Report** | Generate a track/royalty report |
| **Archive Logs** | Archive logs and get a download URL |
| **Authenticate** | Test if credentials are valid |
| **Enabled** | Check if an account is enabled/disabled |

### System Operations

Admin-level operations for managing the Centova Cast installation.

| Operation | Description |
|-----------|-------------|
| **List Accounts** | List all accounts (with pagination and filtering) |
| **List Hosts** | List all hosting servers |
| **List Regions** | List all configured regions |
| **Provision** | Create a new streaming server account |
| **Terminate** | Permanently remove an account |
| **Rename** | Change an account's username |
| **Set Status** | Enable or disable an account |
| **Reparent** | Move an account to another reseller |
| **Info** | Get the state (up/down) of accounts |
| **Usage** | Get resource utilization (disk, transfer) |
| **Check** | Check for outages and restart if needed |
| **Batch** | Run a method on multiple accounts at once |
| **Backup** | Create a complete account backup |
| **Restore** | Restore an account from a backup file |
| **Database** | Import or export an account database |
| **App Change** | Change the streaming software (experimental) |
| **Process Logs** | Process and rotate log files |
| **Version** | Get Centova Cast version and server info |
| **Sanity Check** | Test communication with Centova Cast |

## Usage Examples

### Check Server Status

1. Add a **Centova Cast** node to your workflow
2. Select **Resource:** `Server`
3. Select **Operation:** `Get Status`
4. Enter the **Account Username** of the stream to check
5. Optionally set **Mountpoints** to check specific mount points

### Start/Stop a Stream

1. Add a **Centova Cast** node
2. Select **Resource:** `Server`
3. Select **Operation:** `Start` or `Stop`
4. Enter the **Account Username**

### List All Accounts

1. Add a **Centova Cast** node
2. Select **Resource:** `System`
3. Select **Operation:** `List Accounts`
4. Optionally set a **Filter** keyword and **Limit**

### Create a New Account

1. Add a **Centova Cast** node
2. Select **Resource:** `System`
3. Select **Operation:** `Provision`
4. Fill in the required fields: Username, Hostname, IP Address, Port, etc.

## API Reference

This node implements the [Centova Cast JSON API](https://centova.com/doc/cast/internals/API_Reference). All requests are sent via POST for security (passwords are not logged in URL parameters).

The API uses two main classes:
- **Server** class - requires account username + password, manages individual streams
- **System** class - requires admin password, manages the entire Centova Cast installation

For full API documentation, visit: https://centova.com/doc/cast/internals/API_Reference

## Compatibility

- **n8n version:** 1.0.0+
- **Node.js version:** 22+
- **Centova Cast version:** 3.x

## License

This project is licensed under the [MIT License](LICENSE).
