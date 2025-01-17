export const corsOptions = {
  origin: process.env.ORIGIN_CORS,
  methods: ['GET'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

export const port = process.env.PORT || 3000;
