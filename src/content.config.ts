import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const produtos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/produtos' }),
  schema: z.object({
    titulo: z.string(),
    tipo: z.string(),
    condicao: z.string().optional(),
    resumo: z.string(),
    imagem: z.string().optional(),
    ordem: z.number().default(100),
    catalogo: z.string().optional(),
    especificacoes: z.array(z.object({ item: z.string(), valor: z.string() })).default([]),
  }),
});

const paginas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/paginas' }),
  schema: z.object({
    titulo: z.string(),
    descricao: z.string(),
    imagem: z.string().optional(),
  }),
});

export const collections = { produtos, paginas };
