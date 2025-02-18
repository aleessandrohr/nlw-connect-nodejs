import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { validatorCompiler, serializerCompiler } from "fastify-type-provider-zod";
import { type ZodTypeProvider } from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { jsonSchemaTransform } from "fastify-type-provider-zod";
import { subscribeToEventRoute } from "@/routes/subscribe-to-event-route.js";
import { env } from "@/env";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
  origin: true,
});

app.register(fastifySwagger, {
  mode: "dynamic",
  openapi: {
    info: { title: "NLW Connection", description: "API para conectar o seu app com o nosso projeto", version: "0.0.1" },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

app.register(subscribeToEventRoute);

app.listen({ port: env.PORT }).then(() => {
  console.log("HTTP server running!");
});
