import { ConfigProvider, Layer, Logger } from "effect";

/**
 * 🔧 Layer de configuration : lit les variables d'environnement (import.meta.env)
 * Pour un environnement Vite, on wrap `import.meta.env` manuellement.
 */
const ViteConfigProvider = ConfigProvider.fromMap(
  new Map(Object.entries(import.meta.env).map(([k, v]) => [k.replace("VITE_", ""), v]))
);

const ConfigLayer = Layer.setConfigProvider(ViteConfigProvider);

const LoggerLayer = Logger.replace(Logger.defaultLogger, Logger.prettyLogger());

export const AppLayer = Layer.mergeAll(ConfigLayer, LoggerLayer);
