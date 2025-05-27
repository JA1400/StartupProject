import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://9c7ded6cf093392c3ac2c869c625baf5@o4509393432215552.ingest.us.sentry.io/4509393452990465",
  integrations: [
    Sentry.feedbackIntegration({
      // Additional SDK configuration goes in here, for example:
      colorScheme: "system",
      autoInject: true,
    }),
  ],
});
