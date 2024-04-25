import { createClient } from "redis";

export  function connectRedis() {
  const client = createClient({
    password: "Cj0iq1wfVzkBlQjbUr8iuqTOz38876bg",
    socket: {
      host: "redis-12280.c300.eu-central-1-1.ec2.cloud.redislabs.com",
      port: 12280,
    },
  });
  // await client.connect();
  client.on("error", (err) => console.log("Redis Client Error", err));

  
  return client;
}

const redisClient = connectRedis()

export default redisClient;
