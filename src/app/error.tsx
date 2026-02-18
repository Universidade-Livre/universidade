"use client";

import Error from "@/components/common/error";

export const ErrorPage = () => {
  return (
    <Error
      eyebrow="Erro inesperado"
      title="Erro ao carregar a página"
      description="Ocorreu um erro inesperado ao carregar esta página. Tente novamente em instantes ou volte para a página inicial."
    />
  );
};

export default ErrorPage;
