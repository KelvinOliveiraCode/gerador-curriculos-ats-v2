import { TrashIcon, PlusIcon } from './Icons';

interface SectionEditorProps<T extends { id: string }> {
  title: string;
  items: T[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  renderItem: (item: T, index: number) => JSX.Element;
  emptyMessage: string;
}

/**
 * Editor genérico de uma seção de lista (experiência, educação, skills).
 *
 * Renderiza um cabeçalho com botão "adicionar", uma lista de itens editáveis
 * e uma mensagem quando a seção está vazia.
 */
export default function SectionEditor<T extends { id: string }>({
  title,
  items,
  onAdd,
  onRemove,
  renderItem,
  emptyMessage,
}: SectionEditorProps<T>) {
  return (
    <div className="space-y-3 border border-line rounded-lg p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-ink uppercase tracking-wider">{title}</h3>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline border-none bg-transparent p-0"
        >
          <PlusIcon size={14} /> Adicionar
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-xs text-muted italic">{emptyMessage}</p>
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={item.id} className="border border-line rounded p-3 space-y-2">
              <div className="flex items-end justify-between gap-2">
                <button
                  type="button"
                  onClick={() => onRemove(item.id)}
                  className="text-xs text-red-600 hover:underline p-1"
                  title="Remover"
                >
                  <TrashIcon size={14} />
                </button>
              </div>
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
