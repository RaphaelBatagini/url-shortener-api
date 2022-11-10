import { Connection, createConnection, getConnection, getConnectionManager } from 'typeorm';

export const connect = async (): Promise<Connection> => {
  try {
    const connection = getConnection();
    return connection;
  } catch {
    const connection = await createConnection();
    return connection;
  }
};

export const close = async (): Promise<void> => {
  const connectionManager = getConnectionManager();
  const connectionName = 'default';

  if (connectionManager.has(connectionName)) {
    await connectionManager.get(connectionName).close();
  }
};