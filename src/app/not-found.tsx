import Error from "@/components/common/error";

export const NotFoundPage = () => {
  return (
    <Error
      eyebrow="Rota inválida"
      title="Página não encontrada"
      description="Não encontramos a página que você tentou acessar. Volte para o início ou explore outra rota."
    />
  );
};

export default NotFoundPage;
