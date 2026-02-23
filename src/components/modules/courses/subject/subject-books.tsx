import { SubjectBook } from "@/types/course/subject-book.interface";
import { ExternalLink, LibraryBig } from "lucide-react";

interface SubjectBooksProps {
  books: SubjectBook[];
}

export const SubjectBooks = ({ books }: SubjectBooksProps) => {
  const validBooks: SubjectBook[] = books.filter((book) => {
    try {
      const url: URL = new URL(book.url.trim());
      return (
        url.protocol === "https:" &&
        url.hostname === "github.com" &&
        url.pathname.startsWith("/Universidade-Livre/")
      );
    } catch {
      return false;
    }
  });

  return (
    <div className="mt-2 overflow-hidden border-t border-white/10 pt-2 animate-in fade-in slide-in-from-top-10 duration-400 ease-out">
      <div className="mb-1 flex items-center gap-2">
        <LibraryBig className="h-5 w-5 text-yellow-400" />
        <h5 className="text-base font-semibold text-white sm:text-lg">
          Leituras Recomendadas
        </h5>
      </div>
      {validBooks && validBooks.length > 0 ? (
        <div className="grid gap-3 cursor-pointer">
          {validBooks.map((book) => (
            <a
              key={book.id}
              href={book.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/book flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-white/20 hover:bg-white/10 sm:flex-row sm:items-center"
            >
              <span className="flex-1 text-gray-200 transition-colors group-hover/book:text-white wrap-break-word">
                {book.name}
              </span>
              <ExternalLink className="h-4 w-4 text-gray-400 transition-colors group-hover/book:text-blue-400" />
            </a>
          ))}
        </div>
      ) : (
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="h-2 w-2 rounded-full bg-gray-400" />
          <p className="text-sm text-gray-400 sm:text-base">
            Nenhuma recomendação disponível para esta disciplina.
          </p>
        </div>
      )}
    </div>
  );
};

export default SubjectBooks;
