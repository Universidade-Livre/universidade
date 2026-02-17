import type Course from "@/types/course.interface";

export const courseMath: Course = {
  slug: "matematica",
  name: "Matemática",
  semesters: [
    {
      // Etapa 1
      number: 1,
      subjects: [
        {
          number: 1,
          name: "Ingredientes básicos para o Cálculo",
          url: "https://www.youtube.com/playlist?list=PL2xox8ncv81W698VTHptmp7ZNvcKqlyHO",
          prerequisites: [],
          books: [],
        },
        {
          number: 2,
          name: "Teoria dos Conjuntos",
          url: "https://www.youtube.com/playlist?list=PL2xox8ncv81X2Cp3FClIjRE9sG_Vq6sZ_",
          prerequisites: [],
          books: [],
        },
        {
          number: 3,
          name: "Lógica e Matemática Discreta",
          url: "https://www.youtube.com/playlist?list=PLxI8Can9yAHf6oB0nf8FwLhqSOcBLqOxH",
          prerequisites: [],
          books: [],
        },
        {
          number: 4,
          name: "Geometria Analítica",
          url: "https://www.youtube.com/playlist?list=PLxI8Can9yAHcSZv2BBUJAfGsXx0D0hn-2",
          prerequisites: [],
          books: [],
        },
        {
          number: 5,
          name: "Algoritmos e Programação em Python",
          url: "https://www.youtube.com/playlist?list=PLvE-ZAFRgX8hnECDn1v9HNTI71veL3oW0",
          prerequisites: [],
          books: [],
        },
      ],
    },
    {
      // Etapa 2
      number: 2,
      subjects: [
        {
          number: 1,
          name: "Cálculo I",
          url: "https://www.youtube.com/playlist?list=PL2D9B691A704C6F7B",
          prerequisites: [],
          books: [],
        },
        {
          number: 2,
          name: "Projeto e Análise de Algoritmos",
          url: "https://www.youtube.com/playlist?list=PLxI8Can9yAHdNN5fpKWRF8bbLG-2P-0LW",
          prerequisites: ["Algoritmos e Programação em Python"],
          books: [],
        },
        {
          number: 3,
          name: "Álgebra Linear",
          url: "https://www.youtube.com/playlist?list=PLxI8Can9yAHdUtWDKtTA9AmuICNyX9EIr",
          prerequisites: [],
          books: [],
        },
        {
          number: 4,
          name: "Álgebra Linear (avançada)",
          url: "https://www.youtube.com/playlist?list=PL2xox8ncv81WXIutzWJDQ7E78riZqJClA",
          prerequisites: [],
          books: [],
        },
        {
          number: 5,
          name: "Teoria dos Números",
          url: "https://www.youtube.com/playlist?list=PLxI8Can9yAHcfxDjfTmU-t7XC1w2GVwc_",
          prerequisites: [],
          books: [],
        },
      ],
    },
    {
      // Etapa 3
      number: 3,
      subjects: [
        {
          number: 1,
          name: "Cálculo II",
          url: "https://www.youtube.com/playlist?list=PLxI8Can9yAHeZfF4HwiVmv4D6n3acKLER",
          prerequisites: ["Cálculo I"],
          books: [],
        },
        {
          number: 2,
          name: "Estruturas Algébricas",
          url: "https://www.youtube.com/playlist?list=PL6eyvTm7LSBsdkBBKzEDcyYbdujN_6TmL",
          prerequisites: ["Teoria dos Números"],
          books: [],
        },
        {
          number: 3,
          name: "Equações Diferenciais Ordinárias",
          url: "https://www.youtube.com/playlist?list=PLo4jXE-LdDTR9q44hqm2w3NWtvyP_ZoiP",
          prerequisites: [],
          books: [],
        },
        {
          number: 4,
          name: "Física Geral I",
          url: "https://www.youtube.com/playlist?list=PL7581C21F8ADD6C8E",
          prerequisites: [],
          books: [],
        },
        {
          number: 5,
          name: "História da Matemática",
          url: "https://www.youtube.com/playlist?list=PLxI8Can9yAHdOIYVPQPS6oUPBk8mb1CVU",
          prerequisites: [],
          books: [],
        },
      ],
    },
    {
      // Etapa 4
      number: 4,
      subjects: [
        {
          number: 1,
          name: "Cálculo III",
          url: "https://www.youtube.com/playlist?list=PLFBA21F349930F92F",
          prerequisites: ["Cálculo II"],
          books: [],
        },
        {
          number: 2,
          name: "Física Geral II",
          url: "https://www.youtube.com/playlist?list=PL516F59E9AE8F5BF7",
          prerequisites: ["Física Geral I"],
          books: [],
        },
        {
          number: 3,
          name: "Estatística e Probabilidade",
          url: "https://www.youtube.com/playlist?list=PLxI8Can9yAHeeWqe3m9HZFiBhT33Mfxew",
          prerequisites: [],
          books: [],
        },
        {
          number: 4,
          name: "Programação Linear",
          url: "https://youtube.com/playlist?list=PLRJ_PBuYGr64QKVnwx3kx0qLeG5WQY_Hl&si=2SlZOlDfYH70f0ak",
          prerequisites: ["Projeto e Análise de Algoritmos"],
          books: [],
        },
        {
          number: 5,
          name: "Análise na Reta",
          url: "https://www.youtube.com/playlist?list=PL2xox8ncv81UTkjNN2WQM8knGQJpu1j_z",
          prerequisites: [],
          books: [],
        },
      ],
    },
    {
      // Etapa 5
      number: 5,
      subjects: [
        {
          number: 1,
          name: "Cálculo IV (Métodos Matemáticos)",
          url: "https://www.youtube.com/playlist?list=PLxI8Can9yAHeOiMYCBlkyCALloROQ58OY",
          prerequisites: ["Cálculo III"],
          books: [],
        },
        {
          number: 2,
          name: "Introdução a Topologia Geral",
          url: "https://www.youtube.com/playlist?list=PLhueTEPO9C1KEX8jTphPeb9kEF9it4b5x",
          prerequisites: [],
          books: [],
        },
        {
          number: 3,
          name: "Cálculo com variável complexa",
          url: "https://www.youtube.com/playlist?list=PLpizEtrJatZEUjIgADKdbE6_jGhcXFxht",
          prerequisites: ["Cálculo IV (Métodos Matemáticos)"],
          books: [],
        },
        {
          number: 4,
          name: "Teoria dos Grafos",
          url: "https://www.youtube.com/playlist?list=PLndfcZyvAqbr2MLCOLEvBNX6FgD8UNWfX",
          prerequisites: [],
          books: [],
        },
        {
          number: 5,
          name: "Física Geral III",
          url: "https://www.youtube.com/playlist?list=PLxI8Can9yAHdG8tw2QofrU02IuAEVyGlL",
          prerequisites: ["Física Geral II"],
          books: [],
        },
      ],
    },
    {
      // Etapa 6
      number: 6,
      subjects: [
        {
          number: 1,
          name: "Alfabetização em anéis",
          url: "https://www.youtube.com/playlist?list=PL2xox8ncv81XSiyT7czJX8q7I7kNmc8Bk",
          prerequisites: ["Estruturas Algébricas"],
          books: [],
        },
        {
          number: 2,
          name: "Física Moderna",
          url: "https://www.youtube.com/playlist?list=PLW5Hta-B_II5vB4Vn9wVWaJVHTo4XxB_i",
          prerequisites: ["Física Geral III"],
          books: [],
        },
        {
          number: 3,
          name: "Teoria de Corpos",
          url: "https://www.youtube.com/playlist?list=PL2xox8ncv81W0HbBtma7QQMeyVllJMk0m",
          prerequisites: ["Estruturas Algébricas"],
          books: [],
        },
        {
          number: 4,
          name: "Análise Complexa",
          url: "https://www.youtube.com/playlist?list=PLo4jXE-LdDTRQ07QOEFl0x6mvyTl2hlRn",
          prerequisites: [],
          books: [],
        },
        {
          number: 5,
          name: "Equações Diferenciais Parciais",
          url: "https://www.youtube.com/playlist?list=PLpB72X90N5xST4NmvjQicgfRgpt-9rgw-",
          prerequisites: ["Cálculo IV (Métodos Matemáticos)", "Análise Complexa"],
          books: [],
        },
      ],
    },
  ],
};

export default courseMath;
